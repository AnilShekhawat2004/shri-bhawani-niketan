import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCategory,
  editCategory,
} from "../../../../services/operations/courseAPI";
import { resetCourse } from "../../../../slices/courseSlice";

function AddCourseDetails({ onBack, thumbnailImage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course, courseDraft, editCourse } = useSelector(
    (state) => state.course,
  );
  const [loading, setLoading] = useState(false);
  const isImageChange = thumbnailImage instanceof File;

  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: editCourse
      ? {} // don’t override values while editing
      : {
          fees: [{ year: "", amount: "" }],
          semesterFees: [{ semesterNumber: "", amount: "" }],
        },
  });

  const {
    fields: feeFields,
    append: appendFee,
    remove: removeFee,
    replace: replaceFee,
  } = useFieldArray({
    control,
    name: "fees",
  });

  const {
    fields: semesterFields,
    append: appendSemester,
    remove: removeSemester,
    replace: replaceSemester,
  } = useFieldArray({
    control,
    name: "semesterFees",
  });

  useEffect(() => {
    if (editCourse && course && course.courses && course.courses.length > 0) {
      const sub = course.courses[0];
      setValue("courseName", sub.courseName);
      setValue("courseDescription", sub.courseDescription);
      setValue("duration", sub.duration);
      replaceFee(sub.fees || []);
      replaceSemester(sub.semesterFees || []);
      setValue("instructorName", sub.instructorName);
    }
  }, [course, setValue, editCourse, replaceFee, replaceSemester]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (!course?.courses || course.courses.length === 0) {
      return true;
    }
    const sub = course?.courses?.[0];
    if (
      courseDraft?.name !== course?.name ||
      courseDraft?.description !== course?.description ||
      courseDraft?.categoryProgram !== course?.categoryProgram ||
      isImageChange ||
      currentValues.courseName !== sub.courseName ||
      currentValues.courseDescription !== sub.courseDescription ||
      currentValues.duration !== sub.duration ||
      currentValues.fees !== sub.fees ||
      currentValues.semesterFees !== sub.semesterFees ||
      currentValues.instructorName !== sub.instructorName
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      // Update existing courses
      if (!isFormUpdated()) {
        toast("No changes were made", { icon: "ℹ️" });
      }
      const sub = course.courses[0];
      const formData = new FormData();
      const currentValues = getValues();

      formData.append("courseCategoryId", course?._id);
      formData.append("courseId", course?.courses[0]?._id);

      if (courseDraft?.name !== course?.name)
        formData.append("name", courseDraft?.name);
      if (courseDraft?.description !== course?.description)
        formData.append("description", courseDraft?.description);
      if (courseDraft?.categoryProgram !== course?.categoryProgram)
        formData.append("categoryProgram", courseDraft?.categoryProgram);
      if (isImageChange) {
        formData.append("thumbnailImage", thumbnailImage);
      }

      const courseField = [
        "courseName",
        "courseDescription",
        "duration",
        "instructorName",
      ];

      courseField.forEach((field) => {
        if (currentValues?.[field] !== sub?.[field]) {
          formData.append(field, data?.[field]);
        }
      });

      const stringField = ["fees", "semesterFees"];

      stringField.forEach((field) => {
        if (
          JSON.stringify(currentValues?.[field]) !==
          JSON.stringify(sub?.[field])
        ) {
          formData.append(field, JSON.stringify(data?.[field]));
        }
      });

      setLoading(true);
      try {
        const result = await editCategory(formData, token);

        if (result) {
          navigate("/dashboard/courses", { state: { refresh: true } });
          dispatch(resetCourse());
        }
      } catch (error) {
        console.log("Error while editing course : ", error);
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", courseDraft.name);
    formData.append("description", courseDraft.description);
    formData.append("categoryProgram", courseDraft.categoryProgram);
    formData.append("thumbnailImage", thumbnailImage);

    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("duration", data.duration);
    formData.append("fees", JSON.stringify(data.fees));
    formData.append("semesterFees", JSON.stringify(data.semesterFees));
    formData.append("instructorName", data.instructorName);

    try {
      const res = await createCategory(formData, token);
      if (res) {
        navigate("/dashboard/courses");
        dispatch(resetCourse());
      }
    } catch (error) {
      console.error("Course creation failed : ", error);
    } finally {
      setLoading(false);
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
          <div key={fields.id} className="flex gap-3 mb-2">
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
          <div key={fields.id} className="flex gap-3 mb-2">
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

      <div className="relative flex justify-between pt-5">
        <button
          type="button"
          onClick={onBack}
          className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
        >
          Go Back
        </button>

        <button
          disabled={loading}
          className="pl-6 pr-6 pt-3 pb-3 rounded-xl shadow-lg text-bhawaniDark bg-bhawaniYellow"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AddCourseDetails;
