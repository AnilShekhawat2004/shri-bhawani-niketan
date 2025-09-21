import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactusEndpoints } from "../apis";

const { CONTACT_US_API, GET_ALL_CONTACT } = contactusEndpoints;

// Submit Contact Us Form
export const submitContactForm = async (data) => {
  const toastId = toast.loading("Sending message...");
  let result = null;
  try {
    const response = await apiConnector("POST", CONTACT_US_API, data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Submit Inquiry");
    }
    toast.success("Message send successfully");
    result = response?.data;
  } catch (error) {
    console.error("CONTACT_US_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// Fetch All Contact Inquiries
export const getAllContacts = async (token) => {
  const toastId = toast.loading("Fetching Contacts...");
  let result = [];
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("GET", GET_ALL_CONTACT, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Contacts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_CONTACT Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};
