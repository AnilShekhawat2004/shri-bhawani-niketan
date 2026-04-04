import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getEventDetails } from "../../../../services/operations/eventAPI";
import { setEditEvent, setEvent } from "../../../../slices/eventSlice";
import AddEvent from "../AddEvent/addEvent";
import LoaderOverlay from "../../../Common/LoaderOverlay";

export default function EditEvent() {
  const dispatch = useDispatch();
  const { editEvent } = useSelector((state) => state.event);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // extract eventId from query params or global state, however you're passing it
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("id"); // Example: /editEvent?id=123

  useEffect(() => {
    if (!eventId) return;

    (async () => {
      setLoading(true);
      const result = await getEventDetails(eventId, token);
      if (result) {
        dispatch(setEditEvent(true));
        dispatch(setEvent(result));
      }
      setLoading(false);
    })();
  }, [eventId, token, dispatch]);


  return (
    <>
      <AddEvent key={editEvent ? "edit" : "create"}/>
      {loading > 0 && <LoaderOverlay/>}
    </>
  );
}
