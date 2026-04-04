import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPhotosDetails } from "../../../../services/operations/imageAPI";
import { setEditPhoto, setPhoto } from "../../../../slices/photoSlice";
import AddPhoto from "../AddPhotos/addPhoto";
import LoaderOverlay from "../../../Common/LoaderOverlay";


export default function EditPhoto() {
  const dispatch = useDispatch();
  const { editPhoto } = useSelector((state) => state.photo);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // extract photoId from query params or global state, however you're passing it
  const queryParams = new URLSearchParams(location.search);
  const photoId = queryParams.get("id"); // Example: /editPhoto?id=123

  useEffect(() => {
    if (!photoId) return;

    (async () => {
      setLoading(true);
      const result = await getPhotosDetails(photoId, token);
      if (result) {
        dispatch(setEditPhoto(true));
        dispatch(setPhoto(result));
      }
      setLoading(false);
    })();
  }, [photoId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <AddPhoto key={editPhoto ? "edit" : "create"}/>
      {loading > 0 && <LoaderOverlay/>}
    </>
  );
}
