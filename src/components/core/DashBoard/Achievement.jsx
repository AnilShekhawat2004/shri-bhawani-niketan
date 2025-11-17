import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAllAchievements } from "../../../services/operations/achievementAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Count from "../DashBoardAchievement/Count";
import Table from "../DashBoardAchievement/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";

function Achievement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [achieveDetails, setAchieveDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAllAchievementDetails = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllAchievements();
        if (res && res.length > 0) {
          setAchieveDetails(res);
        }
      } catch (error) {
        console.log("Error in Fetching the Achievement Data : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };
    getAllAchievementDetails();

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

  const isAddAchievementOpen = ["/addAchievement", "/editAchievement"].some(
    (path) => location.pathname.includes(path)
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
                Achievements Management
              </h1>
              <p className="text-gray-400">
                Track and manage awards and recognitions
              </p>
            </div>

            <div>
              <AddButton
                className="w-[200px]"
                text="Add Achievement"
                onClick={() =>
                  navigate("/dashboard/achievement/addAchievement")
                }
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
              achieveDetails={achieveDetails}
              setAchieveDetails={setAchieveDetails}
            />
          </div>
          {isAddAchievementOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editAchievement")
                      ? "Edit Achievement"
                      : "Add Achievement"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editAchievement")
                      ? "Update track records and award ensure data accuracy."
                      : "Showcasing your proudest moments."}
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

export default Achievement;
