import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import AddButton from "../../../Common/Buttons/addButton";
import { setUser } from "../../../../slices/profileSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function EditProfile() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("contactNumber", user.additionalDetails.contactNumber);
      setValue("about", user.additionalDetails.about);
    }
  }, [user, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.firstName !== user.firstName ||
      currentValues.lastName !== user.lastName ||
      currentValues.email !== user.email ||
      currentValues.contactNumber !== user.additionalDetails.contactNumber ||
      currentValues.about !== user.additionalDetails.about
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (isFormUpdated()) {
      const currentValues = getValues();
      const formData = new FormData();
      if (currentValues.firstName !== user.firstName) {
        formData.append("firstName", data.firstName);
      }
      if (currentValues.lastName !== user.lastName) {
        formData.append("lastName", data.lastName);
      }
      if (currentValues.email !== user.email) {
        formData.append("email", data.email);
      }
      if (
        currentValues.contactNumber !== user.additionalDetails.contactNumber
      ) {
        formData.append("contactNumber", data.contactNumber);
      }
      if (currentValues.about !== user.additionalDetails.about) {
        formData.append("about", data.about);
      }

      setLoading(true);
      const result = await updateProfile(formData, token);
      setLoading(false);
      if (result) {
        dispatch(setUser(result));
      } else {
        toast.error("No changes made to profile");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col gap-8"
    >
      <h2 className="text-3xl font-bold text-bhawaniDark">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          <label className="text-gray-600 font-medium">First Name</label>
          <input
            {...register("firstName")}
            placeholder="Enter first name"
            className="form-input-style"
          />

          <label className="text-gray-600 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
            className="form-input-style"
          />

          <label className="text-gray-600 font-medium">Contact Number</label>
          <input
            {...register("contactNumber")}
            type="tel"
            placeholder="Enter contact number"
            className="form-input-style"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          <label className="text-gray-600 font-medium">Last Name</label>
          <input
            {...register("lastName")}
            placeholder="Enter last name"
            className="form-input-style"
          />

          <label className="text-gray-600 font-medium">About</label>
          <textarea
            {...register("about")}
            placeholder="Enter bio"
            rows={5}
            className="form-input-style resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <AddButton
          text={loading ? "Saving..." : "Save"}
          className="px-5 py-2 shadow hover:scale-105 transition-transform"
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default EditProfile;
