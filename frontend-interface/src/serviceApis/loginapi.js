// src/services/userService.js
import axiosInstance from "./axiosInstance";

export const postLogin = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
