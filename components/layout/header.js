"use client";

import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import Login from "@/app/auth/login/page";
import Verify from "@/app/auth/verify/page";
import Image from "next/image";
import torino from "@/images/Torino.svg";
import styles from "@/styles/header.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const router = useRouter();
  const { user, logout, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileNavRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowVerify(true);
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const userData = Cookies.get("user");

    if (token && !user && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
      } catch (err) {
        console.error("خطا در خواندن کوکی user:", err);
      }
    }
  }, [user, setUser]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target)) {
        setMobileNavOpen(false);
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
    setMobileNavOpen(false);
  };

  const handleUserClick = () => {
    if (user?.mobile) {
      setMenuOpen((prev) => !prev);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("با موفقیت خارج شدید", { position: "top-center" });
    setTimeout(() => router.push("/"), 1500);
  };

  const handleNavClick = (path) => {
    router.push(path);
    setMobileNavOpen(false);
  };

  return (
    <header className={styles.container}>
      <button
        className={styles.mobileMenuButton}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        {mobileNavOpen ? <HiX /> : <HiMenu />}
      </button>

      <div className={styles.logo}>
        <Image src={torino} alt="Torino logo" onClick={handleHomePage} />
      </div>

      <nav className={styles.nav}>
        <p onClick={handleHomePage}>صفحه اصلی</p>
        <p onClick={() => handleNavClick("/services")}>خدمات گردشگری</p>
        <p onClick={() => handleNavClick("/about")}>درباره ما</p>
        <p onClick={() => handleNavClick("/contact")}>تماس با ما</p>
      </nav>

      <div ref={menuRef}>
        <button
          className={user?.mobile ? styles.logged : styles.logBtn}
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
            <a onClick={handleLogout} className={styles.logout}>
              <LuLogOut />
              <p>خروج از حساب کاربری</p>
            </a>
          </div>
        )}
      </div>

      {mobileNavOpen && (
        <div ref={mobileNavRef} className={styles.mobileNav}>
          <p onClick={handleHomePage}>صفحه اصلی</p>
          <p onClick={() => handleNavClick("/services")}>خدمات گردشگری</p>
          <p onClick={() => handleNavClick("/about")}>درباره ما</p>
          <p onClick={() => handleNavClick("/contact")}>تماس با ما</p>
        </div>
      )}

      {showLogin && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      {showVerify && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowVerify(false)}
            >
              ✕
            </button>
            <Verify onClose={() => setShowVerify(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
