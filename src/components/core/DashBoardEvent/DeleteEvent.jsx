import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../../services/operations/eventAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";

function DeleteEvent({ eventId, setEventDetails }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleEventDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteEvent(eventId, token);

      if (res?.success) {
        setEventDetails((prev) =>
          prev.filter((event) => event._id !== eventId)
        );
        navigate("/dashboard/event", { state: { refresh: true } });
      }
      setConfirmationModal(null);
    } catch (error) {
      console.log("Error Deleting the Event : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          setConfirmationModal({
            text1: "Do you want to delete this Event?",
            text2: "All the data related to this Event will be deleted",
            btn1Text: !loading ? "Delete" : "Loading...",
            btn2Text: "Cancel",
            btn1Handler: !loading
              ? () => handleEventDelete(eventId)
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

export default DeleteEvent;
