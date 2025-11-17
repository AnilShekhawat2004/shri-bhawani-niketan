import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {
  courseCategoryEndpoints,
  courseCategoryProgramEndpoints,
  courseEndpoints,
} from "../apis";

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
} = courseEndpoints;

const {
  CREATE_CATEGORIES_API,
  CATEGORYPAGEDETAILS_API,
  EDIT_CATEGORY_API,
  DELETE_CATEGORY_API,
  GET_COURSE_COUNT_API,
  GET_COURSE_CATEGORY_DETAILS_API,
} = courseCategoryEndpoints;

const {
  CREATE_CATEGORYPROGRAM_API,
  EDIT_CATEGORYPROGRAM_API,
  DELETE_CATEGORYPROGRAM_API,
  SHOW_ALL_CATEGORYPROGRAM_API,
  PROGRAM_CATEGORY_COUNT_API,
} = courseCategoryProgramEndpoints;

export const getAllCourses = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch All Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_COURSE_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const fetchCourseDetails = async (courseId) => {
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Course Details"
      );
    }
    result = response.data;
  } catch (error) {
    console.error("COURSE_DETAILS_API Error:", error);
    result = error?.response?.data || null;
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const editCourses = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Course Details"
      );
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_COURSE_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Course Categories"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("COURSE_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const createCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Create Course");
    }
    toast.success("Course Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_COURSE_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COURSE_API}/${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Course");
    }
    toast.success("Course Deleted Successfully");
  } catch (error) {
    console.error("DELETE_COURSE_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getFullCourseDetails = async (courseId, token) => {
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Course Details"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("COURSE_FULL_DETAILS_API Error:", error);
    result = error?.response?.data || null;
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

export const fetchCategoryPageDetails = async (categoryId) => {
  const toastId = toast.loading("Loading Category Details...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${CATEGORYPAGEDETAILS_API}/${categoryId}`
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Category Details"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("CATEGORYPAGEDETAILS_API Error:", error);
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
      }
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

export const getCourseCategoryDetails = async (courseId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_CATEGORY_DETAILS_API,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Course Details"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("Get Course details API Error: ", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

// category program apis
export const createCategoryProgram = async (data, token) => {
  const toastId = toast.loading("Creating Category Program...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORYPROGRAM_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Create Category Program"
      );
    }
    toast.success("Category Program Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_CATEGORYPROGRAM_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editCategoryProgram = async (data, token) => {
  const toastId = toast.loading("Updating Category Program...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("PUT", EDIT_CATEGORYPROGRAM_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Category Program"
      );
    }
    toast.success("Category Program Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_CATEGORYPROGRAM_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCategoryProgram = async (programId, token) => {
  const toastId = toast.loading("Deleting Category Program...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      `${DELETE_CATEGORYPROGRAM_API}/${programId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Delete Category Program"
      );
    }
    toast.success("Category Program Deleted Successfully");
  } catch (error) {
    console.error("DELETE_CATEGORYPROGRAM_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const showAllCategoryPrograms = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORYPROGRAM_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Category Programs"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("SHOW_ALL_CATEGORYPROGRAM_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getCategoryProgramCount = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", PROGRAM_CATEGORY_COUNT_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_CATEGORY_PROGRAM_COUNTS_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
