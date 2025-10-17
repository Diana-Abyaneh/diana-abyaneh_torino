import Page from "./tours/page";
import SearchForm from "@/components/forms/searchForm";
import Image from "next/image";
import styles from "../styles/page.module.css";
import travel from "../images/design.svg";
import { FaPhone } from "react-icons/fa6";
import man from "../images/professional.svg";
import eco from "../images/R (1).svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={travel} alt="travel" layout="responsive" />
      </div>
      <div className={styles.form}>
        <h2>
          <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
        </h2>
        <SearchForm />
      </div>
      <Page />
      <div className={styles.advertise}>
        <div className={styles.texts}>
          <div>
            <h2>
              خرید تلفنی از <span>تورینو</span>
            </h2>
            <h4>به هر کجا که می خواهید!</h4>
          </div>
          <Image src={man} alt="professional man" />
        </div>
        <div className={styles.info}>
          <div className={styles.call}>
            <h3>021-1840</h3>
            <span>
              <FaPhone />
            </span>
          </div>
          <button>اطلاعات بیشتر</button>
        </div>
      </div>
      <div className={styles.whyUs}>
        <div>
          <h1>
            <span className={styles.question}>؟</span>
            چرا <span className={styles.torino}>تورینو</span> ؟
          </h1>
          <h2>تور طبیعت گردی و تاریخی</h2>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
        <Image src={eco} alt="بوم گردی" />
      </div>
    </div>
  );
}
