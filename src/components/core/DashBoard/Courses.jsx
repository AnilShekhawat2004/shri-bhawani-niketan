import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  fetchCourseCategories,
  showAllCategoryPrograms,
  getCourseCounts,
} from "../../../services/operations/courseAPI";
import { resetCourse } from "../../../slices/courseSlice";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Count from "../DashboardCourse/Count";
import Table from "../DashboardCourse/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import LoaderOverlay from "../../Common/LoaderOverlay";

function Courses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [courseCat, setCourseCat] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [counts, setCounts] = useState({
    courseCount: 0,
    categoryCount: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchCount = async () => {
    const res = await getCourseCounts();
    if (res) {
      setCounts(res);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCourseCat = async () => {
    setLoading(true);
    try {
      const res = await showAllCategoryPrograms();
      if (res && res.length > 0) {
        setCourseCat(res);
      }
    } catch (error) {
      console.error("Error Fetching course categoires: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseCat();
  }, []);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading((prev) => prev + 1);
      try {
        const res = await fetchCourseCategories();
        if (res && res.length > 0) {
          setCourseDetails(res);
        }
      } catch (error) {
        console.log("Error in Fetching the Courses Data : ", error);
      } finally {
        setLoading((prev) => prev - 1);
      }
    };
    getCourseDetails();

    if (location.state?.refresh) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const isAddCourseOpen = ["/addCourse", "/editCourse"].some((path) =>
    location.pathname.includes(path),
  );

  const handleCourse = () => {
    dispatch(resetCourse());
    navigate("/dashboard/courses/addCourse");
  };

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
                Course Management
              </h1>
              <p className="text-gray-400">
                Manage course catalog and curriculum
              </p>
            </div>

            <div>
              <AddButton
                className="w-[150px]"
                text="Add Courses"
                onClick={handleCourse}
              >
                <IoMdAdd />
              </AddButton>
            </div>
          </div>
          <div className="mt-10">
            <Count counts={counts} />
          </div>
          <div>
            <Table
              courseDetails={courseDetails}
              setCourseDetails={setCourseDetails}
              courseCat={courseCat}
            />
          </div>
          {isAddCourseOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editCourse")
                      ? "Edit Course"
                      : "Add Course"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editCourse")
                      ? "Update course details and ensure data accuracy."
                      : "Transform ideas into expertise with our courses."}
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

export default Courses;
