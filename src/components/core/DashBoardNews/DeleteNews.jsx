import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNews } from "../../../services/operations/newsAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";

function DeleteNews({ newsId, setNewsDetails }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleNewsDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteNews(newsId, token);

      if (res?.success) {
        setNewsDetails((prev) => prev.filter((news) => news._id !== newsId));
        navigate("/dashboard/news", { state: { refresh: true } });
      }
      setConfirmationModal(null);
    } catch (error) {
      console.log("Error Deleting the news : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          setConfirmationModal({
            text1: "Do you want to delete this news?",
            text2: "All the data related to this news will be deleted",
            btn1Text: !loading ? "Delete" : "Loading...",
            btn2Text: "Cancel",
            btn1Handler: !loading ? () => handleNewsDelete(newsId) : () => {},
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

export default DeleteNews;
