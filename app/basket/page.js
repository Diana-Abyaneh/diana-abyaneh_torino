"use client";

import * as yup from "yup";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "zaman";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { length } from "@/hooks/length";
import { fetchBasket } from "@/hooks/fetchBasket";
import { createOrder } from "@/hooks/fetchOrder";
import styles from "@/styles/basket.module.css";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام باید حداقل ۳ حرف باشد"),
  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),
  birthDate: yup.string().required("تاریخ تولد را وارد کنید"),
  gender: yup.string().oneOf(["male", "female"], "جنسیت را انتخاب کنید"),
});

export default function BasketPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["basket"],
    queryFn: fetchBasket,
  });

  const router = useRouter();
  const [setShowDatePicker] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("پرداخت با موفقیت انجام شد", { position: "top-center" });
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message || "خطا در پرداخت", {
        position: "top-center",
      });
    },
  });

  const onSubmit = (data) => {
    orderMutation.mutate(data);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id !== "date-picker-input") {
      setShowDatePicker(false);
    }
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در دریافت سبد خرید</div>;
  if (!data || Object.keys(data).length === 0)
    return <div>سبد خرید شما خالی است</div>;

  const tour = data;

  return (
    <div className={styles.container} onClick={handleOutsideClick}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>اطلاعات مسافر</h2>

        <div className={styles.field}>
          <label>نام و نام خانوادگی</label>
          <input {...register("fullName")} />
          <p className={styles.error}>{errors.fullName?.message}</p>
        </div>

        <div className={styles.field}>
          <label>کد ملی</label>
          <input {...register("nationalCode")} />
          <p className={styles.error}>{errors.nationalCode?.message}</p>
        </div>

        <div className={styles.field}>
          <label>تاریخ تولد</label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(dateObj) => field.onChange(dateObj.value)}
                round="x2"
                accentColor="#28a745"
                locale="fa"
              />
            )}
          />
          <p className={styles.error}>{errors.birthDate?.message}</p>
        </div>

        <div className={styles.field}>
          <label>جنسیت</label>
          <select {...register("gender")}>
            <option value="">انتخاب کنید</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          <p className={styles.error}>{errors.gender?.message}</p>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={orderMutation.isPending}
        >
          {orderMutation.isPending ? "در حال پرداخت..." : "ثبت نهایی و خرید"}
        </button>
      </form>

      <div className={styles.summary}>
        <h2>{tour.title}</h2>
        <p>{length(tour.startDate, tour.endDate).toLocaleString("fa")} روز</p>
        <p className={styles.price}>
          <strong>قیمت نهایی </strong> {tour.price.toLocaleString("fa")} تومان
        </p>
      </div>
    </div>
  );
}