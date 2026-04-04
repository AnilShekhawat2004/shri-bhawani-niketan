import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {
  courseCategoryEndpoints,
  courseCategoryProgramEndpoints,
  courseEndpoints,
} from "../apis";

const { COURSE_CATEGORIES_API } =
  courseEndpoints;

const {
  CREATE_CATEGORIES_API,
  EDIT_CATEGORY_API,
  DELETE_CATEGORY_API,
  GET_COURSE_COUNT_API,
  GET_COURSE_CATEGORY_DETAILS_API,
} = courseCategoryEndpoints;

const { SHOW_ALL_CATEGORYPROGRAM_API } = courseCategoryProgramEndpoints;

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Course Categories",
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("COURSE_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

//categories apis
export const createCategory = async (data, token) => {
  const toastId = toast.loading("Creating Course...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_CATEGORIES_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Create Course");
    }
    toast.success("Course Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_CATEGORIES_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editCategory = async (data, token) => {
  const toastId = toast.loading("Updating Category...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Update Category");
    }
    toast.success("Category Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCategory = async (courseId, token) => {
  const toastId = toast.loading("Deleting Course...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_CATEGORY_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Course");
    }
    toast.success("Course Deleted Successfully");
  } catch (error) {
    console.error("DELETE_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getCourseCounts = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_COURSE_COUNT_API);
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

export const getCourseCategoryDetails = async (courseId) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_CATEGORY_DETAILS_API,
      {
        courseId,
      },
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Course Details",
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("Get Course details API Error: ", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const showAllCategoryPrograms = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORYPROGRAM_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Category Programs",
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("SHOW_ALL_CATEGORYPROGRAM_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
