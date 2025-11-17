import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { newsEndpoints } from "../apis";

const {
  CREATE_NEWS_API,
  DELETE_NEWS_API,
  GET_ALL_NEWS,
  GET_RECENT_NEWS,
  EDIT_NEWS,
  GET_NEWS_COUNTS,
  GET_NEWS_DETAILS,
} = newsEndpoints;

export const createNews = async (data, token) => {
  const toastId = toast.loading("Creating News...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_NEWS_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Create News");
    }
    toast.success("News Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_NEWS_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteNews = async (newsId, token) => {
  const toastId = toast.loading("Deleting News....");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_NEWS_API,
      { newsId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete News");
    }
    toast.success("News Deleted Successfully");
  } catch (error) {
    console.log("DELETE_NEWS_API Error.......", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getAllNews = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_NEWS);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch News");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_NEWS_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const updateNews = async (data, token) => {
  const toastId = toast.loading("Updating News...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_NEWS, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Update News");
    }
    toast.success("News Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT_NEWS_API Error.......", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getRecentNews = async (newsId) => {
  let result = [];
  try {
    const response = await apiConnector("POST", GET_RECENT_NEWS, { newsId });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Recent News");
    }
    result = response?.data?.recentNews;
  } catch (error) {
    console.log("GET_RECENT_NEWS_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getNewsCounts = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_NEWS_COUNTS);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_NEWS_COUNTS Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getNewsDetails = async (newsId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_NEWS_DETAILS,
      {
        newsId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Get News Details");
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get News Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
