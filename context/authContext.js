"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = (phoneNumber) => {
    setPhone(phoneNumber);
  };

  const logout = () => {
    setUser(null);
    setPhone("");
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsDropdownOpen(false);
  };

  const value = {
    user,
    setUser: (userData) => {
      setUser(userData);
      if (userData) {
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      } else {
        Cookies.remove("user");
      }
    },
    phone,
    setPhone,
    isLoading,
    setIsLoading,
    login,
    logout,
    isDropdownOpen,
    setIsDropdownOpen
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};