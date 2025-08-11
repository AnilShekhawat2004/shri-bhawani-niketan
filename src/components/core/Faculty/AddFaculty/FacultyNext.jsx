import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createSubSection,
  editSubSection,
} from "../../../../services/operations/teacherAPI";
import {
  setEditTeacher,
  // setStep,
  setTeacher,
} from "../../../../slices/teacherSlice";

function FacultyNext() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { teacher, editTeacher } = useSelector((state) => state.teacher);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      editTeacher &&
      teacher &&
      teacher.SubSection &&
      teacher.SubSection.length > 0
    ) {
      const sub = teacher.SubSection[0];
      setValue("contactNumber", sub.contactNumber);
      setValue("email", sub.email);
      setValue("startingYear", sub.startingYear);
      setValue("experience", sub.experience);
      setValue("educationHistory", sub.educationHistory);
      setValue("strengths", sub.strengths);
      setValue("hobbies", sub.hobbies);
      setValue("professionalHistory", sub.professionalHistory);
      setValue("love", sub.love);
    }
  }, [teacher, setValue, editTeacher]);

  const isFormUpdated = () => {
    // if (!teacher.SubSection || teacher.SubSection.length === 0) return false;
    const currentValues = getValues();
    const sub = teacher.SubSection[0];
    if (
      currentValues.contactNumber !== sub.contactNumber ||
      currentValues.email !== sub.email ||
      currentValues.startingYear !== sub.startingYear ||
      currentValues.experience !== sub.experience ||
      currentValues.educationHistory !== sub.educationHistory ||
      currentValues.strengths !== sub.strengths ||
      currentValues.hobbies !== sub.hobbies ||
      currentValues.professionalHistory !== sub.professionalHistory ||
      currentValues.love !== sub.love
    ) {
      return true;
    }
    return false;
  };
  
  const onSubmit = async (data) => {
    if (editTeacher) {
      // Update existing SubSection
      if (isFormUpdated()) {
        const sub = teacher.SubSection[0];
        const formData = new FormData();
        const currentValues = getValues();

        formData.append("teacherSection", teacher._id);
        formData.append("subteacherSection", teacher.SubSection[0]._id);

        if (currentValues.contactNumber !== sub.contactNumber)
          formData.append("contactNumber", data.contactNumber);
        if (currentValues.email !== sub.email)
          formData.append("email", data.email);
        if (currentValues.startingYear !== sub.startingYear)
          formData.append("startingYear", data.startingYear);
        if (currentValues.experience !== sub.experience)
          formData.append("experience", data.experience);
        if (currentValues.educationHistory !== sub.educationHistory)
          formData.append("educationHistory", data.educationHistory);
        if (currentValues.strengths !== sub.strengths)
          formData.append("strengths", data.strengths);
        if (currentValues.hobbies !== sub.hobbies)
          formData.append("hobbies", data.hobbies);
        if (currentValues.professionalHistory !== sub.professionalHistory)
          formData.append("professionalHistory", data.professionalHistory);
        if (currentValues.love !== sub.love)
          formData.append("love", data.love);

        setLoading(true);
        const result = await editSubSection(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setTeacher(result));
          navigate("/dashboard/faculty", { state: { refresh: true } });
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }
    const formData = new FormData();
    formData.append("teacherSection", teacher._id);
    formData.append("contactNumber", data.contactNumber);
    formData.append("email", data.email);
    formData.append("startingYear", data.startingYear);
    formData.append("experience", data.experience);
    formData.append("educationHistory", data.educationHistory);
    formData.append("strengths", data.strengths);
    formData.append("hobbies", data.hobbies);
    formData.append("professionalHistory", data.professionalHistory);
    formData.append("love", data.love);

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      dispatch(setTeacher(result));
      navigate("/dashboard/faculty", { state: { refresh: true } });
    }
    setLoading(false);
  };

  const goBack = () => {
    navigate("/dashboard/faculty/addFaculty");
    dispatch(setEditTeacher(true));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 grid grid-cols-1"
    >
      <div className="relative">
        <label
          htmlFor="contactNumber"
          className="text-sm font-medium text-gray-700"
        >
          Contact Number <span className="text-red-500">*</span>
        </label>
        <input
          id="contactNumber"
          type="text"
          placeholder="Enter Contact Number"
          className="form-input-style"
          {...register("contactNumber")}
        />
      </div>

      <div className="relative">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="text"
          placeholder="Enter Email"
          className="form-input-style"
          {...register("email")}
        />
      </div>

      <div className="flex flex-row gap-3">
        <div className="relative">
          <label
            htmlFor="startingYear"
            className="text-sm font-medium text-gray-700"
          >
            Starting Year <span className="text-red-500">*</span>
          </label>
          <input
            id="startingYear"
            type="text"
            placeholder="Enter starting  year"
            className="form-input-style"
            {...register("startingYear")}
          />
        </div>

        <div className="relative">
          <label
            htmlFor="experience"
            className="text-sm font-medium text-gray-700"
          >
            Experience <span className="text-red-500">*</span>
          </label>
          <input
            id="experience"
            type="text"
            placeholder="Enter experience"
            className="form-input-style"
            {...register("experience")}
          />
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="educationHistory"
          className="text-sm font-medium text-gray-700"
        >
          Education History <span className="text-red-500">*</span>
        </label>
        <textarea
          id="educationHistory"
          rows={4}
          placeholder="Enter education history, one per line or in detail"
          className="form-input-style resize-y"
          {...register("educationHistory")}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="strengths"
          className="text-sm font-medium text-gray-700"
        >
          Strengths <span className="text-red-500">*</span>
        </label>
        <textarea
          id="strengths"
          rows={1}
          placeholder="Enter your strengths"
          className="form-input-style resize-y"
          {...register("strengths")}
        />
      </div>

      <div className="relative">
        <label htmlFor="hobbies" className="text-sm font-medium text-gray-700">
          Hobbies <span className="text-red-500">*</span>
        </label>
        <textarea
          id="hobbies"
          rows={1}
          placeholder="Enter your hobbies"
          className="form-input-style resize-y"
          {...register("hobbies")}
        />
      </div>

      <div className="relative">
        <label
          htmlFor="professionalHistory"
          className="text-sm font-medium text-gray-700"
        >
          Professional History <span className="text-red-500">*</span>
        </label>
        <textarea
          id="professionalHistory"
          rows={3}
          placeholder="Enter your professional history"
          className="form-input-style resize-y"
          {...register("professionalHistory")}
        />
      </div>

      <div className="relative">
        <label htmlFor="love" className="text-sm font-medium text-gray-700">
          What do you love most about Bhawani{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          id="love"
          type="text"
          placeholder="Enter Your favorite thing about Bhawani"
          className="form-input-style"
          {...register("love")}
        />
      </div>

      <div className="relative flex justify-between pt-5">
        <button
          type="button"
          // onClick={() => navigate("/dashboard/faculty/addFaculty")}
          onClick={goBack}
          className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
        >
          Go Back
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

export default FacultyNext;