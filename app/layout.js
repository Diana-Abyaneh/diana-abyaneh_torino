import ReactQueryProvider from "../lib/ReactQueryProvider";
import { IoPerson } from "react-icons/io5";
import Image from "next/image";
import torino from "../images/Torino.svg";
import aira from "../images/aira.svg";
import samandehi from "../images/samandehi.svg";
import qrCode from "../images/ecunion.svg";
import rights from "../images/passenger-rights.svg";
import airline from "../images/state-airline.svg";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ReactQueryProvider>
          <header>
            <Image src={torino} alt="Torino logo" />
            <div>
              <p>صفحه اصلی</p>
              <p>خدمات گردشگری</p>
              <p>درباره ما</p>
              <p>تماس با ما</p>
            </div>
            <button>
              <span>
                <IoPerson />
              </span>
              <p>ورود | ثبت نام</p>
            </button>
          </header>
          {children}
          <footer>
            <div className="footerContainer">
              <div>
                <h2>تورینو</h2>
                <p>درباره ما</p>
                <p>تماس با ما</p>
                <p>چرا تورینو؟</p>
                <p>بیمه مسافرتی</p>
              </div>
              <div>
                <h2>خدمات مشتریان</h2>
                <p>پشتیبانی آنلاین</p>
                <p>راهنمای خرید</p>
                <p>راهنمای استرداد</p>
                <p>پرسش و پاسخ</p>
              </div>
              <div className="certificates">
                <Image src={torino} alt="Torino logo" />
                <p>تلفن پشتیبانی: 8574-021</p>
                <div className="images">
                  <Image src={aira} alt="aira.ir" />
                  <Image src={samandehi} alt="samandehi.ir" />
                  <Image src={qrCode} alt="ecunion" />
                  <Image src={rights} alt="passenger rights" />
                  <Image src={airline} alt="state airlines" />
                </div>
              </div>
            </div>
            <p className="rights">کلیه حقوق این وبسایت متعلق به تورینو می باشد.</p>
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
