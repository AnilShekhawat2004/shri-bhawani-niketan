import React from "react";
import { RiGroupLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { PiCameraBold } from "react-icons/pi";
import { LuTrophy } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI"
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";

function Sidebar({ isOpen }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
            fixed top-19 translate-y-[74px] left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r shadow-[3px_0_6px_-2px_rgba(0,0,0,0.15)] border-gray-300 p-4 z-40
            transition-transform duration-300 flex flex-col gap-20
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <div className="grid grid-cols-1 gap-3 ">
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

      <div
       onClick={() => {dispatch(logout(navigate))}} 
       className="w-40 h-14 flex justify-center items-center gap-2 bg-gray-300 border rounded-lg cursor-pointer"
      >
        <FiLogOut className="text-[20px]"/>
        <p className="text-[20px] font-m2">Log Out</p>
      </div>
    </div>
  );
}

export default Sidebar;
