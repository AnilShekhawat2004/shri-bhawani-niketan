import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePhoto } from "../../../services/operations/imageAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";

function DeletePhoto({ photoId, setPhotoDetails }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handlePhotosDelete = async () => {
    try {
      setLoading(true);
      const res = await deletePhoto(photoId, token);

      if (res?.success) {
        setPhotoDetails((prev) =>
          prev.filter((photo) => photo._id !== photoId)
        );
        navigate("/dashboard/photos", { state: { refresh: true } });
      }
      setConfirmationModal(null);
    } catch (error) {
      console.log("Error Deleting the photo : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          setConfirmationModal({
            text1: "Do you want to delete this photo?",
            text2: "All the data related to this photo will be deleted",
            btn1Text: !loading ? "Delete" : "Loading...",
            btn2Text: "Cancel",
            btn1Handler: !loading
              ? () => handlePhotosDelete(photoId)
              : () => {},
            btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
          })
        }
      >
        <RiDeleteBinLine className="text-red-400 text-[20px] cursor-pointer" />
      </button>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} loading={loading} />
      )}
    </div>
  );
}

export default DeletePhoto;
