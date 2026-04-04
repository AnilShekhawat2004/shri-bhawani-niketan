import { BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Logo3 from "../../../assets/Logo/Apply Logo.png";
import Logo from "../../../assets/Logo/SbnLogo.png";
import Admission from "./Admission";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MobileDropDown from "./MobileDropDown";

function Navbar() {
  const [open, setOpen] = useState(false);
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
    { label: "Trustees", link: "/trustees" },
  ];

  const courseDropdownData = [
    { label: "Campus Safety", link: "/campusSafety" },
    { label: "Campus Map", link: "/campus-map" },
    { label: "Events", link: "/events" },
    { label: "Campus Life", link: "/campusLife" },
    { label: "Employment At Bhawani", link: "/employment" },
  ];

  const RedLinks = [
    { id: 1, label: "Bhawani News", link: "/news" },
    { id: 2, label: "Achievement", link: "/achievement" },
    { id: 3, label: "Events", link: "/events" },
    { id: 4, label: "Visit", link: "/visit" },
    { id: 5, label: "Trustees", link: "/trustees" },
    { id: 6, label: "Give", link: "/give" },
  ];

  const OtherLinks = [
    { id: 1, label: "Faculty & Staff", link: "/staff" },
    { id: 2, label: "about us", link: "/aboutUs" },
    { id: 3, label: "Contact Us", link: "/contactUs" },
  ];

  return (
    <nav>
      <div className="hidden lg:block md:block xl:block bg-white w-[100vw] h-[136px] fixed top-0 z-50 shadow-xl ">
        <div className="w-full flex justify-end z-40">
          <div className="flex flex-row absolute justify-between w-[70%] h-10 xl:h-10 lg:h-10 md:h-9 bg-bhawaniDark rounded-bl-full z-40">
            <div className="flex flex-row pl-6 gap-[10%] xl:gap-[9%] lg:gap-[7%] md:gap-[5%] pt-2 xl:pt-2 lg:pt-2 md:pt-1 uppercase text-white font-verdana">
              {RedLinks.map((item) => (
                <Link to={item.link} key={item.id}>
                  <p className="textHover cursor-pointer text-base xl:text-base md:text-xs lg:text-sm whitespace-nowrap">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>

            <Link to="/auth/login" className="text-[15px] xl:text-[15px] lg:text-[15px] md:text-[13px] text-white flex justify-end bg-bhawaniYellow px-4 py-1 rounded-full mr-8 my-1 hover:scale-110 transition-all duration-300 cursor-pointer">
              Sign in
            </Link>
          </div>
        </div>

        {/* <div className="w-full pl-[10%]">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              className="absolute z-20 w-[130px] h-[130px] translate-y-1 cursor-pointer"
            />
          </Link>
        </div> */}

        <div className="w-full flex flex-row justify-end absolute">
          <Link to="/" className="pl-[10%] w-full">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              className="absolute z-20 w-[130px] h-[130px] translate-y-1 cursor-pointer"
            />
          </Link>

          <div className="flex flex-row absolute z-20 text-bhawaniGray w-[68%] gap-[3%] xl:gap-[3%] lg:gap-[1%] md:gap-[20px] pr-[20%] xl:pr-[20%] lg:pr-[20%] md:pr-[13%] uppercase text-[16px] xl:text-[16px] lg:text-[14px] md:text-[10px] font-medium translate-y-[65px]">
            <div className="flex flex-col group justify-center items-center">
              <Admission
                className="flex flex-row justify-center items-center cursor-pointer"
                title={["academic &", <br key="break" />, "admission"]}
                iconClassName="text-[20px] xl:text-[20px] lg:text-[20px] md:text-[15px]"
                titleClassName="text-bhawaniGray uppercase"
                openClassName=""
                item={admissionDropdownData}
              />
              <div className="h-1 bg-bhawaniDark translate-y-[19px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
            </div>

            <div className="flex flex-col group justify-center items-center">
              <Admission
                className="flex flex-row gap-2 justify-center items-center cursor-pointer"
                title="Campus"
                iconClassName="text-[20px] xl:text-[20px] lg:text-[20px] md:text-[15px]"
                titleClassName="text-bhawaniGray uppercase"
                openClassName="translate-y-[28px]"
                item={courseDropdownData}
              />
              <div className="h-1 bg-bhawaniDark translate-y-[31px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
            </div>

            {OtherLinks.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                className="flex flex-col group justify-center items-center cursor-pointer"
              >
                <p>{item.label}</p>
                <div className="h-1 bg-bhawaniDark translate-y-[31px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 w-full"></div>
              </Link>
            ))}
          </div>

          <Link
            to={"/apply"}
            className="relative cursor-pointer group z-20 pr-[5%] xl:pr-[5%] lg:pr-[5%] md:pr-[1%]"
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

      <div className="md:hidden lg:hidden xl:hidden bg-gradient-to-r from-[#4b0000] to-[#990000] h-[50px] sm:h-[70px] w-full fixed top-0 z-50 shadow-xl">
        <div className="flex flex-row justify-between items-center px-4 py-1 sm:px-6">
          <button
            onClick={() => setOpen(!open)}
            className="text-white flex flex-row items-center gap-3 text-[14px] sm:text-[15px]"
          >
            <div className="relative w-7 sm:w-8 h-5 sm:h-6 flex flex-col justify-between items-center group">
              {/* Line 1 */}
              <span
                className={`block h-[2px] w-full bg-white rounded transition-all duration-500 ${
                  open
                    ? "rotate-45 translate-y-[11px] sm:translate-y-[11px]"
                    : ""
                }`}
              ></span>

              {/* Line 2 */}
              <span
                className={`block h-[2px] w-full bg-white rounded transition-all duration-500 ${
                  open ? "opacity-0" : ""
                }`}
              ></span>

              {/* Line 3 */}
              <span
                className={`block h-[2px] w-full bg-white rounded transition-all duration-500 ${
                  open
                    ? "-rotate-45 -translate-y-[7px] sm:-translate-y-[11px]"
                    : ""
                }`}
              ></span>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${
                open
                  ? "opacity-100 translate-x-0"
                  : "opacity-100 -translate-x-1"
              }`}
            >
              {open ? "CLOSE" : "MENU"}
            </div>
          </button>

          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              className={`w-[40px] sm:w-[60px] z-20 cursor-pointer ${
                open
                  ? "-translate-x-[27.5px] sm:-translate-x-[27.5px]"
                  : "-translate-x-6"
              }`}
            />
          </Link>

          <div>
            <BsSearch className="text-white text-[20px] sm:text-[25px] font-bold cursor-pointer" />
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-[50px] sm:top-[70px] left-0 w-[75%] sm:w-[60%] h-screen bg-[#7a0000] text-white z-40 flex flex-col space-y-8 py-10 px-6  shadow-2xl overflow-y-auto"
            >
              {/* Courses Dropdown */}
              <MobileDropDown
                title="academic & admission"
                item={admissionDropdownData}
                closeMenu={() => setOpen(false)}
              />

              <MobileDropDown title="Campus" item={courseDropdownData} closeMenu={() => setOpen(false)} />

              {OtherLinks.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  onClick={() => setOpen(false)}
                  className="text-white text-[14px] uppercase"
                >
                  {item.label}
                </Link>
              ))}

              {RedLinks.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  onClick={() => setOpen(false)}
                  className="text-white text-[14px] uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
