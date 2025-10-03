import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAllEvents } from "../../../services/operations/eventAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Count from "../DashBoardEvent/Count";
import Table from "../DashBoardEvent/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";

function Event() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getAllEvents();
        if (res && res.length > 0) {
          setEventDetails(res);
        }
      } catch (error) {
        console.error("Error Fetching events : ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );

  const isAddEventOpen = ["/addEvent", "/editEvent"].some((path) =>
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
                Event Management
              </h1>
              <p className="text-gray-400">
                Manage campus event and scheduling
              </p>
            </div>

            <div>
              <AddButton
                className="w-[150px]"
                text="Add Event"
                onClick={() => navigate("/dashboard/event/addEvent")}
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
              eventDetails={eventDetails}
              setEventDetails={setEventDetails}
            />
          </div>
          {isAddEventOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editEvent")
                      ? "Edit Event"
                      : "Add Event"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editEvent")
                      ? "Update with purpose. Deliver with impact."
                      : "Shape knowledge. Build community. Create unforgettable events.."}
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

export default Event;
