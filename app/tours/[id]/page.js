"use client";

import * as shamsi from "shamsi-date-converter";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTourById } from "@/hooks/fetchTours";
import { addToBasket } from "@/hooks/fetchBasket";
import { length } from "@/hooks/length";
import { vehicleType } from "@/hooks/vehicle";
import { FaRoute } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { FaBus } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { HiShieldExclamation } from "react-icons/hi";
import { toast } from "react-toastify";
import Image from "next/image";
import styles from "@/styles/tourDetails.module.css";

export default function TourDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: tour,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => fetchTourById(id),
    enabled: !!id,
  });

  const basketMutation = useMutation({
    mutationFn: () => addToBasket(id),
    onSuccess: () => {
      toast.success("تور به سبد خرید اضافه شد", { position: "top-center" });
      setTimeout(() => router.push("/basket"), 1500);
    },
    onError: (err) => {
      toast.error(err.message || "خطا در افزودن به سبد خرید", {
        position: "top-center",
      });
    },
  });

  const handleBooking = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.warning("لطفاً ابتدا وارد حساب کاربری شوید", {
        position: "top-center",
      });
      router.push("/auth/login");
      return;
    }

    basketMutation.mutate();
  };

  if (isLoading)
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  if (error)
    return <div className={styles.error}>خطا در دریافت اطلاعات تور</div>;

  return (
    <div className={styles.container}>
      <div className={styles.tourInfo}>
        <div className={styles.image}>
          <Image
            src={tour.image}
            alt={`${tour.destination?.name || "مقصد"} تور`}
            width={397}
            height={265}
          />
        </div>
        <div className={styles.info}>
          <h1>{tour.title}</h1>
          <h3>{length(tour.startDate, tour.endDate)} روزه</h3>

          <div className={styles.options}>
            {tour.options?.map((option, idx) => (
              <p key={idx}>{option}</p>
            ))}
          </div>

          <div className={styles.reserve}>
            <p>
              {tour.price.toLocaleString()} <span>تومان</span>
            </p>
            <button onClick={handleBooking} disabled={basketMutation.isPending}>
              {basketMutation.isPending ? "در حال افزودن..." : "رزرو و خرید"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tourDet}>
        <div>
          <p className={styles.lable}>
            <span>
              <FaRoute />
            </span>
            مبدا
          </p>
          <p>{tour.origin?.name || "نامشخص"}</p>
        </div>

        <div>
          <p className={styles.lable}>
            <span>
              <LuCalendarDays />
            </span>
            تاریخ رفت
          </p>
          <p className={styles.details}>
            {shamsi.gregorianToJalali(tour.startDate).join("/")}
          </p>
        </div>

        <div>
          <p className={styles.lable}>
            <span>
              <LuCalendarDays />
            </span>
            تاریخ برگشت
          </p>
          <p className={styles.details}>
            {shamsi.gregorianToJalali(tour.endDate).join("/")}
          </p>
        </div>

        <div>
          <p className={styles.lable}>
            <span>
              <FaBus />
            </span>
            حمل و نقل
          </p>
          <p className={styles.details}>{vehicleType(tour.fleetVehicle)}</p>
        </div>

        <div>
          <p className={styles.lable}>
            <span>
              <MdPeopleAlt />
            </span>
            ظرفیت
          </p>
          <p className={styles.details}>{tour.capacity} نفر</p>
        </div>

        <div className={styles.insurance}>
          <p className={styles.lable}>
            <span>
              <HiShieldExclamation />
            </span>
            بیمه
          </p>
          <p className={styles.details}>{tour.insurance ? "دارد" : "ندارد"}</p>
        </div>
      </div>
    </div>
  );
}
