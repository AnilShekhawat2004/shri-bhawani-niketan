import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { photoEndpoints } from "../apis";

const {
  ADD_PHOTO_API,
  EDIT_PHOTO_API,
  DELETE_PHOTO_API,
  GET_ALL_PHOTO_API,
  GET_PHOTOS_COUNT,
  GET_PHOTOS_DETAILS,
  PHOTO_CATEGORIES_API,
} = photoEndpoints;

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
      throw new Error(response?.data?.message || "Could Not Update Image");
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
  let result = []
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_PHOTO_API,
      { photoId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Delete Photo");
    }
    toast.success("Photo Deleted Successfully");
    result = response?.data
  } catch (error) {
    console.error("DELETE_PHOTO_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
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
  return result;
};

export const fetchPhotoCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", PHOTO_CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Photo Categories"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("PHOTO_CATEGORIES_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
