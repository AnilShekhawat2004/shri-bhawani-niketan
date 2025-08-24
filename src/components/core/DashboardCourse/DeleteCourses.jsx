import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../../services/operations/courseAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";

function DeleteCourses({ coursesId, setCourseDetails }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteCategory(coursesId, token);

      if (res?.success) {
        setCourseDetails((prev) =>
          prev.filter((course) => course._id !== coursesId)
        );
        navigate("/dashboard/couses", { state: { refresh: true } });
      }
      setConfirmationModal(null);
    } catch (error) {
      console.log("Error Deleting the Courses : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          setConfirmationModal({
            text1: "Do you want to delete this Course?",
            text2: "All the data related to this Course will be deleted",
            btn1Text: !loading ? "Delete" : "Loading...",
            btn2Text: "Cancel",
            btn1Handler: !loading
              ? () => handleCourseDelete(coursesId)
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

export default DeleteCourses;
