import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getTeachDetails } from "../../../../services/operations/teacherAPI";
import { setEditTeacher, setTeacher, resetTeacher } from "../../../../slices/teacherSlice";
import AddFaculty from "../AddFaculty/addFaculty"
import FacultyNext from "../AddFaculty/FacultyNext"
import LoaderOverlay from "../../../Common/LoaderOverlay";

export default function EditFaculty() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extract teachId from query params or global state, however you're passing it
  const queryParams = new URLSearchParams(location.search);
  const teachId = queryParams.get("id"); // Example: /editFaculty?id=123

  useEffect(() => {
    if (!teachId) return;

    (async () => {
      setLoading(true);
      const result = await getTeachDetails(teachId);
      if (result) {
        dispatch(setEditTeacher(true));
        dispatch(setTeacher(result));
      }
      setLoading(false);
    })();
  }, [teachId, dispatch]);

  const handleCancel = () => {
    navigate("/dashboard/faculty");
    setThumbnailImage(null);
    dispatch(setEditTeacher(false))
    dispatch(resetTeacher());
  };

  return (
    <>
      { step === 1 && (
        <AddFaculty
          onNext={() => setStep(2)}
          thumbnailImage={thumbnailImage}
          setThumbnailImage={setThumbnailImage}
          onCancel={handleCancel}
        />
      )}

      { step === 2 && (
        <FacultyNext
          onBack={() => setStep(1)}
          thumbnailImage={thumbnailImage}
        />
      )}
      {loading && <LoaderOverlay />}
    </>
  );
}
