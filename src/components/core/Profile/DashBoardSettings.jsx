import Breadcrumb from "../../Common/Breadcrumb";
import AdminNavBar from "../DashBoard/AdminNavbar";
import Sidebar from "../DashBoard/SideBar";
import { useState } from "react";
import EditProfileImage from "./Settings/EditProfileImage";
import EditProfile from "./Settings/EditProfile";
import Password from "./Settings/Password";
import DeleteAccount from "./Settings/DeleteAccount";

function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
          <div className="flex flex-col gap-5 justify-center mr-8 pb-10">
            <div>
              <h1 className="text-[35px] text-bhawaniRed font-m2 font-bold md-2">
                Settings
              </h1>
            </div>
            <div>
              <EditProfileImage />
            </div>
            <div>
              <EditProfile />
            </div>
            <div>
              <Password />
            </div>
            <div>
              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
