import axiosInstance from "@/lib/axios";

export const getUserProfile = async () => {
  const { data } = await axiosInstance.get("/user/profile");
  return data;
};

export const updateUserProfile = async (payload) => {
  const { data } = await axiosInstance.put("/user/profile", payload);
  return data;
};

export const getUserTours = async () => {
  const { data } = await axiosInstance.get("/user/tours");
  return data;
};

export const getUserTransactions = async () => {
  const { data } = await axiosInstance.get("/user/transactions");
  return data;
};
