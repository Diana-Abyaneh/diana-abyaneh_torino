import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import OtpInput from "react18-input-otp";
import styles from "@/styles/verify.module.css";

function Verify() {
  const { phone, setVerificationCode, isLoading, setIsLoading } = useAuth();
  const router = useRouter();

  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: { code: "" },
  });

  const code = watch("code");

  const onSubmit = async () => {
    console.log({
      mobile: phone,
      code,
    });
  };

  return (
    <div className={styles.container}>
      <h1>تأیید شماره موبایل</h1>
      <p>کد تأیید برای شماره {phone} ارسال شد.</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <OtpInput
          value={code}
          onChange={(value) => setValue("code", value)}
          numInputs={6}
          inputType="number"
          inputStyle={styles.otpInput}
          shouldAutoFocus
          isDisabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || code.length < 6}
          className={styles.submitButton}
        >
          تأیید کد
        </button>
      </form>

      <p className={styles.resend}>ارسال مجدد کد؟</p>
    </div>
  );
}

export default Verify;
