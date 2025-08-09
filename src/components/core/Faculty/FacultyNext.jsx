import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createSubSection,
  editSubSection,
} from "../../../services/operations/teacherAPI";
import {
  setEditTeacher,
  // setStep,
  setTeacher
} from "../../../slices/teacherSlice";

function FacultyNext() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { teacher, editTeacher } = useSelector((state) => state.teacher);
  const [loading, setLoading] = useState(false);
  // console.log("This is the teacher : ", teacher)
  // useEffect(() => {
  //   if (!teacher || Object.keys(teacher).length === 0) {
  //     toast.error("Please add faculty details first.");
  //     navigate("/dashboard/faculty/addFaculty");
  //   }
  // }, [teacher, navigate]);

  useEffect(() => {
    if (teacher) {
      setValue("contactNumber", teacher.contactNumber);
      setValue("email", teacher.email);
      setValue("startingYear", teacher.startingYear);
      setValue("experience", teacher.experience);
      setValue("educationHistory", teacher.educationHistory);
      setValue("strengths", teacher.strengths);
      setValue("hobbies", teacher.hobbies);
      setValue("professionalHistory", teacher.professionalHistory);
      setValue("love", teacher.love);
    }
  }, [teacher, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues()
    if(
      currentValues.contactNumber !== teacher.contactNumber ||
      currentValues.email !== teacher.email ||
      currentValues.startingYear !== teacher.startingYear ||
      currentValues.experience !== teacher.experience ||
      currentValues.educationHistory !== teacher.educationHistory ||
      currentValues.strengths !== teacher.strengths ||
      currentValues.hobbies !== teacher.hobbies ||
      currentValues.professionalHistory !== teacher.professionalHistory ||
      currentValues.love !== teacher.love 
    ){
      return true
    }
    return false
  }

 const onSubmit = async (data) => {
    const isEdit = editTeacher && teacher?.SubSection?.length > 0;

    const formData = new FormData();
    if (isEdit) {
      // Update existing SubSection
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }

      formData.append("sectionId", teacher._id);
      formData.append("subSectionId", teacher.SubSection[0]._id); // Assumes one SubSection

      const currentValues = getValues();
      if (currentValues.contactNumber !== teacher.contactNumber)
        formData.append("contactNumber", data.contactNumber);
      if (currentValues.email !== teacher.email)
        formData.append("email", data.email);
      if (currentValues.startingYear !== teacher.startingYear)
        formData.append("startingYear", data.startingYear);
      if (currentValues.experience !== teacher.experience)
        formData.append("experience", data.experience);
      if (currentValues.educationHistory !== teacher.educationHistory)
        formData.append("educationHistory", data.educationHistory);
      if (currentValues.strengths !== teacher.strengths)
        formData.append("strengths", data.strengths);
      if (currentValues.hobbies !== teacher.hobbies)
        formData.append("hobbies", data.hobbies);
      if (currentValues.professionalHistory !== teacher.professionalHistory)
        formData.append("professionalHistory", data.professionalHistory);
      if (currentValues.love !== teacher.love)
        formData.append("love", data.love);

      setLoading(true);
      const result = await editSubSection(formData, token);
      setLoading(false);

      if (result) {
        dispatch(setTeacher(result));
        navigate("/dashboard/faculty", { state: { refresh: true } });
      }
    } else {
      // Create new SubSection
      if (!teacher?._id) {
        toast.error("Faculty Id missing. Cannot create faculty details.");
        return;
      }

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
      setLoading(false);

      if (result) {
        dispatch(setTeacher(result));
        navigate("/dashboard/faculty", { state: { refresh: true } });
      }
    }
  };


  const goBack = () => {
    // dispatch(setStep(1))
    navigate("/dashboard/faculty/addFaculty")
    dispatch(setEditTeacher(true))
  }

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       teachId: teacher._id,
  //       ...data,
  //     };

  //     const result = await editSubSection(payload, token);

  //     if (result) {
  //       dispatch(setTeacher(result));
  //       toast.success("Faculty added successfully");
  //       navigate("/dashboard/faculty");
  //     } else {
  //       toast.error("Failed to update faculty details");
  //     }
  //   } catch (error) {
  //     console.log("Error while submiting : ", error);
  //     toast.error("Something went wrong.");
  //   }
  // };

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
        <label
          htmlFor="hobbies"
          className="text-sm font-medium text-gray-700"
        >
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
          <label
            htmlFor="love"
            className="text-sm font-medium text-gray-700"
          >
            What do you love most about Bhawani <span className="text-red-500">*</span>
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


// import React, { useEffect, useState } from "react";
// import {
//   createSubSection,
//   editSubSection,
// } from "../../../services/operations/teacherAPI";
// import { toast } from "react-hot-toast";
// import {
//   setStep,
//   setTeacher,
//   setEditTeacher,
// } from "../../../slices/teacherSlice";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function FacultyNext() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const { teacher, editTeacher } = useSelector((state) => state.teacher);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!teacher || Object.keys(teacher).length === 0) {
//       toast.error("Please add faculty details first.");
//       navigate("/dashboard/faculty/addFaculty");
//     }
//   }, [teacher, navigate]);

