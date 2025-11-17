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
      className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl flex flex-col gap-8"
    >
      <h2 className="text-3xl font-bold text-bhawaniDark">Change Password</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Old Password */}
        <div className="relative">
          <label className="text-gray-600 font-medium">Current Password</label>
          <input
            {...register("oldPassword", { required: true })}
            type={showOldPassword ? "text" : "password"}
            placeholder="Enter current password"
            className="form-input-style focus:ring-2 focus:ring-bhawaniRed/50 rounded-lg pr-12"
          />
          <span
            onClick={() => setShowOldPassword((prev) => !prev)}
            className="absolute right-3 top-[33px] cursor-pointer"
          >
            {showOldPassword ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </span>
          {errors.oldPassword && (
            <span className="text-red-600 text-sm">Required</span>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="text-gray-600 font-medium">New Password</label>
          <input
            {...register("newPassword", { required: true })}
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="form-input-style focus:ring-2 focus:ring-bhawaniRed/50 rounded-lg pr-12"
          />
          <span
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-[33px] cursor-pointer"
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </span>
          {errors.newPassword && (
            <span className="text-red-600 text-sm">Required</span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <AddButton
          text={loading ? "Updating..." : "Update"}
          className="px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default Password;
