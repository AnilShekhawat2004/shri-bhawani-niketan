import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const { GET_USER_DETAILS_API } = profileEndpoints;

export const getUserDetails = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("GET", GET_USER_DETAILS_API, "null", {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Profile Details"
      );
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("GET_USER_DETAILS_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};
