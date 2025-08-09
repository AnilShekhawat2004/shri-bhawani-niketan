import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSection
} from "../../../services/operations/teacherAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";

function DeleteFaculty({ sectionId, setTeachDetails }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleFacultyDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteSection(sectionId, token);

      if (res?.success) {
        navigate("/dashboard/faculty", { state: { refresh: true } });
      }
      setConfirmationModal(null);
    } catch (error) {
      console.log("Error Deleting the Faculty : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          setConfirmationModal({
            text1: "Do you want to delete this Faculty?",
            text2: "All the data related to this faculty will be deleted",
            btn1Text: !loading ? "Delete" : "Loading...",
            btn2Text: "Cancel",
            btn1Handler: !loading
              ? () => handleFacultyDelete(sectionId)
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

export default DeleteFaculty;
