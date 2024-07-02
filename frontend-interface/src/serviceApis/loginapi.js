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
export const getWeather = async (city) => {
  try {
    const response = await axiosInstance.get("/weather", {
      params: city,
    });
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
export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const getTotalCountDetails = async (id) => {
  try {
    const response = await axiosInstance.get("/totalCount", {
      params: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching farm items:", error);
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
    const response = await axiosInstance.get("/farmItems", {
      params: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching farm items:", error);
    throw error;
  }
};
export const getFarmItemActivities = async (params) => {
  console.log("param", params);
  try {
    const response = await axiosInstance.get("/farmItemActivities", {
      params: { farmItemId: params.farmItemId },
    });
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
export const putEditProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/profile", data);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const putRestPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/reset-password", data);
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
export const putEditFarmActivity = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/farmItemActivities/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const deleteFarmActivity = async (id) => {
  try {
    const response = await axiosInstance.delete(`/farmItemActivities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
