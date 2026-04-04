import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacherCategories } from "../../../../services/operations/teacherAPI";
import { setTeacherDraft } from "../../../../slices/teacherSlice";
import Upload from "../Upload";

function AddFaculty({ onNext, onCancel, setThumbnailImage, thumbnailImage }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { teacher, editTeacher, teacherDraft } = useSelector(
    (state) => state.teacher,
  );
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const selectedCategory = watch("teachCategory");

  useEffect(() => {
    const resolveCategoryId = (category) => {
      if (!category) return "";
      if (typeof category === "string") return category;
      if (Array.isArray(category)) return category[0]?._id ?? "";
      return category?._id ?? "";
    };

    const getCategories = async () => {
      setLoading(true);
      const teachCategory = await getAllTeacherCategories();
      if (teachCategory.length > 0) {
        setCategories(teachCategory);
      }
      setLoading(false);
    };

    if (editTeacher && teacher) {
      const fallbackCategory =
        resolveCategoryId(teacher?.teachCategory) ||
        resolveCategoryId(teacher?.teachCat);

      const hasDraftName = typeof teacherDraft?.name === "string";
      const hasDraftDesignation = typeof teacherDraft?.designation === "string";
      const draftCategory = resolveCategoryId(
        teacherDraft?.teachCategory || teacherDraft?.teachCat,
      );

      setValue("teachName", hasDraftName ? teacherDraft.name : (teacher?.name ?? ""));
      setValue(
        "teachDesignation",
        hasDraftDesignation ? teacherDraft.designation : (teacher?.designation ?? ""),
      );
      setValue("teachCategory", draftCategory || fallbackCategory);
    } else if (teacherDraft?.name || teacherDraft?.designation || teacherDraft?.teachCategory) {
      setValue("teachName", teacherDraft?.name ?? "");
      setValue("teachDesignation", teacherDraft?.designation ?? "");
      setValue("teachCategory", resolveCategoryId(teacherDraft?.teachCategory));
    }

    getCategories();
  }, [editTeacher, teacher, teacherDraft, setValue]);

  useEffect(() => {
    if (!selectedCategory || !categories?.length) return;
    const exists = categories.some((category) => category?._id === selectedCategory);
    if (!exists) {
      setValue("teachCategory", "");
    }
  }, [selectedCategory, categories, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    dispatch(
      setTeacherDraft({
        name: data.teachName,
        designation: data.teachDesignation,
        teachCategory: data.teachCategory,
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
        <label
          htmlFor="teachName"
          className="text-sm font-medium text-gray-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="teachName"
          type="text"
          placeholder="Enter name"
          className="form-input-style"
          {...register("teachName", { required: true })}
        />
        {errors.teachName && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="teachDesignation"
          className="text-sm font-medium text-gray-700"
        >
          Designation <span className="text-red-500">*</span>
        </label>
        <input
          id="teachDesignation"
          type="text"
          placeholder="Enter designation"
          className="form-input-style"
          {...register("teachDesignation", { required: true })}
        />
        {errors.teachDesignation && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="teachCategory"
          className="text-sm font-medium text-gray-700"
        >
          Department
          <span className="text-red-500">*</span>
        </label>
        <select
          id="teachCategory"
          {...register("teachCategory", { required: true })}
          value={selectedCategory || ""}
          className="form-input-style w-full rounded-lg bg-white text-gray-600"
        >
          <option value="" disabled className="">
            Choose a Department
          </option>
          {!loading &&
            categories?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.teachCategory && (
          <span className="text-red-500 text-sm">
            Department is Required field
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
          editData={teacher?.image || teacher?.thumbnailImage}
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

export default AddFaculty;
