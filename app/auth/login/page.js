"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import { useAuth } from "@/context/authContext";
import Cookies from "js-cookie";
import styles from "@/styles/login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { setPhone, isLoading, setIsLoading } = useAuth();
  const router = useRouter();

  const schema = yup.object().shape({
    phone: yup
      .string()
      .matches(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست")
      .required("شماره موبایل الزامی است"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setPhone(data.phone);
      Cookies.set("phone", data.phone, { expires: 0.1 });

      router.push("/auth/verify");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("خطا در ورود. لطفاً دوباره تلاش کنید", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ورود به تورینو</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>شماره موبایل خود را وارد کنید</label>
        <input
          type="tel"
          placeholder="09123456789"
          {...register("phone")}
          className={errors.phone ? styles.errorInput : ""}
          disabled={isLoading}
        />
        {errors.phone && (
          <p className={styles.errorText}>{errors.phone.message}</p>
        )}

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? (
            <PropagateLoader
              color="rgba(40, 167, 69, 1)"
              size={10}
              speedMultiplier={0.8}
            />
          ) : (
            "ارسال کد تأیید"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
