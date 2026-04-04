import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getAllSections,
  getAllTeacherCategories,
  getCounts,
} from "../../../services/operations/teacherAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Chart from "../Faculty/Chart";
import Count from "../Faculty/Count";
import Table from "../Faculty/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import { resetTeacher } from "../../../slices/teacherSlice";
import { useDispatch } from "react-redux";
import LoaderOverlay from "../../Common/LoaderOverlay";

function Faculty() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [categories, setCategories] = useState([]);
  const [teachDetails, setTeachDetails] = useState([]);
  const [counts, setCounts] = useState({
    teacherSectionCount: 0,
    teachCategoryCount: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchCount = async () => {
    const res = await getCounts();
    if (res) {
      setCounts(res);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchTeachCat = async () => {
    setLoading((prev) => prev + 1);
    try {
      const res = await getAllTeacherCategories();
      if (res && res.length > 0) {
        setCategories(res);
      }
    } catch (error) {
      console.error("Error Fetching categoires: ", error);
    } finally {
      setLoading((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchTeachCat();
  }, []);

  useEffect(() => {
    const getTeacherDetails = async () => {
      setLoading((prev) => prev + 1);
      try {
        const res = await getAllSections();
        if (res && res.length > 0) {
          setTeachDetails(res);
        }

        fetchTeachCat();
        fetchCount();
      } catch (error) {
        console.log("Error in Fetching the Teacher Data : ", error);
      } finally {
        setLoading((prev) => prev - 1);
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

  const isAddFacultyOpen = ["/addFaculty", "/editFaculty"].some((path) =>
    location.pathname.includes(path),
  );

  const handleFaculty = () => {
    dispatch(resetTeacher());
    navigate("/dashboard/faculty/addFaculty");
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
              <h1 className="text-4xl  font-extrabold text-bhawaniDark tracking-wide">
                Faculty & Staff Management
              </h1>
              <p className="text-gray-500 text-sm md:text-base mt-1">
                Manage faculty members, departments and staff records
              </p>
            </div>

            <div>
              <AddButton
                className="w-[150px]"
                text="Add Faculty"
                onClick={handleFaculty}
              >
                <IoMdAdd />
              </AddButton>
            </div>
          </div>
          <div className="mt-10">
            <Count counts={counts} />
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
      {loading > 0 && <LoaderOverlay />}
    </div>
  );
}

export default Faculty;
