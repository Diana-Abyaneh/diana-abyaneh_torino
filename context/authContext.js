"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  const token = Cookies.get("accessToken");
  const userData = Cookies.get("user");

  if (token && userData) {
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      console.error("خطا در خواندن کوکی user:", err);
    }
  } else {
    const savedPhone = Cookies.get("phone");
    if (savedPhone) setPhone(savedPhone);
  }
}, []);


  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    Cookies.remove("phone");
    setUser(null);
    setPhone("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        phone,
        setPhone,
        isLoading,
        setIsLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
