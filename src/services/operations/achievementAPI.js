import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { achievementEndpoints } from "../apis";

const {
  CREATE_ACHIEVEMENT_API,
  DELETE_ACHIEVEMENT_API,
  GET_ALL_ACHIEVEMENT_API,
  EDIT_ACHIEVEMENT_API,
  GET_ACHIEVEMENT_COUNT_API,
  GET_ACHIEVEMENT_DETAILS_API,
} = achievementEndpoints;

export const createAchievement = async (data, token) => {
  const toastId = toast.loading("Creating Achievement...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_ACHIEVEMENT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Create Achievement"
      );
    }
    toast.success("Achievement Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_ACHIEVEMENT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editAchievements = async (data, token) => {
  const toastId = toast.loading("Updating Achievement...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_ACHIEVEMENT_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Achievement"
      );
    }
    toast.success("Achievement Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_ACHIEVEMENT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllAchievements = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_ACHIEVEMENT_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Achievements"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_ACHIEVEMENT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const deleteAchievement = async (achieveId, token) => {
  const toastId = toast.loading("Deleting Achievement...");
  try {
    const response = await apiConnector("DELETE", DELETE_ACHIEVEMENT_API, {achieveId}, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Achievement");
    }
    toast.success("Achievement Deleted Successfully");
  } catch (error) {
    console.error("DELETE_ACHIEVEMENT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getAchievementCounts = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_ACHIEVEMENT_COUNT_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ACHIEVEMENT_COUNT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getAchieveDetails = async (achieveId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_ACHIEVEMENT_DETAILS_API,
      {
        achieveId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Achievement Details"
      );
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get Achievement Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};
