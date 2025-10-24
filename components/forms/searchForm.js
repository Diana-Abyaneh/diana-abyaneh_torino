"use client";

import * as yup from "yup";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "zaman";
import { CiLocationOn } from "react-icons/ci";
import { TbWorldSearch } from "react-icons/tb";
import { LuCalendarRange } from "react-icons/lu";
import origins from "@/data/origins.json";
import destinations from "@/data/destinations.json";
import styles from "@/styles/searchForm.module.css";

const schema = yup.object({
  originId: yup.string().required("انتخاب مبدا الزامی است"),
  destinationId: yup
    .string()
    .required("انتخاب مقصد الزامی است")
    .notOneOf([yup.ref("originId")], "مبدا و مقصد نمی‌توانند یکی باشند"),
  startDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
});

export default function SearchForm({ onSearch, defaultValues }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      originId: "",
      destinationId: "",
      startDate: null,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    onSearch({
      originId: data.originId,
      destinationId: data.destinationId,
      startDate: data.startDate
        ? new Date(new Date(data.startDate).setHours(0, 0, 0, 0)).toISOString()
        : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.field}>
        <label>
          <CiLocationOn size={18} />
        </label>
        <select {...register("originId")} defaultValue="">
          <option value="" disabled>
            انتخاب مبدا
          </option>
          {origins.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>
          <TbWorldSearch size={18} />
        </label>
        <select {...register("destinationId")} defaultValue="">
          <option value="" disabled>
            انتخاب مقصد
          </option>
          {destinations.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>
          <LuCalendarRange size={18} />
        </label>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              round="x2"
              accentColor="#28a745"
              locale="fa"
              direction="rtl"
              value={field.value || null}
              onChange={(val) => field.onChange(val?.value || null)}
              inputClass={styles.dateInput}
              inputAttributes={{
                placeholder: "تاریخ حرکت",
              }}
              position="right"
            />
          )}
        />
      </div>

      <button type="submit" className={styles.submit}>
        جستجو
      </button>
      {errors.originId && (
        <p className={styles.error}>{errors.originId.message}</p>
      )}
      {errors.destinationId && (
        <p className={styles.error}>{errors.destinationId.message}</p>
      )}
    </form>
  );
}
