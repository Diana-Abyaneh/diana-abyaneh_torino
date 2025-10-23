import axiosInstance from "@/lib/axios";

const fetchTours = async () => {
  try {
    const res = await axiosInstance.get("/tour");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tours");
  }
};

export async function fetchTourById(tourId) {
  const res = await axiosInstance.get(`/tour/${tourId}`);
  return res.data;
}

export default fetchTours;
