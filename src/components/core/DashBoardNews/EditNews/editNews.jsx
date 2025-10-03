import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getNewsDetails } from "../../../../services/operations/newsAPI";
import { setEditNews, setNews } from "../../../../slices/newsSlice";
import AddNews from "../AddNews/addNews";

export default function EditNews() {
  const dispatch = useDispatch();
  const { editNews } = useSelector((state) => state.news);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // extract newsId from query params or global state, however you're passing it
  const queryParams = new URLSearchParams(location.search);
  const newsId = queryParams.get("id"); // Example: /editNews?id=123

  useEffect(() => {
    if (!newsId) return;

    (async () => {
      setLoading(true);
      const result = await getNewsDetails(newsId, token);
      if (result) {
        dispatch(setEditNews(true));
        dispatch(setNews(result));
      }
      setLoading(false);
    })();
  }, [newsId, token, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return <AddNews key={editNews ? "edit" : "create"} />;
}
