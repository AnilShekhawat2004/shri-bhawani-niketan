import Breadcrumb from "../../Common/Breadcrumb";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import AddButton from "../../Common/Buttons/addButton";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Count from "../DashboardCourse/Count";
import Table from "../DashboardCourse/Table"
import { fetchCourseCategories } from "../../../services/operations/courseAPI";
import { showAllCategoryPrograms } from "../../../services/operations/courseAPI";

function Courses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseCat, setCourseCat] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCourseCat = async () => {
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

    fetchCourseCat();
  }, []);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const res = await fetchCourseCategories();
        if (res && res.length > 0) {
          setCourseDetails(res);
        }
      } catch (error) {
        console.log("Error in Fetching the Courses Data : ", error);
      } finally {
        setLoading(false);
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

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );

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
                onClick={() => navigate("/dashboard/courses/addCourses")}
              >
                <IoMdAdd />
              </AddButton>
            </div>
          </div>
          <div className="mt-10">
            <Count />
          </div>
          <div>
            <Table
              courseDetails={courseDetails}
              setCourseDetails={setCourseDetails}
              courseCat={courseCat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
