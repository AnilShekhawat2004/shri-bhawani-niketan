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
    <div className="bg-violet-50 min-h-screen">
      <AdminNavBar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />

        <div
          className={`transition-all duration-300 w-full
                  ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        >
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-bhawaniRed to-purple-600 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col gap-8">
            {/* Name + Email */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500 text-lg">{user.email}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-xl font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="text-xl font-semibold text-gray-800">
                  {profileDetails.additionalDetails.contactNumber}
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-xl font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-xl font-semibold text-gray-800">
                  {user.accountType}
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="p-6 bg-white rounded-xl shadow-lg mb-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed">
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
