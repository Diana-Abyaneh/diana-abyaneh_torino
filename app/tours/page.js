"use client";
import * as shamsi from "shamsi-date-converter";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { vehicleType } from "@/hooks/vehicle";
import { month } from "@/hooks/months";
import { length } from "@/hooks/length";
import fetchTours from "@/hooks/fetchTours";
import Image from "next/image";
import styles from "../../styles/tours.module.css";
import SearchForm from "@/components/forms/searchForm";

function Tours() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    originId: searchParams.get("originId") || "",
    destinationId: searchParams.get("destinationId") || "",
    startDate: searchParams.get("startDate") || "",
  });

  const handleSearch = ({ originId, destinationId, startDate }) => {
    const params = new URLSearchParams();
    if (originId) params.set("originId", originId);
    if (destinationId) params.set("destinationId", destinationId);
    if (startDate) params.set("startDate", startDate);

    const newUrl = `/tours?${params.toString()}`;
    router.push(newUrl, { scroll: false });

    setFilters({ originId, destinationId, startDate });
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.originId) params.set("originId", filters.originId);
    if (filters.destinationId)
      params.set("destinationId", filters.destinationId);
    if (filters.startDate) params.set("startDate", filters.startDate);

    const queryString = params.toString();
    router.replace(`?${queryString}`, { scroll: false });
  }, [filters, router]);

  useEffect(() => {
    const originId = searchParams.get("originId");
    const destinationId = searchParams.get("destinationId");
    const startDate = searchParams.get("startDate");

    if (originId || destinationId || startDate) {
      setFilters({ originId, destinationId, startDate });
    }
  }, [searchParams]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tours", filters],
    queryFn: () => fetchTours(filters),
  });

  return (
    <div className={styles.container}>
      <SearchForm onSearch={handleSearch} defaultValues={filters} />

      <h1>همه تورها</h1>

      {isLoading && <p>در حال بارگذاری...</p>}
      {error && <p>خطا در دریافت اطلاعات</p>}

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
