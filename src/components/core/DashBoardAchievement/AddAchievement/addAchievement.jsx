import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createAchievement,
  editAchievements,
} from "../../../../services/operations/achievementAPI";
import {
  setAchievement,
  setEditAchievement,
} from "../../../../slices/achievementSlice";
import Upload from "../../Faculty/Upload";

function AddAchievement() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { achievement, editAchievement } = useSelector(
    (state) => state.achievement
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (editAchievement && achievement) {
      setValue("title", achievement.title);
      setValue("descritption", achievement.descritption);
      setValue("thumbnail", achievement.thumbnailImage);
      setValue("status", achievement.status);
    }
  }, [editAchievement, achievement, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== achievement.title ||
      currentValues.descritption !== achievement.descritption ||
      currentValues.thumbnail !== achievement.thumbnailImage ||
      currentValues.status !== achievement.status
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editAchievement) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("achieveId", achievement._id);
        if (currentValues.title !== achievement.title) {
          formData.append("title", data.title);
        }
        if (currentValues.descritption !== achievement.descritption) {
          formData.append("descritption", data.descritption);
        }
        if (currentValues.thumbnail !== achievement.thumbnailImage) {
          formData.append("thumbnailImage", data.thumbnail);
        }
        if (currentValues.status !== achievement.status) {
          formData.append("status", data.status);
        }

        setLoading(true);
        const result = await editAchievements(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setAchievement(result));
          dispatch(setEditAchievement(false));
          navigate(`/dashboard/achievement`);
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("descritption", data.descritption);
    formData.append("thumbnailImage", data.thumbnail);
    formData.append("status", data.status);

    setLoading(true);
    const result = await createAchievement(formData, token);
    if (result) {
      dispatch(setAchievement(result));
      navigate("/dashboard/achievement");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 grid grid-cols-1"
    >
      {/* title */}
      <div className="relative">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter achievement title"
          className="form-input-style"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="descritption"
          className="text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="descritption"
          type="text"
          placeholder="Enter achievement description"
          className="form-input-style"
          {...register("descritption", { required: true })}
        />
        {errors.descritption && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-500">*</span>
        </p>

        <div className="flex gap-10 ml-3">
          {/* Draft */}
          <label className="relative flex gap-4 items-center px-4 py-2 rounded-xl cursor-pointer select-none">
            {/* Radio first in DOM so peer-checked works */}
            <input
              type="radio"
              value="Draft"
              defaultChecked
              {...register("status")}
              className="peer order-2 z-10 accent-bhawaniYellow"
            />
            {/* Text (left) */}
            <span className="order-1 z-10 font-medium peer-checked:text-white text-bhawaniRed">
              Draft
            </span>
            {/* Bg / border layer */}
            <span className="absolute inset-0 rounded-xl border border-bhawaniRed bg-white transition-colors duration-200 peer-checked:bg-bhawaniRed" />
          </label>

          {/* Published */}
          <label className="relative flex items-center gap-4 px-4 py-2 rounded-xl cursor-pointer select-none">
            <input
              type="radio"
              value="Published"
              {...register("status")}
              className="peer order-2 z-10 accent-bhawaniYellow"
            />
            <span className="order-1 z-10 font-medium peer-checked:text-white text-bhawaniRed">
              Published
            </span>
            <span className="absolute inset-0 rounded-xl border border-bhawaniRed bg-white transition-colors duration-200 peer-checked:bg-bhawaniRed" />
          </label>
        </div>
      </div>

      <div className="relative">
        <Upload
          name="thumbnail"
          label="Image"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editAchievement ? achievement?.thumbnail : null}
        />
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/achievement", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setAchievement(null));
              dispatch(setEditAchievement(false));
            }, 100);
          }}
          className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="pl-6 pr-6 pt-3 pb-3 rounded-xl shadow-lg text-bhawaniDark bg-bhawaniYellow"
        >
          {!editAchievement ? "Save" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AddAchievement;
