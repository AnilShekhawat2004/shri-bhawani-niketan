import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { photoEndpoints, imageEndpoints } from "../apis";

const {
  ADD_PHOTO_API,
  EDIT_PHOTO_API,
  DELETE_PHOTO_API,
  GET_ALL_PHOTO_API,
  GET_PHOTOS_COUNT,
  GET_PHOTOS_DETAILS,
  PHOTO_CATEGORIES_API,
} = photoEndpoints;

const {
    CREATE_IMAGE_CATEGORY_API,
    EDIT_IMAGE_CATEGORY_API,
    DELETE_IMAGE_CATEGORY_API,
    IMAGE_CATEGORYPAGEDETAILS_API,
  } = imageEndpoints;

export const addPhoto = async (data, token) => {
  const toastId = toast.loading("Uploading Photo...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", ADD_PHOTO_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Upload Photo");
    }
    toast.success("Photo Uploaded Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("ADD_PHOTO_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editPhotos = async (data, token) => {
  const toastId = toast.loading("Updating Image...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_PHOTO_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Image"
      );
    }
    toast.success("Image Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("EDIT_PHOTO_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deletePhoto = async (photoId, token) => {
  const toastId = toast.loading("Deleting Photo...");
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("DELETE", DELETE_PHOTO_API, {photoId}, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Photo");
    }
    toast.success("Photo Deleted Successfully");
  } catch (error) {
    console.error("DELETE_PHOTO_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
};

export const getAllPhotos = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_PHOTO_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Photos");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_PHOTO_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getPhotosCount = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_PHOTOS_COUNT);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_PHOTOS_COUNT Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getPhotosDetails = async (photoId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_PHOTOS_DETAILS,
      {
        photoId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Photos Details"
      );
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get Photos Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};


export const fetchPhotoCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", PHOTO_CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Photo Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("PHOTO_CATEGORIES_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const createImageCategory = async (data, token) => {
    const toastId = toast.loading("Creating Image Category...");
    let result = null;
    try {
      if (!token) throw new Error("Authorization Token Missing");
      const response = await apiConnector("POST", CREATE_IMAGE_CATEGORY_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could Not Create Image Category");
      }
      toast.success("Image Category Created Successfully");
      result = response?.data?.data;
    } catch (error) {
      console.error("CREATE_IMAGE_CATEGORY_API Error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
};
  
export const editImageCategory = async (data, token) => {
    const toastId = toast.loading("Updating Image Category...");
    let result = null;
    try {
      if (!token) throw new Error("Authorization Token Missing");
      const response = await apiConnector("PUT", EDIT_IMAGE_CATEGORY_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could Not Update Image Category");
      }
      toast.success("Image Category Updated Successfully");
      result = response?.data?.data;
    } catch (error) {
      console.error("EDIT_IMAGE_CATEGORY_API Error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
};
  
export const deleteImageCategory = async (categoryId, token) => {
    const toastId = toast.loading("Deleting Image Category...");
    try {
      if (!token) throw new Error("Authorization Token Missing");
      const response = await apiConnector("DELETE", `${DELETE_IMAGE_CATEGORY_API}/${categoryId}`, null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could Not Delete Image Category");
      }
      toast.success("Image Category Deleted Successfully");
    } catch (error) {
      console.error("DELETE_IMAGE_CATEGORY_API Error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
};
  
export const fetchImageCategoryDetails = async (categoryId) => {
    const toastId = toast.loading("Loading Image Category Details...");
    let result = null;
    try {
      const response = await apiConnector("GET", `${IMAGE_CATEGORYPAGEDETAILS_API}/${categoryId}`);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could Not Fetch Image Category Details");
      }
      result = response?.data?.data;
    } catch (error) {
      console.error("IMAGE_CATEGORYPAGEDETAILS_API Error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
};