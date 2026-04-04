import { useState } from "react";
import { resetCourse } from "../../../../slices/courseSlice";
import AddCourse from "./AddCourse";
import AddCourseDetails from "./AddCourseDetails";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const handleCancel = () => {
    navigate("/dashboard/courses");
    setThumbnailImage(null);
    dispatch(resetCourse());
  };

  return (
    <>
      {step === 1 && (
        <AddCourse
          onNext={() => setStep(2)}
          thumbnailImage={thumbnailImage}
          setThumbnailImage={setThumbnailImage}
          onCancel={handleCancel}
        />
      )}

      {step === 2 && (
        <AddCourseDetails
          onBack={() => setStep(1)}
          thumbnailImage={thumbnailImage}
        />
      )}
    </>
  );
}

export default CreateCourse;
