"use client";

import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import styles from "@/styles/verify.module.css";
import "react-toastify/dist/ReactToastify.css";

function Verify({ onClose }) {
  const { phone, setPhone, setUser, isLoading, setIsLoading } = useAuth();
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: { code: "" },
  });
  const code = watch("code");
  const hasSentOtp = useRef(false);

  useEffect(() => {
    if (hasSentOtp.current) return;

    const currentPhone = phone || Cookies.get("phone");
    if (!currentPhone) {
      toast.error("شماره موبایل یافت نشد");
      onClose();
      return;
    }

    setPhone(currentPhone);
    sendOtp(currentPhone);
    hasSentOtp.current = true;
  }, []);

  const sendOtp = async (mobile) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/send-otp", { mobile });
      if (res.status === 200) {
        toast.success("کد تأیید ارسال شد", { position: "top-center" });
        if (res.data?.code) {
          toast.info(`کد ورود شما: ${res.data.code}`, {
            position: "top-right",
          });
        }
        Cookies.set("phone", mobile, { expires: 0.1 });
        setTimer(120);
        setCanResend(false);
      }
    } catch {
      toast.error("خطا در ارسال کد", { position: "top-center" });
      hasSentOtp.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else setCanResend(true);
  }, [timer]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const onSubmit = async () => {
    if (code.length < 6)
      return toast.warn("کد ۶ رقمی را کامل وارد کنید", {
        position: "top-center",
      });

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/check-otp", {
        mobile: phone,
        code,
      });
      const { accessToken, refreshToken, user: userData } = res.data;

      if (accessToken && userData) {
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", refreshToken, { expires: 14 });
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        setUser(userData);
        toast.success("ورود با موفقیت انجام شد", { position: "top-center" });
        onClose();
      } else {
        toast.error("کد معتبر نیست", { position: "top-center" });
      }
    } catch {
      toast.error("کد اشتباه یا منقضی شده", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>تأیید شماره موبایل</h1>
      <p>
        کد برای شماره <span className={styles.phoneNumber}>{phone}</span> ارسال
        شد.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.otpContainer}>
          <OtpInput
            value={code}
            onChange={(v) => setValue("code", v)}
            numInputs={6}
            inputType="number"
            inputStyle={styles.otpInput}
            shouldAutoFocus
          />
        </div>
        <button type="submit" disabled={isLoading || code.length < 6}>
          {isLoading ? "در حال تأیید..." : "تأیید کد"}
        </button>
      </form>

      {canResend ? (
        <button onClick={() => sendOtp(phone)} className={styles.resendBtn}>ارسال مجدد</button>
      ) : (
        <p>ارسال مجدد تا {formatTime(timer)}</p>
      )}
    </div>
  );
}

export default Verify;
