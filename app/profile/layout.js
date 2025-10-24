"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaSuitcase, FaExchangeAlt } from "react-icons/fa";
import styles from "@/styles/profile.module.css";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <ul>
          <li className={pathname === "/profile" ? styles.active : ""}>
            <Link href="/profile">
              <FaUser /> پروفایل
            </Link>
          </li>
          <li className={pathname === "/profile/my-tours" ? styles.active : ""}>
            <Link href="/profile/my-tours">
              <FaSuitcase /> تورهای من
            </Link>
          </li>
          <li className={pathname === "/profile/transactions" ? styles.active : ""}>
            <Link href="/profile/transactions">
              <FaExchangeAlt /> تراکنش‌ها
            </Link>
          </li>
        </ul>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
