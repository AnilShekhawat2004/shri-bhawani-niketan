import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchCourseCategories, showAllCategoryPrograms } from "../../../services/operations/courseAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Count from "../DashboardCourse/Count";
import Table from "../DashboardCourse/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";

function Courses() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [courseCat, setCourseCat] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCourseCat = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await showAllCategoryPrograms();
        if (res && res.length > 0) {
          setCourseCat(res);
        }
      } catch (error) {
        console.error("Error Fetching course categoires: ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    fetchCourseCat();
  }, []);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await fetchCourseCategories();
        if (res && res.length > 0) {
          setCourseDetails(res);
        }
      } catch (error) {
        console.log("Error in Fetching the Courses Data : ", error);
      } finally {
        setLoading(prev => prev - 1)
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

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );

  const isAddCourseOpen = ["/addCourse", "/editCourse"].some((path) =>
    location.pathname.includes(path)
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
                onClick={() => navigate("/dashboard/courses/addCourse")}
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
    </div>
  );
}

export default Courses;
