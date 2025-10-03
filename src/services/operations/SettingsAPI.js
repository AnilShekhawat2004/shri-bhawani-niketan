import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";

const { CHANGE_PASSWORD_API, UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API } =
  settingsEndpoints;

export const updateDisplayPicture = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    console.log("This is the token from api : ", token);
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "POST",
      UPDATE_DISPLAY_PICTURE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Profile Picture"
      );
    }
    toast.success("Profile Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("UPDATE_DISPLAY_PICTURE_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateProfile = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", UPDATE_PROFILE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Update Profile Details"
      );
    }
    toast.success("Profile Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("UPDATE_PROFILE_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export async function changePassword(token, data) {
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHNAGE_PASSWORD_API Error..........", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}
