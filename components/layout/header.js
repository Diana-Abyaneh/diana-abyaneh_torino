"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import Cookies from "js-cookie";
import Image from "next/image";
import torino from "@/images/Torino.svg";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const router = useRouter();
  const { user, logout, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const userData = Cookies.get("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setMobile(parsedUser.mobile);
    }
  }, [setUser]);

  const handleLoginClick = () => {
    if (mobile) {
      setMenuOpen((prev) => !prev);
    } else {
      router.push("/auth/login");
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    logout();
    setMobile(null);
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white relative">
      <Image src={torino} alt="Torino logo" className="h-10 w-auto" />

      <div className="flex gap-6 text-gray-700">
        <p>صفحه اصلی</p>
        <p>خدمات گردشگری</p>
        <p>درباره ما</p>
        <p>تماس با ما</p>
      </div>

      <div className="relative">
        <button
          onClick={handleLoginClick}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-700 transition"
        >
          <IoPerson size={20} />
          <p>{mobile ? mobile : "ورود | ثبت‌نام"}</p>
        </button>

        {menuOpen && mobile && (
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded-xl shadow-lg text-sm overflow-hidden">
            <button
              onClick={() => router.push("/profile")}
              className="block w-full text-right px-4 py-2 hover:bg-gray-100"
            >
              پروفایل من
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-right px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
