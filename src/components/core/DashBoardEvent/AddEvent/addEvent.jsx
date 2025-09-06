import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createEvent,
  editEvents,
} from "../../../../services/operations/eventAPI";
import { setEvent, setEditEvent } from "../../../../slices/eventSlice";
import Upload from "../../Faculty/Upload";

const monthsBranch = [
  { id: "All", month: "All Events" },
  { id: "January", month: "January" },
  { id: "February", month: "February" },
  { id: "March", month: "March" },
  { id: "April", month: "April" },
  { id: "May", month: "May" },
  { id: "June", month: "June" },
  { id: "July", month: "July" },
  { id: "August", month: "August" },
  { id: "September", month: "September" },
  { id: "October", month: "October" },
  { id: "November", month: "November" },
  { id: "December", month: "December" },
];

function AddEvent() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { event, editEvent } = useSelector((state) => state.event);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (editEvent && event) {
      setValue("name", event.name);
      setValue("description", event.description);
      setValue("thumbnail", event.thumbnailImage);
      setValue("branch", event.branch);
      setValue("date", event.date);
      setValue("day", event.day);
    }
  }, [editEvent, event, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.name !== event.name ||
      currentValues.description !== event.description ||
      currentValues.thumbnail !== event.thumbnailImage ||
      currentValues.branch !== event.branch ||
      currentValues.date !== event.date ||
      currentValues.day !== event.day
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editEvent) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("eventId", event._id);
        if (currentValues.name !== event.name) {
          formData.append("name", data.name);
        }
        if (currentValues.description !== event.description) {
          formData.append("description", data.description);
        }
        if (currentValues.thumbnail !== event.thumbnailImage) {
          formData.append("thumbnailImage", data.thumbnail);
        }
        if (currentValues.branch !== event.branch) {
          formData.append("branch", data.branch);
        }
        if (currentValues.date !== event.date) {
          formData.append("date", data.date);
        }
        if (currentValues.day !== event.day) {
          formData.append("day", data.day);
        }

        setLoading(true);
        const result = await editEvents(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setEvent(result));
          navigate(`/dashboard/event`);
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("thumbnailImage", data.thumbnail);
    formData.append("branch", data.branch);
    formData.append("date", data.date);
    formData.append("day", data.day);
    setLoading(true);
    const result = await createEvent(formData, token);
    if (result) {
      dispatch(setEvent(result));
      navigate("/dashboard/event");
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
          placeholder="Enter Event name"
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
        <textarea
          id="description"
          type="text"
          placeholder="Enter event description"
          className="form-input-style"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label htmlFor="branch" className="text-sm font-medium text-gray-700">
          Month
          <span className="text-red-500">*</span>
        </label>
        <select
          id="branch"
          {...register("branch", { required: true })}
          defaultValue=""
          className="form-input-style text-gray-400"
        >
          <option value="" disabled className="">
            Choose a Month
          </option>
          {!loading &&
            monthsBranch?.map((cat, index) => (
              <option key={index} value={cat?.id}>
                {cat?.month}
              </option>
            ))}
        </select>
        {errors.branch && (
          <span className="text-red-500 text-sm">Month is Required field</span>
        )}
      </div>

      <div className="relative">
        <Upload
          name="thumbnail"
          label="Image"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editEvent ? event?.thumbnail : null}
        />
      </div>

      <div className="flex flex-row gap-5">
        <div className="relative">
          <label htmlFor="day" className="text-sm font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id="day"
            type="text"
            placeholder="Enter Date"
            className="form-input-style"
            {...register("day", { required: true })}
          />
          {errors.day && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>

        <div className="relative">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Month & Year <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            type="text"
            placeholder="Enter month & year (mmm & yyyy)"
            className="form-input-style"
            {...register("date", { required: true })}
          />
          {errors.date && (
            <span className="text-red-500 text-sm">Required field</span>
          )}
        </div>
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/event", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setEvent(null));
              dispatch(setEditEvent(false));
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
          {!editEvent ? "Save" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AddEvent;
