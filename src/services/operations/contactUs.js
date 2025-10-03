import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactusEndpoints } from "../apis";

const {
  CONTACT_US_API,
  EDIT_CONTACT_US_API,
  GET_ALL_CONTACT,
  DELETE_CONTACT_API,
  GET_CONTACT_COUNTS_API,
  GET_CONTACT_DETAILS_API,
  GET_UNSEEN_CONTACT_API,
  MARKING_SEEN_CONTACT_API,
} = contactusEndpoints;

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

export const editContactUs = async (data, token) => {
  const toastId = toast.loading("Updating Inquiry...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_CONTACT_US_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Update inquiry");
    }
    toast.success("Inquiry Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT_CONTACT_US_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// Fetch All Contact Inquiries
export const getAllContacts = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_CONTACT);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Fetch Contact");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_CONTACT Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const deleteContact = async (contactId, token) => {
  const toastId = toast.loading("Deleting inquiry...");
  let success = false;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_CONTACT_API,
      { contactId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Delete inquiry");
    }
    toast.success("Inquiry Deleted Successfully");
    success = true;
  } catch (error) {
    console.log("DELETE_CONTACT_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return success;
};

export const getContactCounts = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_CONTACT_COUNTS_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_CONTACT_COUNTS_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getContactDetails = async (contactId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_CONTACT_DETAILS_API,
      {
        contactId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Inquiry Details"
      );
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get Inquiry Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getUnseenContact = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_UNSEEN_CONTACT_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Fetch Notifcation");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_UNSEEN_CONTACT_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const markingSeenContact = async () => {
  let result = [];
  try {
    const response = await apiConnector("POST", MARKING_SEEN_CONTACT_API);

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not Mark seen notfication"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("MARKING_SEEN_CONTACT_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
