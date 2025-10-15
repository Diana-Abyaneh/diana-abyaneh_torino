import Image from "next/image";
import styles from "../styles/page.module.css";
import travel from "../images/design.svg";
import SearchForm from "@/components/forms/searchForm";
import Page from "./tours/page";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={travel}
          alt="travel"
          layout="responsive"
        />
      </div>
      <div className={styles.form}>
        <h2>
          <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
        </h2>
        <SearchForm/>
      </div>
      <div>
        <Page/>
      </div>
    </div>
  );
}
