import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getAllPayments } from "../../../services/operations/paymentAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import Count from "../DashBoardPayment/PaymentCount";
import Table from "../DashBoardPayment/PaymentTable";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";
import LoaderOverlay from "../../Common/LoaderOverlay"

function Payment() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllPayments();
        if (res && res.length > 0) {
          setPaymentDetails(res);
        }
      } catch (error) {
        console.error("Error Fetching payments details : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };
    fetchPaymentDetails();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  const isPaymentOpen = ["/payment/"].some((path) =>
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
                Donation Management
              </h1>
              <p className="text-gray-400">
                Track donation, manage donors and analyze giving patterns
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Count />
          </div>
          <div>
            <Table paymentDetails={paymentDetails} />
          </div>
          {isPaymentOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
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

export default Payment;
