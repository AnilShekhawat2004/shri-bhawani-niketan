import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo/Apply Logo.png";
import { logout } from "../../../services/operations/authAPI";
import Notification from "../DashBoardContact/Notification";

function AdminNavBar({ toggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[75px] fixed inset-0 flex items-center shadow-sm border-b border-gray-300 bg-white px-5 top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-[40px]">
        <div className="flex items-center justify-center h-[45px] w-[45px] rounded-full hover:bg-gray-200 transition-all duration-500">
          <RxHamburgerMenu
            onClick={toggleSidebar}
            className="text-[25px] cursor-pointer"
          />
        </div>

        <div className="flex items-center">
          <img src={Logo} alt="Logo" loading="lazy" className="w-[15%]" />
          <p className="font-m1 pt-2 text-[36px] font-bold">Admin</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center ml-auto gap-7 ">
        <div>
          <Notification />
        </div>

        <div
          onClick={() => {
            dispatch(logout(navigate));
          }}
          className="flex px-4 py-3 bg-gray-100 shadow-md rounded-xl border border-gray-400 justify-center items-center hover:shadow-lg hover:bg-gray-300 transition-all duration-500 cursor-pointer gap-2"
        >
          <FiLogOut className="text-[20px]" />
          <p className="font-m2">Logout</p>
        </div>
      </div>
    </div>
  );
}

export default AdminNavBar;
