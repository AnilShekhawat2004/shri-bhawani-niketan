import { useSelector } from "react-redux";
import AddButton from "../../../Common/Buttons/addButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../../services/operations/SettingsAPI";

function Password() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitPassword = async (data) => {
    try {
      setLoading(true);
      const res = await changePassword(token, data);
      setLoading(false);

      if (res) {
        reset();
      }
    } catch (error) {
      console.log("Error while updating passowrd : ", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitPassword)}
      className="w-[100%] my-10 flex flex-col gap-10 rounded-xl shadow-lg border border-gray-400 bg-white p-8 px-12"
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-[32px] font-bold text-bhawaniDark">
          Change Password
        </h2>
        <div className="flex flex-row gap-20">
          <div className="relative flex flex-col gap-2 w-[40%]">
            <label
              htmlFor="oldPassword"
              className="text-gray-600 font-bold text-lg"
            >
              Current Password<span className="text-red-500">*</span>
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter current password"
              className="form-input-style"
              {...register("oldPassword", { required: true })}
            />
            {errors.oldPassword && (
              <span className="text-red-700 text-sm">Required field</span>
            )}
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[44px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <div className="relative flex flex-col gap-2 w-[40%]">
            <label
              htmlFor="newPassword"
              className="text-gray-600 font-bold text-lg"
            >
              New Password<span className="text-red-500">*</span>
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              className="form-input-style"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && (
              <span className="text-red-700 text-sm">Required field</span>
            )}
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[44px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <AddButton
          className="px-4 py-2 flex gap-0"
          text={loading ? "Updating..." : "Update"}
        />
      </div>
    </form>
  );
}

export default Password;
