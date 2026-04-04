import { useState } from "react";
import { resetTeacher } from "../../../../slices/teacherSlice";
import AddFaculty from "./addFaculty";
import FacultyNext from "./FacultyNext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Teacher () {
    const [step, setStep] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [thumbnailImage, setThumbnailImage] = useState(null)

    const handleCancel = () => {
        navigate("/dashboard/faculty")
        setThumbnailImage(null)
        dispatch(resetTeacher())
    }

    return(
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
        </> 
    )
}

export default Teacher;
