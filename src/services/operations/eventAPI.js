import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { eventEndpoints } from "../apis";

const {
  CREATE_EVENTS_API,
  EDIT_EVENTS_API,
  DELETE_EVENTS_API,
  GET_ALL_EVENTS_API,
  GET_EVENT_COUNTS_API,
  GET_EVENT_DETAILS_API,
} = eventEndpoints;

export const createEvent = async (data, token) => {
  const toastId = toast.loading("Creating Event...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", CREATE_EVENTS_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Create Event");
    }
    toast.success("Event Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_EVENT_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editEvents = async (data, token) => {
  const toastId = toast.loading("Updating Event...");
  let result = null;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector("POST", EDIT_EVENTS_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Update Event");
    }
    toast.success("Event Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT_EVENT_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteEvent = async (eventId, token) => {
  const toastId = toast.loading("Deleting Event...");
  let success = false;
  try {
    if (!token) throw new Error("Authorization Token Missing");
    const response = await apiConnector(
      "DELETE",
      DELETE_EVENTS_API,
      { eventId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Delete Event");
    }
    toast.success("Event Deleted Successfully");
    success = true;
  } catch (error) {
    console.log("DELETE_EVENT_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllEvents = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_EVENTS_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Fetch Events");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_EVENTS_API Error........", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getEventCounts = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_EVENT_COUNTS_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Counts");
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_EVENT_COUNTS_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getEventDetails = async (eventId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_EVENT_DETAILS_API,
      {
        eventId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Get Event Details");
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get Event Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};
