import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTeachDetails } from "../../../../services/operations/teacherAPI";
import { setEditTeacher, setTeacher } from "../../../../slices/teacherSlice";
import FacultyNext from "../AddFaculty/FacultyNext";

export default function EditFacultyNext() {
  const dispatch = useDispatch();
  const { editTeacher } = useSelector((state) => state.teacher);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // extract teachId from query params or global state, however you're passing it
  const queryParams = new URLSearchParams(location.search);
  const teachId = queryParams.get("id");

  useEffect(() => {
    if (!teachId) return;

    (async () => {
      setLoading(true);
      const result = await getTeachDetails(teachId, token);
      if (result) {
        dispatch(setEditTeacher(true));
        dispatch(setTeacher(result));
      }
      setLoading(false);
    })();
  }, [teachId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return <FacultyNext key={editTeacher ? "edit" : "create"} />;
}
