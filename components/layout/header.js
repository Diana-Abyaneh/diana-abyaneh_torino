"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import Cookies from "js-cookie";
import Image from "next/image";
import torino from "@/images/Torino.svg";
import styles from "@/styles/header.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const router = useRouter();
  const { user, logout, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const userData = Cookies.get("user");

    if (token && !user && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        console.log("Header restored user from cookie:", parsed);
      } catch (err) {
        console.error("خطا در خواندن کوکی user:", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleHomePage = () => {
    if (window.location.pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleUserClick = () => {
    if (user?.mobile) {
      setMenuOpen((prev) => !prev);
    } else {
      router.push("/auth/login");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("با موفقیت خارج شدید", { position: "top-center" });
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <header className={styles.container}>
      <div>
        <Image
          src={torino}
          alt="Torino logo"
          className={styles.logo}
          onClick={handleHomePage}
        />
      </div>

      <nav className={styles.nav}>
        <p onClick={handleHomePage}>صفحه اصلی</p>
        <p>خدمات گردشگری</p>
        <p>درباره ما</p>
        <p>تماس با ما</p>
      </nav>

      <div ref={menuRef}>
        <button
          className={user?.mobile ? styles.logged : null}
          onClick={handleUserClick}
        >
          <IoPerson size={20} />
          <p>{user?.mobile || "ورود | ثبت‌نام"}</p>
          {user && <FaAngleDown />}
        </button>

        {menuOpen && user && (
          <div className={styles.menu}>
            <div className={styles.number}>
              <span>
                <IoPerson />
              </span>
              <p>{user.mobile}</p>
            </div>
            <a href="/profile" className={styles.menuItem}>
              <IoPerson />
              <p>اطلاعات حساب کاربری</p>
            </a>
            <a
              onClick={handleLogout}
              className={styles.logout}
            >
              <LuLogOut />
              <p>خروج از حساب کاربری</p>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
