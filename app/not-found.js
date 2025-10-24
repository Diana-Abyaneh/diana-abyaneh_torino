"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import err404 from "@/images/ErrorTv.svg";
import styles from "@/styles/404.module.css";

function NotFound() {
  const router = useRouter();
  const clickHandler = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div>
        <h1>صفحه مورد نظر یافت نشد!</h1>
        <button onClick={() => clickHandler()}>بازگشت به صفحه اصلی</button>
      </div>
      <Image src={err404} alt="404 error" />
    </div>
  );
}

export default NotFound;
