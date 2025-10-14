import Image from "next/image";
import styles from "../styles/page.module.css";
import travel from "../images/design.svg";
import SearchForm from "@/components/forms/searchForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <Image
        src={travel}
        alt="travel"
        className={styles.image}
        layout="responsive"
        width={1440}
        height={350}
      />
      <div>
        <h2>
          <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
        </h2>
        <SearchForm/>
      </div>
    </div>
  );
}