//   useEffect(() => {
//     if (teacher) {
//       setValue("contactNumber", teacher.contactNumber);
//       setValue("email", teacher.email);
//       setValue("startingYear", teacher.startingYear);
//       setValue("experience", teacher.experience);
//       setValue("educationHistory", teacher.educationHistory);
//       setValue("strengths", teacher.strengths);
//       setValue("hobbies", teacher.hobbies);
//       setValue("professionalHistory", teacher.professionalHistory);
//       setValue("love", teacher.love);
//     }
//   }, [teacher, setValue]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const payload = {
//         teachId: teacher._id,
//         ...data,
//       };

//       const result = await editSubSection(payload, token);

//       if (result) {
//         dispatch(setTeacher(result));
//         toast.success("Faculty added successfully");
//         navigate("/dashboard/faculty");
//       } else {
//         toast.error("Failed to update faculty details");
//       }
//     } catch (error) {
//       console.log("Error while submiting : ", error);
//       toast.error("Something went wrong.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-5 grid grid-cols-1"
//     >
//       <div className="relative">
//         <label
//           htmlFor="contactNumber"
//           className="text-sm font-medium text-gray-700"
//         >
//           Contact Number <span className="text-red-500">*</span>
//         </label>
//         <input
//           id="contactNumber"
//           type="text"
//           placeholder="Enter Contact Number"
//           className="form-input-style"
//           {...register("contactNumber")}
//         />
//       </div>

//       <div className="relative">
//         <label htmlFor="email" className="text-sm font-medium text-gray-700">
//           Email <span className="text-red-500">*</span>
//         </label>
//         <input
//           id="email"
//           type="text"
//           placeholder="Enter Email"
//           className="form-input-style"
//           {...register("email")}
//         />
//       </div>

//       <div className="flex flex-row gap-3">
//         <div className="relative">
//           <label
//             htmlFor="startingYear"
//             className="text-sm font-medium text-gray-700"
//           >
//             Starting Year <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="startingYear"
//             type="text"
//             placeholder="Enter starting  year"
//             className="form-input-style"
//             {...register("startingYear")}
//           />
//         </div>

//         <div className="relative">
//           <label
//             htmlFor="experience"
//             className="text-sm font-medium text-gray-700"
//           >
//             Experience <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="experience"
//             type="text"
//             placeholder="Enter experience"
//             className="form-input-style"
//             {...register("experience")}
//           />
//         </div>
//       </div>

//       <div className="relative">
//         <label
//           htmlFor="educationHistory"
//           className="text-sm font-medium text-gray-700"
//         >
//           Education History <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           id="educationHistory"
//           rows={4}
//           placeholder="Enter education history, one per line or in detail"
//           className="form-input-style resize-y"
//           {...register("educationHistory")}
//         />
//       </div>

//       <div className="relative">
//         <label
//           htmlFor="strengths"
//           className="text-sm font-medium text-gray-700"
//         >
//           Strengths <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           id="strengths"
//           rows={1}
//           placeholder="Enter your strengths"
//           className="form-input-style resize-y"
//           {...register("strengths")}
//         />
//       </div>

//       <div className="relative">
//         <label
//           htmlFor="hobbies"
//           className="text-sm font-medium text-gray-700"
//         >
//           Hobbies <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           id="hobbies"
//           rows={1}
//           placeholder="Enter your hobbies"
//           className="form-input-style resize-y"
//           {...register("hobbies")}
//         />
//       </div>

//       <div className="relative">
//         <label
//           htmlFor="professionalHistory"
//           className="text-sm font-medium text-gray-700"
//         >
//           Professional History <span className="text-red-500">*</span>
//         </label>
//         <textarea
//           id="professionalHistory"
//           rows={3}
//           placeholder="Enter your professional history"
//           className="form-input-style resize-y"
//           {...register("professionalHistory")}
//         />
//       </div>

//       <div className="relative">
//           <label
//             htmlFor="love"
//             className="text-sm font-medium text-gray-700"
//           >
//             What do you love most about Bhawani <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="love"
//             type="text"
//             placeholder="Enter Your favorite thing about Bhawani"
//             className="form-input-style"
//             {...register("love")}
//           />
//       </div>

//       <div className="relative flex justify-between pt-5">
//         <button
//           type="button"
//           onClick={() => navigate("/dashboard/faculty/addFaculty")}
//           className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
//         >
//           Go Back
//         </button>

//         <button
//           disabled={loading}
//           className="pl-6 pr-6 pt-3 pb-3 rounded-xl shadow-lg text-bhawaniDark bg-bhawaniYellow"
//         >
//           {!editTeacher ? "Next" : "Save Changes"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default FacultyNext;

