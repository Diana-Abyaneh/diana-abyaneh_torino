"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { DatePicker } from "zaman";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getUserProfile, updateUserProfile } from "@/hooks/user";
import styles from "@/styles/profile.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUser(res);
        if (res.birthDate) setDateValue({ value: new Date(res.birthDate) });
      })
      .catch(() => toast.error("خطا در دریافت اطلاعات کاربر"));
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const updated = {
        ...user,
        birthDate: dateValue?.value?.toISOString() || null,
      };
      await updateUserProfile(updated);
      toast.success("اطلاعات با موفقیت ذخیره شد");
      setEdit(false);
    } catch {
      toast.error("ذخیره اطلاعات انجام نشد");
    }
  };

  if (!user) return <p>در حال بارگذاری...</p>;

  return (
    <div className={styles.profileBox}>
      <header className={styles.header}>
        <h2>پروفایل</h2>
        {!edit ? (
          <button onClick={() => setEdit(true)} className={styles.editBtn}>
            <FaEdit /> ویرایش
          </button>
        ) : (
          <div>
            <button onClick={handleSave} className={styles.saveBtn}>
              <FaSave /> ذخیره
            </button>
            <button onClick={() => setEdit(false)} className={styles.cancelBtn}>
              <FaTimes /> انصراف
            </button>
          </div>
        )}
      </header>

      <section>
        <h3>اطلاعات حساب</h3>
        <div className={styles.row}>
          <label>شماره موبایل:</label>
          <input value={Cookies.get("phone")} disabled />
        </div>
        <div className={styles.row}>
          <label>ایمیل:</label>
          <input
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
      </section>

      <section>
        <h3>اطلاعات شخصی</h3>
        <div className={styles.row}>
          <label>نام و نام خانوادگی:</label>
          <input
            name="fullName"
            value={user.fullName || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className={styles.row}>
          <label>کد ملی:</label>
          <input
            name="nationalCode"
            value={user.nationalCode || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className={styles.row}>
          <label>تاریخ تولد:</label>
          {edit ? (
            <DatePicker
              round="x2"
              accentColor="#28a745"
              locale="fa"
              value={dateValue}
              onChange={setDateValue}
              inputPlaceholder="تاریخ تولد"
              inputClass={styles.dateInput}
            />
          ) : (
            <input
              value={
                user.birthDate
                  ? new Date(user.birthDate).toLocaleDateString("fa-IR")
                  : ""
              }
              disabled
            />
          )}
        </div>
        <div className={styles.row}>
          <label>جنسیت:</label>
          <select
            name="gender"
            value={user.gender || ""}
            onChange={handleChange}
            disabled={!edit}
          >
            <option value="">انتخاب کنید</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>
      </section>

      <section>
        <h3>اطلاعات بانکی</h3>
        <div className={styles.row}>
          <label>شماره کارت:</label>
          <input
            name="cardNumber"
            value={user.cardNumber || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <div className={styles.row}>
          <label>شماره حساب:</label>
          <input
            name="accountNumber"
            value={user.accountNumber || ""}
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
      </section>
    </div>
  );
}
