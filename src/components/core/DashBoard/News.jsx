import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getAllNews,
  getNewsCounts,
} from "../../../services/operations/newsAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Count from "../DashBoardNews/Count";
import Table from "../DashBoardNews/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import LoaderOverlay from "../../Common/LoaderOverlay";

function News() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({
    newsCount: 0,
    publishedCount: 0,
    draftCount: 0,
  });
  const [loading, setLoading] = useState(0);
  const [newsDetails, setNewsDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchNewsCount = async () => {
    const res = await getNewsCounts();
    if (res) {
      setCounts(res);
    }
  };

  useEffect(() => {
    fetchNewsCount();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading((prev) => prev + 1);
      try {
        const res = await getAllNews();
        if (res && res.length > 0) {
          setNewsDetails(res);
        }

        fetchNewsCount();
      } catch (error) {
        console.log("Error fetching news :", error);
      } finally {
        setLoading((prev) => prev - 1);
      }
    };

    fetchNews();

    if (location.state?.refresh) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const isAddNewsOpen =
    location.pathname.includes("addNews") ||
    location.pathname.includes("editNews");

  return (
    <div className="bg-violet-50 w-full h-full overflow-x-hidden">
      <AdminNavBar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />

        <div
          className={`transition-all mt-[75px] duration-300 pl-10 pt-5 w-full
                      ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <Breadcrumb />
          <div className="flex flex-row justify-between mr-8">
            <div>
              <h1 className="text-[35px] font-m2 font-bold md-2">
                News Management
              </h1>
              <p className="text-gray-400">
                Manage news articles and announcements
              </p>
            </div>

            <div>
              <AddButton
                className="w-[150px]"
                text="Add News"
                onClick={() => navigate("/dashboard/news/addNews")}
              >
                <IoMdAdd />
              </AddButton>
            </div>
          </div>
          <div className="mt-10">
            <Count counts={counts} />
          </div>
          <div>
            <Table newsDetails={newsDetails} setNewsDetails={setNewsDetails} />
          </div>
          {isAddNewsOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editNews")
                      ? "Edit News articles"
                      : "Add News articles"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editNews")
                      ? "Update news articles details and ensure news accuracy."
                      : "Keep your community informed with impactful news."}
                  </p>
                </div>
                <div className="pl-10 pr-10 pb-10 max-h-[80vh] overflow-y-auto hide-scrollbar scroll-smooth">
                  <Outlet />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading > 0 && <LoaderOverlay />}
    </div>
  );
}

export default News;
