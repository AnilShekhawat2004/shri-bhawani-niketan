import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { teacherEndpoints } from "../apis";

const {
  CREATE_SECTION_API,
  EDIT_SECTION_API,
  GET_ALL_SECTION_API,
  DELETE_SECTION_API,
  GET_COUNTS_API,
  GET_TEACH_DETAILS,
  TEACHER_CATEGORY_API,
} = teacherEndpoints;

export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Add Faculty");
    }
    toast.success("Faculty Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_SECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editSection = async (data, token) => {
  const toastId = toast.loading("Updating...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Faculty"
      );
    }

    toast.success("Faculty Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_SECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllSections = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_SECTION_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Sections");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_SECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const deleteSection = async (sectionId, token) => {
  const toastId = toast.loading("Deleting...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_SECTION_API,

      { sectionId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Faculty");
    }
    toast.success("Faculty Details Deleted Successfully");
    result = response?.data;
  } catch (error) {
    console.error("DELETE_SECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getCounts = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_COUNTS_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_COUNTS_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getTeachDetails = async (teachId) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_TEACH_DETAILS,
      {
        teachId,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Teacher Details"
      );
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get Teach Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getAllTeacherCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", TEACHER_CATEGORY_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Teacher Categories"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("TEACHER_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};