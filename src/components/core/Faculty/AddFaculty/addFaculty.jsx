import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createSection,
  editSection,
  getAllTeacherCategories,
} from "../../../../services/operations/teacherAPI";
import { setEditTeacher, setTeacher } from "../../../../slices/teacherSlice";
import Upload from "../Upload";

function AddFaculty() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { teacher, editTeacher } = useSelector((state) => state.teacher);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const teachCat = await getAllTeacherCategories();
      if (teachCat.length > 0) {
        setCategories(teachCat);
      }
      setLoading(false);
    };

    if (editTeacher && teacher) {
      setValue("teachName", teacher.name);
      setValue("teachDesignation", teacher.designation);
      setValue("image", teacher.thumbnailImage);
      setValue("teachCategory", teacher.teachCat);
    }

    getCategories();
  }, [editTeacher, teacher, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.teachName !== teacher.name ||
      currentValues.teachDesignation !== teacher.designation ||
      currentValues.image !== teacher.thumbnailImage ||
      currentValues.teachCategory !== teacher.teachCat
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editTeacher) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("sectionId", teacher._id);
        if (currentValues.teachName !== teacher.name) {
          formData.append("name", data.teachName);
        }
        if (currentValues.teachDesignation !== teacher.designation) {
          formData.append("designation", data.teachDesignation);
        }
        if (currentValues.image !== teacher.thumbnailImage) {
          formData.append("thumbnailImage", data.image);
        }
        if (currentValues.teachCategory !== teacher.teachCat) {
          formData.append("teachCat", data.teachCategory);
        }

        setLoading(true);
        const result = await editSection(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setTeacher(result));
          navigate(`/dashboard/faculty/editFacultyDetails?id=${teacher._id}`);
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", data.teachName);
    formData.append("designation", data.teachDesignation);
    formData.append("thumbnailImage", data.image);
    formData.append("teachCat", data.teachCategory);
    setLoading(true);
    const result = await createSection(formData, token);
    if (result) {
      dispatch(setTeacher(result));
      navigate("/dashboard/faculty/addFacultyDetails");
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
          defaultValue=""
          className="form-input-style text-gray-400"
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
          editData={editTeacher ? teacher?.image : null}
        />
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/faculty", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setTeacher(null));
              dispatch(setEditTeacher(false));
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
          {!editTeacher ? "Next" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AddFaculty;
