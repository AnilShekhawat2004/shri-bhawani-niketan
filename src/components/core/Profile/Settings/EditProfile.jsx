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
      className="w-[100%] my-10 flex flex-col gap-10 rounded-xl shadow-lg border border-gray-400 bg-white p-8 px-12"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-[32px] font-bold text-bhawaniDark">
          Profile Information
        </h2>
        <div className="flex flex-row gap-20">
          <div className="flex flex-col gap-5 w-[50%]">
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="firstName"
                className="text-gray-600 font-bold text-lg"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-input-style"
                {...register("firstName")}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="email"
                className="text-gray-600 font-bold text-lg"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input-style"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label
                htmlFor="contactNumber"
                className="text-gray-600 font-bold text-lg"
              >
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-input-style"
                {...register("contactNumber", {
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 w-[50%]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="text-gray-600 font-bold text-lg"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-input-style"
                {...register("lastName")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="about"
                className="text-gray-600 font-bold text-lg"
              >
                About
              </label>
              <textarea
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-input-style"
                {...register("about")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <AddButton
          className="px-5 py-2 flex gap-0"
          text={loading ? "Saving..." : "Save"}
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default EditProfile;
