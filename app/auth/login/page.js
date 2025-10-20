"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import styles from "@/styles/login.module.css";
import { useAuth } from "@/context/authContext";

function Login() {
  const { setPhone, login, setIsLoading, isLoading } = useAuth();
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPhone(data.phone);
      login(data.phone);
      router.push("/auth/verify");
      
    } catch (error) {
      console.error("خطا در ارسال فرم:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.coss}>x</p>
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

        <button 
          type="submit" 
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? (
            <PropagateLoader
              color="rgba(40, 167, 69, 1)"
              size={10}
              speedMultiplier={0.8}
            />
          ) : (
            "ارسال کد تایید"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;