import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAchieveDetails } from "../../../../services/operations/achievementAPI";
import {
  setAchievement,
  setEditAchievement,
} from "../../../../slices/achievementSlice";
import AddAchievement from "../AddAchievement/addAchievement";
import LoaderOverlay from "../../../Common/LoaderOverlay"


export default function EditAchievement() {
  const dispatch = useDispatch();
  const { editAchievement } = useSelector((state) => state.achievement);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // extract achieveId from query params or global state, however you're passing it
  const queryParams = new URLSearchParams(location.search);
  const achieveId = queryParams.get("id"); // Example: /editAchievement?id=123

  useEffect(() => {
    if (!achieveId) return;

    (async () => {
      setLoading(true);
      const result = await getAchieveDetails(achieveId, token);
      if (result) {
        dispatch(setEditAchievement(true));
        dispatch(setAchievement(result));
      }
      setLoading(false);
    })();
  }, [achieveId, token, dispatch]);

  return (
    <>
      <AddAchievement key={editAchievement ? "edit" : "create"} />
      {loading > 0 && <LoaderOverlay/>}
    </>
  );
}
