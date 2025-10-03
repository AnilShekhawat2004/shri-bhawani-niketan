import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { teachCategoryEndpoints, teacherEndpoints } from "../apis";

const {
  CREATE_SECTION_API,
  EDIT_SECTION_API,
  GET_ALL_SECTION_API,
  DELETE_SECTION_API,
  GET_COUNTS_API,
  GET_TEACH_DETAILS,
  CREATE_SUBSECTION_API,
  EDIT_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_SUBSECTION_API,
  TEACHER_CATEGORY_API,
} = teacherEndpoints;

const {
  TEACHER_CREATE_CATEGORY_API,
  TEACHER_EDIT_CATEGORY_API,
  TEACHER_DELETE_CATEGORY_API,
  TEACHER_CATEGORYPAGEDETAILS_API,
} = teachCategoryEndpoints;

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
    toast.success("Faculty Add Successfully");
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
        response?.data?.message || "Could Not Update Faculty Details"
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
  } catch (error) {
    console.error("DELETE_SECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
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

export const getTeachDetails = async (teachId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_TEACH_DETAILS,
      {
        teachId,
      },
      {
        Authorization: `Bearer ${token}`,
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
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Create Faculty Details"
      );
    }
    toast.success("Faculty Details Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("CREATE_SUBSECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editSubSection = async (data, token) => {
  const toastId = toast.loading("Updating Faculty Details...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Faculty Details"
      );
    }
    toast.success("Faculty Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_SUBSECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (subSectionId, token) => {
  const toastId = toast.loading("Deleting Sub-Section...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      `${DELETE_SUBSECTION_API}/${subSectionId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Delete Sub-Section"
      );
    }
    toast.success("Sub-Section Deleted Successfully");
  } catch (error) {
    console.error("DELETE_SUBSECTION_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getAllSubSections = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_SUBSECTION_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Sub-Sections"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_SUBSECTION_API Error:", error);
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

export const getTeacherCategoryPageDetails = async (categoryId) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${TEACHER_CATEGORYPAGEDETAILS_API}/${categoryId}`
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Category Page Details"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("TEACHER_CATEGORYPAGEDETAILS_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const createTeacherCategory = async (data, token) => {
  const toastId = toast.loading("Creating Teacher Category...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "POST",
      TEACHER_CREATE_CATEGORY_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Create Teacher Category"
      );
    }
    toast.success("Teacher Category Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("TEACHER_CREATE_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editTeacherCategory = async (data, token) => {
  const toastId = toast.loading("Updating Teacher Category...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "PUT",
      TEACHER_EDIT_CATEGORY_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Teacher Category"
      );
    }
    toast.success("Teacher Category Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("TEACHER_EDIT_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteTeacherCategory = async (categoryId, token) => {
  const toastId = toast.loading("Deleting Teacher Category...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      `${TEACHER_DELETE_CATEGORY_API}/${categoryId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Delete Teacher Category"
      );
    }
    toast.success("Teacher Category Deleted Successfully");
  } catch (error) {
    console.error("TEACHER_DELETE_CATEGORY_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};
