import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCourseCategoryDetails } from "../../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import AddCourse from "../AddCourse/AddCourse";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");

  useEffect(() => {
    if (!courseId) return;

    (async () => {
      setLoading(true);
      const result = await getCourseCategoryDetails(courseId, token);
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result));
      }
      setLoading(false);
    })();
  }, [courseId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return <AddCourse key={editCourse ? "edit" : "create"} />;
}
