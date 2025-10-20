"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    phone,
    setPhone,
    verificationCode,
    setVerificationCode,
    user,
    setUser,
    isLoading,
    setIsLoading,

    login: (phoneNumber) => {
      setPhone(phoneNumber);
    },

    verify: (code) => {
      setVerificationCode(code);
    },

    logout: () => {
      setPhone("");
      setVerificationCode("");
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
