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

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const postAddItem = async (data) => {
  try {
    const response = await axiosInstance.post("/farmItems", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const getFarmItems = async (id) => {
  try {
    let url = "/farmItems";
    if (id) {
      url += `/${id}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching farm items:", error);
    throw error;
  }
};
export const putEditItem = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/farmItems/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const deleteFarmItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/farmItems/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const postAddFarmActivity = async (data) => {
  try {
    const response = await axiosInstance.post("/farmItemActivities", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
