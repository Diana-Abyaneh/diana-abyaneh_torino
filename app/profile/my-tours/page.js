"use client";

import { useEffect, useState } from "react";
import { getUserTours } from "@/hooks/user";
import { FaBus, FaPlane, FaTrain, FaShip, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import styles from "@/styles/myTours.module.css";
import { vehicleType } from "@/hooks/vehicle";

export default function MyTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    getUserTours().then(setTours).catch(console.error);
  }, []);

  const vehicleIcon = (type) => {
    switch (type) {
      case "bus":
        return <FaBus className={styles.vehicleIcon} />;
      case "airplane":
        return <FaPlane className={styles.vehicleIcon} />;
      case "train":
        return <FaTrain className={styles.vehicleIcon} />;
      case "ship":
        return <FaShip className={styles.vehicleIcon} />;
      default:
        return <FaBus className={styles.vehicleIcon} />;
    }
  };

  return (
    <div className={styles.toursContainer}>
      <h2>تورهای من</h2>
      {tours.length === 0 ? (
        <p className={styles.noTours}>هیچ توری خریداری نشده است</p>
      ) : (
        <div className={styles.cardsContainer}>
          {tours.map((tour) => (
            <div key={tour.id} className={styles.tourCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.tourTitle}>{tour.title}</h3>
                <span className={styles.tourId}>#{tour.id}</span>
              </div>
              
              <div className={styles.cardBody}>
                <div className={styles.routeSection}>
                  <div className={styles.location}>
                    <FaMapMarkerAlt className={styles.locationIcon} />
                    <div className={styles.locationInfo}>
                      <span className={styles.locationLabel}>مبدا</span>
                      <span className={styles.locationName}>{tour.origin.name}</span>
                    </div>
                  </div>
                  
                  <div className={styles.locationArrow}>←</div>
                  
                  <div className={styles.location}>
                    <FaMapMarkerAlt className={styles.locationIcon} />
                    <div className={styles.locationInfo}>
                      <span className={styles.locationLabel}>مقصد</span>
                      <span className={styles.locationName}>{tour.destination.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.datesSection}>
                  <div className={styles.dateItem}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <div className={styles.dateInfo}>
                      <span className={styles.dateLabel}>تاریخ رفت</span>
                      <span className={styles.dateValue}>
                        {new Date(tour.startDate).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.dateItem}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <div className={styles.dateInfo}>
                      <span className={styles.dateLabel}>تاریخ برگشت</span>
                      <span className={styles.dateValue}>
                        {new Date(tour.endDate).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.vehicleSection}>
                    {vehicleIcon(tour.fleetVehicle)}
                    <span className={styles.vehicleText}>
                      {vehicleType(tour.fleetVehicle)}
                    </span>
                  </div>
                  
                  <div className={styles.priceSection}>
                    <FaMoneyBillWave className={styles.priceIcon} />
                    <span className={styles.priceValue}>
                      {tour.price.toLocaleString("fa")} تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}