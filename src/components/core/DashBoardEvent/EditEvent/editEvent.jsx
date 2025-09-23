import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getEventDetails } from "../../../../services/operations/eventAPI";
import { setEvent, setEditEvent } from "../../../../slices/eventSlice";
import AddEvent from "../AddEvent/addEvent";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return <AddEvent key={editEvent ? "edit" : "create"} />;
}
