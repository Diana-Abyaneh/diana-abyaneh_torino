"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBasket } from "@/hooks/fetchBasket";
import { createOrder } from "@/hooks/fetchOrder";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import styles from "@/styles/basket.module.css";
import { length } from "@/hooks/length";
import { useRouter } from "next/navigation";

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

  const {
    register,
    handleSubmit,
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

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در دریافت سبد خرید</div>;
  if (!data || Object.keys(data).length === 0)
    return <div>سبد خرید شما خالی است</div>;

  const tour = data;

  return (
    <div className={styles.container}>
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
          <input type="date" {...register("birthDate")} />
          <p className={styles.error}>{errors.birthDate?.message}</p>
        </div>

        <div className={styles.field}>
          <label>جنسیت</label>
          <select {...register("gender")}>
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
