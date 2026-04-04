import { FaRupeeSign } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoBookOutline, IoNewspaperOutline } from "react-icons/io5";
import { LuMail, LuTrophy } from "react-icons/lu";
import { PiCameraBold } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";

function Sidebar({ isOpen }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SidebarData = [
    {
      SideIcon: RiGroupLine,
      title: "Faculty & Staff",
      link: "/dashboard/faculty",
      color: "text-blue-400",
    },
    {
      SideIcon: IoBookOutline,
      title: "Courses",
      link: "/dashboard/courses",
      color: "text-green-600",
    },
    {
      SideIcon: HiOutlineCalendar,
      title: "Events",
      link: "/dashboard/event",
      color: "text-purple-700",
    },
    {
      SideIcon: IoNewspaperOutline,
      title: "News",
      link: "/dashboard/news",
      color: "text-orange-700",
    },
    {
      SideIcon: FaRupeeSign,
      title: "Donations",
      link: "/dashboard/payment",
      color: "text-green-700",
    },
    {
      SideIcon: PiCameraBold,
      title: "Campus Life",
      link: "/dashboard/photos",
      color: "text-pink-700",
    },
    {
      SideIcon: LuTrophy,
      title: "Achievements",
      link: "/dashboard/achievement",
      color: "text-yellow-600",
    },
    {
      SideIcon: LuMail,
      title: "Contact Us",
      link: "/dashboard/contact",
      color: "text-blue-800",
    },
  ];

  return (
    <div
      className={`
            fixed top-[74px]  left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r shadow-[3px_0_6px_-2px_rgba(0,0,0,0.15)] border-gray-300  z-40
            transition-transform duration-300 flex flex-col gap-[75px]
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <div className="grid grid-cols-1 gap-3 p-4">
        {SidebarData.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex w-48 ml-2 h-10 justify-start pl-5 items-center rounded-xl border-l-8 
          border-bhawaniDark gap-4 hover:bg-gray-200 transition-all duration-500"
          >
            <item.SideIcon className={`text-[18px] ${item.color}`} />
            <p className="text-[17px] font-sans text-center text-bhawaniDark">
              {item.title}
            </p>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-300 bg-gray-100 mt-auto">
        <div
          className="border-b border-gray-300 pt-4 pl-4 pb-3 pr-2 flex items-center gap-1 
          cursor-pointer hover:bg-gray-300 transition-all duration-500"
          onClick={() => navigate("/dashboard/profile")}
        >
          <img
            src={user?.image}
            alt={user.firstName}
            loading="lazy"
            className="rounded-full w-10 ring ring-bhawaniDark"
          />

          <div>
            <p className="text-[12px] font-bold">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="flex w-full items-center h-12">
          <div
            className="flex h-full w-full hover:bg-gray-300 transition-all 
                      duration-500 justify-center items-center cursor-pointer gap-2"
            onClick={() => navigate("/dashboard/settings")}
          >
            <SlSettings className="text-[20px]" />
            <p>Settings</p>
          </div>
          <div className="h-full bg-gray-300 w-[1px]"></div>
          <div
            onClick={() => {
              dispatch(logout(navigate));
            }}
            className="flex h-full w-full justify-center items-center hover:bg-gray-300 transition-all duration-500 cursor-pointer gap-2"
          >
            <FiLogOut className="text-[20px]" />
            <p className="font-m2">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
