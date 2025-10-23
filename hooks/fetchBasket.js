import axiosInstance from "@/lib/axios";

export const fetchBasket = async () => {
  const res = await axiosInstance.get("/basket");
  return res.data;
};

export const addToBasket = async (tourId) => {
  try {
    const res = await axiosInstance.put(`/basket/${tourId}`);
    return res.data;
  } catch (err) {
    console.error("خطا در افزودن به سبد خرید:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "افزودن به سبد خرید ناموفق بود");
  }
};
