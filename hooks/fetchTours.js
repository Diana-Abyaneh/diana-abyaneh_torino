import axiosInstance from "@/lib/axios";

export default async function fetchTours(filters = {}) {
  try {
    const params = {};

    if (filters.originId) params.originId = filters.originId;
    if (filters.destinationId) params.destinationId = filters.destinationId;
    if (filters.startDate) params.startDate = filters.startDate;

    const res = await axiosInstance.get("/tour", { params });
    return res.data;
  } catch (err) {
    console.error("خطا در دریافت تورها:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "خطا در دریافت لیست تورها");
  }
}

export async function fetchTourById(tourId) {
  const res = await axiosInstance.get(`/tour/${tourId}`);
  return res.data;
}
