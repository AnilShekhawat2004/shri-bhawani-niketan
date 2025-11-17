// import Breadcrumb from "../../Common/Breadcrumb";
// import AdminNavBar from "../DashBoard/AdminNavbar";
// import Sidebar from "../DashBoard/SideBar";
// import { useState } from "react";
// import EditProfileImage from "./Settings/EditProfileImage";
// import EditProfile from "./Settings/EditProfile";
// import Password from "./Settings/Password";
// import DeleteAccount from "./Settings/DeleteAccount";

// function Settings() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <div className="bg-violet-50 w-full h-full overflow-x-hidden">
//       <AdminNavBar toggleSidebar={toggleSidebar} />
//       <div className="flex">
//         <Sidebar isOpen={isSidebarOpen} />

//         <div
//           className={`transition-all mt-[75px] duration-300 pl-10 pt-5 w-full
//                      ${isSidebarOpen ? "ml-64" : "ml-0"}`}
//         >
//           <Breadcrumb />
//           <div className="flex flex-col gap-5 justify-center mr-8 pb-10">
//             <div>
//               <h1 className="text-[35px] text-bhawaniRed font-m2 font-bold md-2">
//                 Settings
//               </h1>
//             </div>
//             <div>
//               <EditProfileImage />
//             </div>
//             <div>
//               <EditProfile />
//             </div>
//             <div>
//               <Password />
//             </div>
//             <div>
//               <DeleteAccount />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;
// Settings.jsx (Main Page)
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
  const [activeTab, setActiveTab] = useState("profileImage");

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profileImage": return <EditProfileImage />;
      case "editProfile": return <EditProfile />;
      case "password": return <Password />;
      case "deleteAccount": return <DeleteAccount />;
      default: return <EditProfileImage />;
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen flex flex-col">
      <AdminNavBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />

        <div className={`transition-all duration-300 w-full mt-[75px] p-6 md:p-10 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
          <Breadcrumb />
          <h1 className="text-4xl md:text-5xl font-bold text-bhawaniRed my-6">Settings</h1>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { key: "profileImage", label: "Profile Image" },
              { key: "editProfile", label: "Edit Profile" },
              { key: "password", label: "Password" },
              { key: "deleteAccount", label: "Delete Account" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all
                  ${activeTab === tab.key 
                    ? "bg-gradient-to-br from-[#D88DB9] to-[#A678B8] text-white shadow-lg"
                    : "bg-white text-gray-700 shadow hover:shadow-lg hover:scale-105"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div>{renderActiveTab()}</div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
