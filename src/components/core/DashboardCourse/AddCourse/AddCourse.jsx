import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCategory,
  editCategory,
  showAllCategoryPrograms,
} from "../../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import Upload from "../../Faculty/Upload";

function AddCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [catProgram, setCatProgram] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCatProgram = async () => {
      setLoading(true);
      const categoryProgram = await showAllCategoryPrograms();
      if (categoryProgram.length > 0) {
        setCatProgram(categoryProgram);
      }
      setLoading(false);
    };

    if (editCourse && course) {
      setValue("name", course.name);
      setValue("description", course.description);
      setValue("image", course.thumbnailImage);
      setValue("categoryProgram", course.categoryProgram);
    }

    getCatProgram();
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.name !== course.name ||
      currentValues.description !== course.description ||
      currentValues.image !== course.thumbnailImage ||
      currentValues.categoryProgram !== course.categoryProgram
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.name !== course.name) {
          formData.append("name", data.name);
        }
        if (currentValues.description !== course.description) {
          formData.append("description", data.description);
        }
        if (currentValues.image !== course.thumbnailImage) {
          formData.append("thumbnailImage", data.image);
        }
        if (currentValues.categoryProgram !== course.categoryProgram) {
          formData.append("categoryProgram", data.categoryProgram);
        }

        setLoading(true);
        const result = await editCategory(formData, token);
        setLoading(false);
        if (result) {
          // dispatch(setStep(2));
          dispatch(setCourse(result));
          navigate(`/dashboard/courses/editCourseDetails?id=${course._id}`);
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("thumbnailImage", data.image);
    formData.append("categoryProgram", data.categoryProgram);
    setLoading(true);
    const result = await createCategory(formData, token);
    if (result) {
      dispatch(setCourse(result));
      navigate("/dashboard/courses/addCourseDetails");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 grid grid-cols-1"
    >
      {/* Name */}
      <div className="relative">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          className="form-input-style"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <input
          id="description"
          type="text"
          placeholder="Enter description"
          className="form-input-style"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="categoryProgram"
          className="text-sm font-medium text-gray-700"
        >
          Program
          <span className="text-red-500">*</span>
        </label>
        <select
          id="categoryProgram"
          {...register("categoryProgram", { required: true })}
          defaultValue=""
          className="form-input-style text-gray-400"
        >
          <option value="" disabled className="">
            Choose a Program
          </option>
          {!loading &&
            catProgram?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.categoryProgram && (
          <span className="text-red-500 text-sm">
            Program is Required field
          </span>
        )}
      </div>

      <div className="relative">
        <Upload
          name="image"
          label="Image"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.image : null}
        />
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/courses", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setCourse(null));
              dispatch(setEditCourse(false));
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
          {!editCourse ? "Next" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AddCourse