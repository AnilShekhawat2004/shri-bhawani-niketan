import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createCourse,
  editCourses,
} from "../../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

function AddCourseDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: editCourse
      ? {} // don’t override values while editing
      : {
          fees: [{ year: "", amount: "" }],
          semesterFees: [{ semesterNumber: "", amount: "" }],
        },
  });

  useEffect(() => {
    if (editCourse && course && course.courses && course.courses.length > 0) {
      const sub = course.courses[0];
      setValue("courseName", sub.courseName);
      setValue("courseDescription", sub.courseDescription);
      setValue("duration", sub.duration);
      setValue("fees", sub.fees);
      setValue("semesterFees", sub.semesterFees);
      setValue("instructorName", sub.instructorName);
      setValue("status", sub.status);
    }
  }, [course, setValue, editCourse]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    const sub = course.courses[0];
    if (
      currentValues.courseName !== sub.courseName ||
      currentValues.courseDescription !== sub.courseDescription ||
      currentValues.duration !== sub.duration ||
      currentValues.fees !== sub.fees ||
      currentValues.semesterFees !== sub.semesterFees ||
      currentValues.instructorName !== sub.instructorName ||
      currentValues.status !== sub.status
    ) {
      return true;
    }
    return false;
  };

  const {
    fields: feeFields,
    append: appendFee,
    remove: removeFee,
  } = useFieldArray({
    control,
    name: "fees",
  });

  const {
    fields: semesterFields,
    append: appendSemester,
    remove: removeSemester,
  } = useFieldArray({
    control,
    name: "semesterFees",
  });

  const onSubmit = async (data) => {
    if (editCourse) {
      // Update existing courses
      if (isFormUpdated()) {
        const sub = course.courses[0];
        const formData = new FormData();
        const currentValues = getValues();

        formData.append("courseId", course.courses[0]._id);

        if (currentValues.courseName !== sub.courseName)
          formData.append("courseName", data.courseName);
        if (currentValues.courseDescription !== sub.courseDescription)
          formData.append("courseDescription", data.courseDescription);
        if (currentValues.duration !== sub.duration)
          formData.append("duration", data.duration);
        if (JSON.stringify(currentValues.fees) !== JSON.stringify(sub.fees))
          formData.append("fees", JSON.stringify(data.fees));
        if (
          JSON.stringify(currentValues.semesterFees) !==
          JSON.stringify(sub.semesterFees)
        )
          formData.append("semesterFees", JSON.stringify(data.semesterFees));
        if (currentValues.instructorName !== sub.instructorName)
          formData.append("instructorName", data.instructorName);
        if (currentValues.status !== sub.status)
          formData.append("status", data.status);

        setLoading(true);
        const result = await editCourses(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setCourse(result));
          navigate("/dashboard/courses", { state: { refresh: true } });
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }
    const formData = new FormData();
    formData.append("category", course._id);
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("duration", data.duration);
    formData.append("fees", JSON.stringify(data.fees));
    formData.append("semesterFees", JSON.stringify(data.semesterFees));
    formData.append("instructorName", data.instructorName);
    formData.append("status", data.status);

    setLoading(true);
    const result = await createCourse(formData, token);
    if (result) {
      dispatch(setCourse(result));
      navigate("/dashboard/courses", { state: { refresh: true } });
    }
    setLoading(false);
  };

  const goBack = () => {
    if (location.pathname.includes("editCourseDetails")) {
      navigate(`/dashboard/courses/editCourse?id=${course._id}`);
      dispatch(setEditCourse(true));
    } else {
      navigate("/dashboard/courses/addCourse");
      dispatch(setEditCourse(true));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 grid grid-cols-1"
    >
      <div className="relative">
        <label
          htmlFor="courseName"
          className="text-sm font-medium text-gray-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="courseName"
          type="text"
          placeholder="Enter Course Name"
          className="form-input-style"
          {...register("courseName")}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="courseDescription"
          className="text-sm font-medium text-gray-700"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="courseDescription"
          type="text"
          placeholder="Enter Course Description"
          className="form-input-style"
          {...register("courseDescription")}
        />
      </div>

      <div className="relative">
        <label htmlFor="duration" className="text-sm font-medium text-gray-700">
          Duration <span className="text-red-500">*</span>
        </label>
        <input
          id="duration"
          type="number"
          placeholder="Enter course duration"
          className="form-input-style"
          {...register("duration")}
        />
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Yearly Fees <span className="text-red-500">*</span>
        </p>
        {feeFields.map((fields, index) => (
          <div key={fields._id} className="flex gap-3 mb-2">
            <input
              className="form-input-style appearance-none"
              placeholder="Enter Year"
              type="number"
              {...register(`fees.${index}.year`)}
            />
            <input
              className="form-input-style appearance-none"
              placeholder="Enter Amount"
              type="number"
              {...register(`fees.${index}.amount`)}
            />
            <button type="button" onClick={() => removeFee(index)}>
              <RxCross1 />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendFee({ year: "", amount: "" })}
          className="text-white px-4 py-3 bg-bhawaniRed rounded-lg shadow-md "
        >
          + Add Field
        </button>
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Semester Fees <span className="text-red-500">*</span>
        </p>
        {semesterFields.map((fields, index) => (
          <div key={fields._id} className="flex gap-3 mb-2">
            <input
              className="form-input-style appearance-none"
              placeholder="Enter Semester"
              type="number"
              {...register(`semesterFees.${index}.semesterNumber`)}
            />
            <input
              className="form-input-style appearance-none"
              placeholder="Enter Amount"
              type="number"
              {...register(`semesterFees.${index}.amount`)}
            />
            <button type="button" onClick={() => removeSemester(index)}>
              <RxCross1 />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSemester({ semesterNumber: "", amount: "" })}
          className="text-white px-4 py-3 bg-bhawaniRed rounded-lg shadow-md "
        >
          + Add Field
        </button>
      </div>

      <div className="relative">
        <label
          htmlFor="instructorName"
          className="text-sm font-medium text-gray-700"
        >
          Instructor Name <span className="text-red-500">*</span>
        </label>
        <input
          id="instructorName"
          rows={1}
          placeholder="Enter Instructor name"
          className="form-input-style"
          {...register("instructorName")}
        />
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

      <div className="relative flex justify-between pt-5">
        <button
          type="button"
          onClick={goBack}
          className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
        >
          Go Back
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

export default AddCourseDetails;
