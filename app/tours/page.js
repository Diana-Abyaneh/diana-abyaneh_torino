"use client";

import { useQuery } from "@tanstack/react-query";
import fetchTours from "@/hooks/fetchTours";
import Image from "next/image";

function Page() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message || "Something went wrong!"}</div>;
  }

  return (
    <div>
      <h1>همه تور ها</h1>
      <ul>
        {data && data.length > 0 ? (
          data.map((tour) => (
            <li key={tour.id}>
              <div>
                <Image src={tour.image} alt={tour.title} width={278} height={159} />
                <h3>{tour.title}</h3>
                <div></div>
                <div>
                  <button>رزرو</button>
                  <p>
                    <span>{tour.price}</span> تومان
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

export default Page;
