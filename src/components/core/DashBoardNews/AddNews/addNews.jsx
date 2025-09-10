import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNews,
  updateNews,
} from "../../../../services/operations/newsAPI";
import { setNews, setEditNews } from "../../../../slices/newsSlice";
import Upload from "../../Faculty/Upload";

const statusDrop = [
  { id: "Published", status: "Published" },
  { id: "Draft", status: "Draft" },
];

function AddNews() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { news, editNews } = useSelector((state) => state.news);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (editNews) {
      setValue("newsName", news.newsName);
      setValue("newsDescription", news.newsDescription);
      setValue("image", news.image);
      setValue("status", news.status);
    }
  }, [editNews, news, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.newsName !== news.newsName ||
      currentValues.newsDescription !== news.newsDescription ||
      currentValues.image !== news.image ||
      currentValues.status !== news.status
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (editNews) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("newsId", news._id);
        if (currentValues.newsName !== news.newsName) {
          formData.append("newsName", data.newsName);
        }
        if (currentValues.newsDescription !== news.newsDescription) {
          formData.append("newsDescription", data.newsDescription);
        }
        if (currentValues.image !== news.thumbnailImage) {
          formData.append("thumbnailImage", data.image);
        }
        if (currentValues.status !== news.status) {
          formData.append("status", data.status);
        }

        setLoading(true);
        const result = await updateNews(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setNews(result));
          dispatch(setEditNews(false));
          navigate(`/dashboard/news`);
        }
        return;
      } else {
        toast.error("No changes made to the form");
        return;
      }
    }

    const formData = new FormData();
    formData.append("newsName", data.newsName);
    formData.append("newsDescription", data.newsDescription);
    formData.append("thumbnailImage", data.image);
    formData.append("status", data.status);

    setLoading(true);
    const result = await createNews(formData, token);
    if (result) {
      dispatch(setNews(result));
      navigate("/dashboard/news");
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
        <label htmlFor="newsName" className="text-sm font-medium text-gray-700">
          Article Name <span className="text-red-500">*</span>
        </label>
        <input
          id="newsName"
          type="text"
          placeholder="Enter article name"
          className="form-input-style"
          {...register("newsName", { required: true })}
        />
        {errors.newsName && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="newsDescription"
          className="text-sm font-medium text-gray-700"
        >
          Article Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="newsDescription"
          type="text"
          placeholder="Enter article description"
          className="form-input-style"
          {...register("newsDescription", { required: true })}
        />
        {errors.newsDescription && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <Upload
          name="image"
          label="Image"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editNews ? news?.image : null}
        />
      </div>

      <div className="relative">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status
          <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          {...register("status", { required: true })}
          defaultValue=""
          className="form-input-style text-gray-400"
        >
          <option value="" disabled className="">
            Choose a status
          </option>
          {!loading &&
            statusDrop?.map((cat, index) => (
              <option key={index} value={cat?.id}>
                {cat?.status}
              </option>
            ))}
        </select>
        {errors.status && (
          <span className="text-red-500 text-sm">Status is Required field</span>
        )}
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/news", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setNews(null));
              dispatch(setEditNews(false));
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
          {!editNews ? "Save" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AddNews;
