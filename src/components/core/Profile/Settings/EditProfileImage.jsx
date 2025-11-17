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
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow-xl p-8 transition hover:shadow-2xl">
      <img
        src={previewSource || user?.image}
        alt={user?.firstName}
        className="w-32 h-32 rounded-full object-cover ring-4 ring-bhawaniRed shadow-lg transition-transform hover:scale-105"
      />
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold text-bhawaniDark">
          Change Profile Picture
        </p>
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            className="hidden"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-gray-400 text-white px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition transform"
          >
            Select
          </button>
          <AddButton
            onClick={handleFileUpload}
            disabled={loading}
            className="px-5 py-2 rounded-full shadow hover:scale-105 transition transform"
            text={loading ? "Uploading..." : "Upload"}
          >
            {!loading && <FiUpload />}
          </AddButton>
        </div>
      </div>
    </div>
  );
}
