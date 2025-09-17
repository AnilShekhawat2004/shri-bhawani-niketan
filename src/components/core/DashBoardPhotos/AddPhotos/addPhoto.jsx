import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPhoto,
  editPhotos,
  fetchPhotoCategories,
} from "../../../../services/operations/imageAPI";
import {
  setPhoto,
  setEditPhoto,
} from "../../../../slices/photoSlice";
import Upload from "../../Faculty/Upload";

function AddPhoto() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { photo, editPhoto } = useSelector((state) => state.photo);
  const [imageCat, setImageCat] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getImageCat = async () => {
        setLoading(true)
        const imageCategory = await fetchPhotoCategories();
        if(imageCategory.length > 0){
            setImageCat(imageCategory)
        }
        setLoading(false)
    }

    if (editPhoto && photo) {
      setValue("name", photo.name);
      setValue("thumbnail", photo.thumbnailImage);
      setValue("imageCategory", photo.imageCategory);
      console.log("This is the imageCategory id : ", photo.imageCategory)
    }

    getImageCat();
  }, [editPhoto, photo, setValue]);
        console.log("This si the image cat id : ", imageCat._id)

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.name !== photo.name ||
      currentValues.thumbnail !== photo.thumbnailImage ||
      currentValues.imageCategory !== photo.imageCategory
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editPhoto) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("photoId", photo._id);
        if (currentValues.name !== photo.name) {
          formData.append("name", data.name);
        }
        if (currentValues.thumbnail !== photo.thumbnailImage) {
          formData.append("thumbnailImage", data.thumbnail);
        }
        if (currentValues.imageCategory !== photo.imageCategory) {
          formData.append("imageCategory", data.imageCategory);
        }

        setLoading(true);
        const result = await editPhotos(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setPhoto(result));
          dispatch(setEditPhoto(false))
          navigate(`/dashboard/photos`);
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("thumbnailImage", data.thumbnail);
    formData.append("imageCategory", data.imageCategory);

    setLoading(true);
    const result = await addPhoto(formData, token);
    if (result) {
      dispatch(setPhoto(result));
      navigate("/dashboard/photos");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 grid grid-cols-1"
    >
      {/* name */}
      <div className="relative">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter photo name"
          className="form-input-style"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">Required field</span>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="imageCategory"
          className="text-sm font-medium text-gray-700"
        >
          Category
          <span className="text-red-500">*</span>
        </label>
        <select
          id="imageCategory"
          {...register("imageCategory", { required: true })}
          defaultValue=""
          className="form-input-style text-gray-400"
        >
          <option value="" disabled className="">
            Choose a Category
          </option>
          {!loading &&
            imageCat?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.imageCategory && (
          <span className="text-red-500 text-sm">
            Category is Required field
          </span>
        )}
      </div>

      <div className="relative">
        <Upload
          name="thumbnail"
          label="Photo"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editPhoto ? photo?.thumbnail : null}
        />
      </div>

      <div className="relative flex justify-between">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/photos", { state: { refresh: true } });
            setTimeout(() => {
              dispatch(setPhoto(null));
              dispatch(setEditPhoto(false));
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
          {!editPhoto ? "Save" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default AddPhoto;
