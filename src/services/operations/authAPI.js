import { toast } from "react-hot-toast";

import { setLoading, setToken, setUser } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const { LOGIN_API, RESETPASSWORD_API, RESETPASSWORDTOKEN_API } = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/faculty");
    } catch (error) {
      console.log("Login API Error.......", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getResetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Password Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("Reset Password Token Error", error);
      toast.error("Failed to send email for reseting password");
    }
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      console.log("Reset Password Token Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}
