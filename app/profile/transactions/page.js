"use client";

import { useEffect, useState } from "react";
import { getUserTransactions } from "@/hooks/user";
import styles from "@/styles/profile.module.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getUserTransactions().then(setTransactions).catch(console.error);
  }, []);

  return (
    <div className={styles.listBox}>
      <h2>تراکنش‌ها</h2>
      {transactions.length === 0 ? (
        <p>تراکنشی وجود ندارد</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>تاریخ و ساعت</th>
              <th>مبلغ</th>
              <th>نوع تراکنش</th>
              <th>شناسه تور</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id}>
                <td>{new Date(trx.createdAt).toLocaleString("fa-IR")}</td>
                <td>{trx.amount.toLocaleString("fa")} تومان</td>
                <td>{trx.type === "Purchase" ? "ثبت نام در تور گردشگری": trx.type}</td>
                <td>{trx.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
