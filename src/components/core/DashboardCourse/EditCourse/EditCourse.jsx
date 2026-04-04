import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseCategoryDetails } from "../../../../services/operations/courseAPI";
import {
  setCourse,
  setEditCourse,
  resetCourse,
} from "../../../../slices/courseSlice";
import AddCourse from "../AddCourse/AddCourse";
import AddCourseDetails from "../AddCourse/AddCourseDetails";
import LoaderOverlay from "../../../Common/LoaderOverlay";

export default function EditCourse() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");

  useEffect(() => {
    if (!courseId) return;

    (async () => {
      setLoading(true);
      const result = await getCourseCategoryDetails(courseId);
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result));
      }
      setLoading(false);
    })();
  }, [courseId, dispatch]);

  const handleCancel = () => {
      navigate("/dashboard/courses");
      setThumbnailImage(null);
      dispatch(setEditCourse(false))
      dispatch(resetCourse());
    };

  return (
    <>
      { step === 1 && (
        <AddCourse
          onNext={() => setStep(2)}
          thumbnailImage={thumbnailImage}
          setThumbnailImage={setThumbnailImage}
          onCancel={handleCancel}
        />
      )}

      { step === 2 && (
        <AddCourseDetails
          onBack={() => setStep(1)}
          thumbnailImage={thumbnailImage}
        />
      )}
      {loading && <LoaderOverlay />}
    </>
  );
}
