import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showAllCategoryPrograms } from "../../../../services/operations/courseAPI";
import { setCourseDraft } from "../../../../slices/courseSlice";
import Upload from "../../Faculty/Upload";

function AddCourse({ onNext, onCancel, setThumbnailImage, thumbnailImage }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse, courseDraft } = useSelector(
    (state) => state.course,
  );
  const [loading, setLoading] = useState(false);
  const [catProgram, setCatProgram] = useState([]);
  const selectedCatProgram = watch("categoryProgram");

  useEffect(() => {
    const resolveCategoryId = (category) => {
      if (!category) return "";
      if (typeof category === "string") return category;
      if (Array.isArray(category)) return category[0]?._id ?? "";
      return category?._id ?? "";
    };

    const getCatProgram = async () => {
      setLoading(true);
      const categoryProgram = await showAllCategoryPrograms();
      if (categoryProgram.length > 0) {
        setCatProgram(categoryProgram);
      }
      setLoading(false);
    };

    if (editCourse && course) {
      const fallbackCategory = resolveCategoryId(course?.categoryProgram);

      const hasDraftName = typeof courseDraft?.name === "string";
      const hasDraftDesignation = typeof courseDraft?.description === "string";
      const draftCategory = resolveCategoryId(courseDraft?.categoryProgram);

      setValue("name", hasDraftName ? courseDraft.name : (course?.name ?? ""));
      setValue(
        "description",
        hasDraftDesignation
          ? courseDraft.description
          : (course?.description ?? ""),
      );
      setValue("categoryProgram", draftCategory || fallbackCategory);
    } else if (
      courseDraft?.name ||
      courseDraft?.description ||
      courseDraft?.categoryProgram
    ) {
      setValue("name", courseDraft?.name ?? "");
      setValue("description", courseDraft?.description ?? "");
      setValue(
        "categoryProgram",
        resolveCategoryId(courseDraft?.categoryProgram),
      );
    }

    getCatProgram();
  }, [editCourse, course, courseDraft, setValue]);

  useEffect(() => {
    if (!selectedCatProgram || !catProgram?.length) return;
    const exists = catProgram.some(
      (category) => category?._id === selectedCatProgram,
    );
    if (!exists) {
      setValue("categoryProgram", "");
    }
  }, [selectedCatProgram, catProgram, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    dispatch(
      setCourseDraft({
        name: data.name,
        description: data.description,
        categoryProgram: data.categoryProgram,
      }),
    );

    onNext();
    setLoading(false);
  };

  const handleImageChange = (file) => {
    setThumbnailImage(file);
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
          value={selectedCatProgram || ""}
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
          viewData={thumbnailImage}
          editData={editCourse ? course?.image : null}
          onFileChange={handleImageChange}
        />
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="pl-6 pr-6 pt-3 pb-3 rounded-xl shadow-lg text-bhawaniDark bg-bhawaniYellow"
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default AddCourse;
