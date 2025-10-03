import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/Logo.png";
import "./Footer.css";

function Footer() {
  return (
    <div className="bg-bhawaniDark lg:h-[330px] w-full mt-32 px-6 md:px-10 lg:px-[120px] pb-12 flex flex-col justify-center lg:text-start text-center items-center lg:justify-start lg:items-start lg:flex-row gap-14 lg:gap-20">
      {/* Logo and Social Icons */}
      <div className="flex flex-col items-center lg:items-start gap-4">
        <Link
          to="/"
          className="bg-bhawaniGray2 w-[200px] h-[180px] md:w-[230px] md:h-[210px] lg:w-[260px] lg:h-[240px] 
                     -translate-y-3 md:-translate-y-4 lg:-translate-y-5 flex items-center justify-center 
                     rounded-b-3xl shadow-black shadow-lg"
        >
          <img
            src={Logo}
            alt="Logo"
            loading="lazy"
            className="w-[180px] h-[160px] md:w-[210px] md:h-[190px] lg:w-[230px] lg:h-[220px]"
          />
        </Link>

        <div className="flex flex-row gap-5 lg:gap-8 text-[22px] md:text-[26px] lg:text-[28px] text-white">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="yellowHover"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="yellowHover"
            aria-label="Instagram"
          >
            <BsInstagram />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="yellowHover"
            aria-label="LinkedIn"
          >
            <TfiLinkedin />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="yellowHover"
            aria-label="YouTube"
          >
            <ImYoutube />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="yellowHover"
            aria-label="Twitter"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="pt-6 lg:pt-14 font-verdana text-white flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24">
        {/* Column 1 */}
        <div className="flex flex-col w-full md:w-[200px] gap-4 md:gap-6 lg:gap-7">
          <p className="textHover text-sm md:text-base">
            Maharao Shekha Circle (Chomu Pulia), Sikar Road, Jaipur - 302039
          </p>
          <p className="textHover text-sm md:text-base">+91 141 2233863</p>
          <p className="textHover text-sm md:text-base">
            sbnboyscollege@gmail.com
          </p>
          <Link to="/campus-map">
            <p className="textHover text-sm md:text-base">Campus Map</p>
          </Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col w-full md:w-[200px] gap-4 md:gap-6 lg:gap-7">
          <Link to="/employment">
            <p className="textHover text-sm md:text-base">
              Employment at Bhawani
            </p>
          </Link>
          <Link to="/staff">
            <p className="textHover text-sm md:text-base">Faculty & Staff</p>
          </Link>
          <Link to="/trustess">
            <p className="textHover text-sm md:text-base">Trustees</p>
          </Link>
          <Link to="/privacy-policy">
            <p className="textHover text-sm md:text-base">Privacy Policy</p>
          </Link>
          <Link to="/contactUs">
            <p className="textHover text-sm md:text-base">Contact Us</p>
          </Link>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col w-full md:w-[270px] gap-4 md:gap-6 lg:gap-7">
          <Link to="/course">
            <p className="textHover text-sm md:text-base">
              Academic Programmes
            </p>
          </Link>
          <Link to="/campusLife">
            <p className="textHover text-sm md:text-base">Campus Life</p>
          </Link>
          <Link to="/harassment-policy">
            <p className="textHover text-sm md:text-base">
              Harassment/Discrimination Policy
            </p>
          </Link>
          <Link to="/events">
            <p className="textHover text-sm md:text-base">Events</p>
          </Link>
          <Link to="/aboutUs">
            <p className="textHover text-sm md:text-base">About Us</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
