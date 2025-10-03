import Breadcrumb from "../../Common/Breadcrumb";
import AdminNavBar from "../DashBoard/AdminNavbar";
import Sidebar from "../DashBoard/SideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../../services/operations/profileAPI";

function Profile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const res = await getUserDetails(token);
        setProfileDetails(res);
      } catch (error) {
        console.error("Error Fetching Profile Details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [token]);

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
          <div className="flex flex-col gap-5 justify-center mr-8 pb-10">
            <div>
              <h1 className="text-[35px] text-bhawaniRed font-m2 font-bold md-2">
                My Profile
              </h1>
            </div>
            <div className="w-[70%] h-auto flex flex-row items-center pl-10 p-5 gap-4 bg-white border border-gray-400 rounded-2xl shadow-md">
              <img
                src={user.image}
                alt={user.firstName}
                loading="lazy"
                className="w-28 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[30px] font-bold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[19px] text-gray-500 ">{user.email}</p>
              </div>
            </div>
            <div className="w-[70%] h-auto flex flex-row justify-around items-center pl-10 p-5 gap-10 bg-white border border-gray-400 rounded-2xl shadow-lg">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col ">
                  <p className="text-gray-600 text-[17px]">Name :</p>
                  <p className="text-[20px]">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <div className="flex flex-col ">
                  <p className="text-gray-600 text-[17px]">Role :</p>
                  <p className="text-[20px]">{user.accountType}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col ">
                  <p className="text-gray-600 text-[17px]">Email :</p>
                  <p className="text-[20px]">{user.email}</p>
                </div>

                <div className="flex flex-col ">
                  <p className="text-gray-600 text-[17px]">Contact Number :</p>
                  <p className="text-[20px]">
                    {profileDetails.additionalDetails.contactNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[70%] h-auto flex flex-col pl-20 p-5 pr-20 gap-4 bg-white border border-gray-400 rounded-2xl shadow-lg">
              <p className="text-[23px] text-gray-700 ">About : </p>
              <p className="text-[23px]">
                {profileDetails.additionalDetails.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
