import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../slices/profileSlice";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import AddButton from "../../../Common/Buttons/addButton";

export default function EditProfileImage() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("thumbnailImage", imageFile);

      setLoading(true);
      const result = await updateDisplayPicture(formData, token);
      setLoading(false);
      if (result) {
        dispatch(setUser(result));
      }
    } catch (error) {
      console.log("Error while uploading Profile Image : ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex items-center justify-between rounded-xl border shadow-lg border-gray-400 bg-white p-8 px-12">
      <div className="flex items-center gap-x-6">
        <img
          src={previewSource || user?.image}
          alt={`${user?.firstName}`}
          className="aspect-square w-[100px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-bhawaniDark text-[25px] font-bold">
            Change Profile Picture
          </p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-gray-500 py-1 px-5 font-semibold border shadow-md text-white hover:bg-gray-600 transition-all duration-500"
            >
              Select
            </button>
            <AddButton
              className="flex flex-row gap-1 px-4"
              text={loading ? "Uploading..." : "Upload"}
              onClick={handleFileUpload}
            >
              {!loading && <FiUpload />}
            </AddButton>
          </div>
        </div>
      </div>
    </div>
  );
}
