import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import {
  editSection,
  createSection,
} from "../../../../services/operations/teacherAPI";
import { resetTeacher } from "../../../../slices/teacherSlice";
import ChipInput from "../ChipInput";

function FacultyNext({ onBack, thumbnailImage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { teacher, teacherDraft, editTeacher } = useSelector(
    (state) => state.teacher,
  );
  const [loading, setLoading] = useState(false);
  const isImageChange = thumbnailImage instanceof File;

  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      contactNumber: "",
      email: "",
      startingYear: "",
      experience: "",
      educationHistory: [{ institute: "", degree: "", year: "" }],
      strengths: [],
      hobbies: [],
      professionalHistory: [{ institute: "", designation: "", duration: "" }],
      love: "",
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
    replace: replaceEducation,
  } = useFieldArray({
    control,
    name: "educationHistory",
  });

  const {
    fields: professionFields,
    append: appendProfession,
    remove: removeProfession,
    replace: replaceProfession,
  } = useFieldArray({
    control,
    name: "professionalHistory",
  });

  useEffect(() => {
    if (
      editTeacher &&
      teacher &&
      teacher?.SubSection &&
      teacher?.SubSection?.length > 0
    ) {
      const sub = teacher?.SubSection[0];

      setValue("contactNumber", sub?.contactNumber);
      setValue("email", sub?.email);
      setValue("startingYear", sub?.startingYear);
      setValue("experience", sub?.experience);
      replaceEducation(sub?.educationHistory || []);
      setValue("strengths", sub?.strengths);
      setValue("hobbies", sub?.hobbies);
      replaceProfession(sub?.professionalHistory || []);
      setValue("love", sub?.love);
    }
  }, [teacher, setValue, editTeacher, replaceEducation, replaceProfession]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (!teacher?.SubSection || teacher.SubSection.length === 0) {
      return true;
    }
    const sub = teacher?.SubSection?.[0];

    if (
      teacherDraft?.name !== teacher?.name ||
      teacherDraft?.designation !== teacher?.designation ||
      teacherDraft?.teachCategory !== teacher?.teachCat[0]?._id ||
      isImageChange ||
      currentValues?.contactNumber !== sub?.contactNumber ||
      currentValues?.email !== sub?.email ||
      currentValues?.startingYear !== sub?.startingYear ||
      currentValues?.experience !== sub?.experience ||
      currentValues?.educationHistory !== sub?.educationHistory ||
      currentValues?.strengths !== sub?.strengths ||
      currentValues?.hobbies !== sub?.hobbies ||
      currentValues?.professionalHistory !== sub?.professionalHistory ||
      currentValues?.love !== sub?.love
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editTeacher) {
      // Update existing SubSection
      if (!isFormUpdated()) {
        toast("No changes were made", { icon: "ℹ️" });
        return;
      }
      const sub = teacher?.SubSection[0];
      const formData = new FormData();
      const currentValues = getValues();
      const categoryId = teacherDraft?.teachCategory || teacherDraft?.teachCat;

      formData.append("sectionId", teacher?._id);
      formData.append("subSectionId", teacher?.SubSection[0]?._id);

      if (teacherDraft?.name !== teacher?.name)
        formData.append("name", teacherDraft?.name);
      if (teacherDraft?.designation !== teacher?.designation)
        formData.append("designation", teacherDraft?.designation);
      if (categoryId !== teacher?.teachCat[0]?._id) {
        formData.append("teachCategory", categoryId);
        formData.append("teachCat", categoryId);
      }
      if (isImageChange) {
        formData.append("thumbnailImage", thumbnailImage);
      }

      const stringField = [
        "educationHistory",
        "strengths",
        "hobbies",
        "professionalHistory",
      ];

      stringField.forEach((field) => {
        if (
          JSON.stringify(currentValues?.[field]) !==
          JSON.stringify(sub?.[field])
        ) {
          formData.append(field, JSON.stringify(data?.[field]));
        }
      });

      const subSectionField = [
        "contactNumber",
        "email",
        "startingYear",
        "experience",
        "love",
      ];

      subSectionField.forEach((field) => {
        if (currentValues?.[field] !== sub?.[field]) {
          formData.append(field, data?.[field]);
        }
      });
      setLoading(true);
      try {
        const result = await editSection(formData, token);

        if (result) {
          navigate("/dashboard/faculty", { state: { refresh: true } });
          dispatch(resetTeacher());
        }
      } catch (error) {
        console.log("Error while editing faculty : ", error);
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    const formData = new FormData();
    const categoryId = teacherDraft?.teachCategory || teacherDraft?.teachCat;
    // Section fields
    formData.append("name", teacherDraft.name);
    formData.append("designation", teacherDraft.designation);
    if (categoryId) {
      formData.append("teachCategory", categoryId);
      formData.append("teachCat", categoryId);
    }
    formData.append("thumbnailImage", thumbnailImage);

    // Subsection fields
    formData.append("contactNumber", data.contactNumber);
    formData.append("email", data.email);
    formData.append("startingYear", data.startingYear);
    formData.append("experience", data.experience);
    formData.append("educationHistory", JSON.stringify(data.educationHistory));
    formData.append("strengths", JSON.stringify(data.strengths));
    formData.append("hobbies", JSON.stringify(data.hobbies));
    formData.append(
      "professionalHistory",
      JSON.stringify(data.professionalHistory),
    );
    formData.append("love", data.love);

    try {
      const res = await createSection(formData, token);
      if (res) {
        navigate("/dashboard/faculty");
        dispatch(resetTeacher());
      }
    } catch (error) {
      console.error("Faculty creation failed:", error);
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
          htmlFor="contactNumber"
          className="text-sm font-medium text-gray-700"
        >
          Contact Number <span className="text-red-500">*</span>
        </label>
        <input
          id="contactNumber"
          type="number"
          placeholder="Enter Contact Number"
          className="form-input-style"
          {...register("contactNumber", { required: true })}
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
          {...register("email", { required: true })}
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
            {...register("startingYear", { required: true })}
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
            type="number"
            placeholder="Enter experience"
            className="form-input-style"
            {...register("experience", { required: true })}
          />
        </div>
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Education History <span className="text-red-500">*</span>
        </p>
        {educationFields.map((fields, index) => (
          <div key={fields.id} className="flex gap-3 mb-2">
            <input
              className="form-input-style appearance-none"
              placeholder="Enter institute"
              type="text"
              {...register(`educationHistory.${index}.institute`)}
            />
            <input
              className="form-input-style appearance-none"
              placeholder="Enter degree"
              type="text"
              {...register(`educationHistory.${index}.degree`)}
            />
            <input
              className="form-input-style appearance-none"
              placeholder="Enter year"
              type="number"
              {...register(`educationHistory.${index}.year`)}
            />
            <button type="button" onClick={() => removeEducation(index)}>
              <RxCross1 />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendEducation({ institute: "", degree: "", year: "" })
          }
          className="text-white px-4 py-3 bg-bhawaniRed rounded-lg shadow-md "
        >
          + Add Field
        </button>
      </div>

      <div className="relative">
        <ChipInput
          label="Strengths"
          name="strengths"
          placeholder="Enter strengths and Press Enter"
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      <div className="relative">
        <ChipInput
          label="Hobbies"
          name="hobbies"
          placeholder="Enter hobbie and Press Enter"
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      <div className="relative">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Professional History <span className="text-red-500">*</span>
        </p>
        {professionFields.map((fields, index) => (
          <div key={fields.id} className="flex gap-3 mb-2">
            <input
              className="form-input-style appearance-none"
              placeholder="Enter institute"
              type="text"
              {...register(`professionalHistory.${index}.institute`)}
            />
            <input
              className="form-input-style appearance-none"
              placeholder="Enter designation"
              type="text"
              {...register(`professionalHistory.${index}.designation`)}
            />
            <input
              className="form-input-style appearance-none"
              placeholder="Enter duration"
              type="number"
              {...register(`professionalHistory.${index}.duration`)}
            />
            <button type="button" onClick={() => removeProfession(index)}>
              <RxCross1 />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendProfession({
              institute: "",
              designation: "",
              duration: "",
            })
          }
          className="text-white px-4 py-3 bg-bhawaniRed rounded-lg shadow-md "
        >
          + Add Field
        </button>
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
          {...register("love", { required: true })}
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

export default FacultyNext;
