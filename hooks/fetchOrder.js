import axiosInstance from "@/lib/axios";

export const createOrder = async (passenger) => {
  try {
    const payload = {
      nationalCode: passenger.nationalCode,
      fullName: passenger.fullName,
      gender: passenger.gender,
      birthDate: passenger.birthDate,
    };

    const res = await axiosInstance.post("/order", payload);
    return res.data;
  } catch (err) {
    console.error("خطا در ثبت سفارش:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "خطا در ثبت سفارش یا پرداخت");
  }
};
