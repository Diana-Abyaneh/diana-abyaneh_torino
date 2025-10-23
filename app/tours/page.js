"use client";
import * as shamsi from "shamsi-date-converter";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import fetchTours from "@/hooks/fetchTours";
import { vehicleType } from "@/hooks/vehicle";
import { month } from "@/hooks/months";
import { length } from "@/hooks/length";
import Image from "next/image";
import styles from "../../styles/tours.module.css";

function Tours() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message || "Something went wrong!"}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>همه تور ها</h1>
      <ul>
        {data && data.length > 0 ? (
          data.map((tour) => (
            <li key={tour.id}>
              <Image
                src={tour.image}
                alt={tour.title}
                width={278}
                height={159}
              />
              <div className={styles.details}>
                <h3>{tour.title}</h3>
                <div className={styles.options}>
                  <p>
                    {month(shamsi.gregorianToJalali(tour.startDate)[1]) + "."}
                  </p>
                  <p>{length(tour.startDate, tour.endDate) + " روزه-"}</p>
                  <p>{vehicleType(tour.fleetVehicle)}</p>
                </div>
                <div className={styles.reserve}>
                  <Link href={`/tours/${tour.id}`}>
                    <button>جزئیات</button>
                  </Link>
                  <p>
                    <span>{tour.price.toLocaleString("fa")}</span> تومان
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>هیچ توری برای نمایش وجود ندارد</li>
        )}
      </ul>
    </div>
  );
}

export default Tours;
