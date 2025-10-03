import { BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Logo3 from "../../../assets/Logo/Apply Logo.png";
import Logo from "../../../assets/Logo/Logo2.png";
import Admission from "./Admission";

function Navbar() {
  const location = useLocation(); // Get the current route location

  // Check if the current route is exactly the Teacher Resume page
  const isTeacherResumePage = location.pathname.match(
    /^\/staff\/[^/]+\/[^/]+$/
  );
  const Login = location.pathname.match(/\/auth\/login/);
  const isDashboardRoute = location.pathname.includes("dashboard");

  // If it's the teacher resume page, do not render the Navbar
  if (isTeacherResumePage || Login || isDashboardRoute) {
    return null; // Don't render the Navbar on the Teacher Resume page
  }

  const admissionDropdownData = [
    { label: "Academic Programmes", link: "/course" },
    { label: "Bhawani News", link: "/news" },
    { label: "Privacy Policy", link: "/privacy-policy" },
    { label: "About Us", link: "/aboutUs" },
    { label: "Trustess", link: "/trustess" },
  ];

  const courseDropdownData = [
    { label: "Campus Safety", link: "/campusSafety" },
    { label: "Campus Map", link: "/campus-map" },
    { label: "Events", link: "/events" },
    { label: "Campus Life", link: "/campusLife" },
    { label: "Employment At Bhawani", link: "/employment" },
  ];

  return (
    <div>
      <div className="bg-white w-full h-[136px] fixed top-0 z-50 shadow-xl ">
        <div className="flex flex-row gap-[30%] absolute w-[70%] h-10 bg-bhawaniDark translate-x-[462px] rounded-bl-full z-10">
          <div className="flex flex-row pl-6 gap-10 pt-1 uppercase text-white font-verdana">
            <Link to="/news">
              <p className="textHover cursor-pointer">Bhawani News</p>
            </Link>
            <Link to="/achievement">
              <p className="textHover cursor-pointer">achievement</p>
            </Link>
            <Link to="/events">
              <p className="textHover cursor-pointer">Events</p>
            </Link>
            <Link to="/visit">
              <p className="textHover cursor-pointer">Visit</p>
            </Link>
            <Link to="/trustess">
              <p className="textHover cursor-pointer">Trustees</p>
            </Link>
            <Link to="/give">
              <p className="textHover cursor-pointer">Give</p>
            </Link>
          </div>

          <div className="textHover translate-y-2 text-[20px] cursor-pointer text-white">
            <BsSearch />
          </div>
        </div>

        <div>
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              className="absolute z-20 w-[270px] h-[230px] -translate-y-12 translate-x-20 cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex flex-row absolute z-20 text-bhawaniGray translate-x-[500px] gap-[30px] uppercase text-[16px] font-medium translate-y-[65px]">
          <div className="flex flex-col group justify-center items-center">
            <Admission
              className="flex flex-row justify-center items-center w-[150px] cursor-pointer"
              title="academic & admission"
              iconClassName="text-[28px]"
              titleClassName="text-bhawaniGray uppercase"
              openClassName="-translate-x-[70px]"
              item={admissionDropdownData}
            />
            <div className="h-1 bg-bhawaniDark translate-y-[19px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
          </div>

          <div className="flex flex-col group justify-center items-center">
            <Admission
              className="flex flex-row gap-2 justify-center items-center w-[150px] cursor-pointer"
              title="Campus"
              iconClassName="text-[20px]"
              titleClassName="text-bhawaniGray uppercase"
              openClassName="translate-x-[110px] "
              item={courseDropdownData}
            />
            <div className="h-1 bg-bhawaniDark translate-y-[31px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
          </div>

          <Link
            to="/staff"
            className="flex flex-col group justify-center items-center cursor-pointer"
          >
            <p>Faculty & Staff</p>
            <div className="h-1 bg-bhawaniDark translate-y-[31px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
          </Link>

          <Link
            to="/aboutUs"
            className="flex flex-col group justify-center items-center cursor-pointer"
          >
            <p>about us</p>
            <div className="h-1 bg-bhawaniDark translate-y-[31px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
          </Link>

          <Link
            to="/contactUs"
            className="flex flex-col group justify-center items-center cursor-pointer"
          >
            <p>Contact us</p>
            <div className="h-1 bg-bhawaniDark translate-y-[31px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
          </Link>
        </div>

        <Link
          to={"/apply"}
          className="relative  cursor-pointer group left-[1400px] z-0"
        >
          {/* Box */}
          <div className="w-[94px] h-[75px] bg-bhawaniYellow group-hover:h-[120px] transition-all duration-700"></div>

          <div>
            <img
              src={Logo3}
              alt="Apply logo"
              className="absolute z-20 w-[70px] left-[10px] bottom-[20px]"
            />
          </div>

          <div className="w-[80px] h-[1px] bg-bhawaniDark absolute z-10 left-[5px] bottom-[30px]"></div>
          <div>
            <p className="absolute z-10 bottom-[5px] left-[22px] font-semibold text-white">
              Apply
            </p>
          </div>

          {/* SVG Arrow Shape at the Bottom */}
          <svg
            width="94"
            height="17"
            viewBox="0 0 94 17"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[75px] left-0 group-hover:h-[105px] transition-all duration-700"
          >
            <polygon points="0,0 47,17 94,0" fill="#FDB714" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
