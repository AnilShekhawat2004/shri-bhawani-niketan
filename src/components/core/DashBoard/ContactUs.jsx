import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getAllContacts } from "../../../services/operations/contactUs";
import Breadcrumb from "../../Common/Breadcrumb";
import Count from "../DashBoardContact/Count";
import Table from "../DashBoardContact/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import LoaderOverlay from "../../Common/LoaderOverlay"


function ContactUs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [contactDetails, setContactDetails] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllContacts();
        if (res && res.length > 0) {
          setContactDetails(res);
        }
      } catch (error) {
        console.error("Error fetching contacts : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };
    fetchContacts();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const isContactOpen = ["/editInquiry", "/contact/"].some((path) =>
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
                Contact Management
              </h1>
              <p className="text-gray-400">
                Manage contact forms and inquiries
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Count />
          </div>
          <div>
            <Table
              contactDetails={contactDetails}
              setContactDetails={setContactDetails}
            />
          </div>
          {isContactOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editInquiry")
                      ? "Edit Inquiry"
                      : "Inquiry Details"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editInquiry")
                      ? "Organize messages. Update information. Improve engagement.."
                      : "Your questions matter, reach out and let’s talk today."}
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
        {loading > 0 && <LoaderOverlay/>}
    </div>
  );
}

export default ContactUs;
