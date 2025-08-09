import Breadcrumb from "../../Common/Breadcrumb";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import { useEffect, useState } from "react";
import AddButton from "../../Common/Buttons/addButton";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Count from "../Faculty/Count";
import Chart from "../Faculty/Chart";
import Table from "../Faculty/Table";
import { getAllTeacherCategories } from "../../../services/operations/teacherAPI";
import { getAllSections } from "../../../services/operations/teacherAPI";

function Faculty() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [teachDetails, setTeachDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTeachCat = async () => {
      try {
        const res = await getAllTeacherCategories();
        if (res && res.length > 0) {
          setCategories(res);
        }
      } catch (error) {
        console.error("Error Fetching categoires: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachCat();
  }, []);

  useEffect(() => {
    const getTeacherDetails = async () => {
      try {
        const res = await getAllSections();
        if (res && res.length > 0) {
          setTeachDetails(res);
        }
      } catch (error) {
        console.log("Error in Fetching the Teacher Data : ", error);
      } finally {
        setLoading(false);
      }
    };
    getTeacherDetails();

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

  const isAddFacultyOpen = ["/addFaculty", "/editFaculty"].some((path) =>
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
                Faculty & Staff Management
              </h1>
              <p className="text-gray-400">
                Manage faculty members, departments and staff records
              </p>
            </div>

            <div>
              <AddButton
                className="w-[150px]"
                text="Add Faculty"
                onClick={() => navigate("/dashboard/faculty/addFaculty")}
              >
                <IoMdAdd />
              </AddButton>
            </div>
          </div>
          <div className="mt-10">
            <Count />
          </div>
          <div>
            <Chart teacher={categories} />
          </div>
          <div>
            <Table
              teachDetails={teachDetails}
              setTeachDetails={setTeachDetails}
              teachCat={categories}
            />
          </div>
          {isAddFacultyOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editFaculty")
                      ? "Edit Faculty Member"
                      : "Add Faculty Member"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editFaculty")
                      ? "Update faculty details and ensure data accuracy."
                      : "Empower your institution with great educators."}
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

export default Faculty;
