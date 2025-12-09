import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/SbnLogo.png";
import "./Footer.css";

function Footer() {
  const MediaLinks = [
    {
      id: 1,
      icon: <FaFacebookF />,
      ariaLabel: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      id: 2,
      icon: <BsInstagram />,
      ariaLabel: "Instagram",
      link: "https://www.instagram.com/",
    },
    {
      id: 3,
      icon: <TfiLinkedin />,
      ariaLabel: "LinkedIn",
      link: "https://www.linkedin.com/",
    },
    {
      id: 4,
      icon: <ImYoutube />,
      ariaLabel: "YouTube",
      link: "https://www.youtube.com/",
    },
    {
      id: 5,
      icon: <FaXTwitter />,
      ariaLabel: "Twitter",
      link: "https://twitter.com/",
    },
  ];

  const Colum1 = [
    {
      id: 1,
      label: "Maharao Shekha Circle (Chomu Pulia), Sikar Road, Jaipur - 302039",
    },
    { id: 2, label: "+91 141 2233863" },
    { id: 3, label: "sbnboyscollege@gmail.com" },
    { id: 4, label: "Campus Map", link: "/campus-map" },
  ];

  const Colum2 = [
    { id: 1, label: "Employment at Bhawani", link: "/employment" },
    { id: 2, label: "Faculty & Staff", link: "/staff" },
    { id: 3, label: "Trustees", link: "/trustees" },
    { id: 4, label: "Privacy Policy", link: "/privacy-policy" },
    { id: 5, label: "Contact Us", link: "/contactUs" },
  ];

  const Colum3 = [
    { id: 1, label: "Academic Programmes", link: "/course" },
    { id: 2, label: "Campus Life", link: "/campusLife" },
    {
      id: 3,
      label: "Harassment/Discrimination Policy",
      link: "/harassment-policy",
    },
    { id: 4, label: "Events", link: "/events" },
    { id: 5, label: "About Us", link: "/aboutUs" },
  ];

  return (
    <div className="bg-bhawaniDark lg:h-auto w-[100vw] mt-32 px-6 md:px-10 lg:px-[120px] xl:px-[120px] pb-12 flex flex-col lg:flex-row max-[1080px]:!flex-col  justify-center lg:text-start text-center items-center lg:items-start max-[1080px]:!items-center gap-14 lg:gap-[6%]">
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
            className="w-[170px] h-[160px] md:w-[200px] md:h-[190px] lg:w-[230px] lg:h-[220px]"
          />
        </Link>

        <div className="flex flex-row gap-5 lg:gap-8 text-[22px] md:text-[26px] lg:text-[28px] text-white">
          {MediaLinks.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="yellowHover"
              aria-label={item.ariaLabel}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="pt-6 lg:pt-14 font-verdana text-white flex flex-col md:flex-row gap-10 md:gap-[clamp(2rem,4vw,4rem)]">
        {/* Column 1 */}
        <div className="flex flex-col w-full md:w-[200px] gap-4 md:gap-6 lg:gap-7">
          {Colum1.map((item) => (
            <Link to={item.link} key={item.id}>
              <p className="textHover text-sm md:text-base">{item.label}</p>
            </Link>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col w-full md:w-[200px] gap-4 md:gap-6 lg:gap-7">
          {Colum2.map((item) => (
            <Link to={item.link} key={item.id}>
              <p className="textHover text-sm md:text-base">{item.label}</p>
            </Link>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col w-full md:w-[270px] gap-4 md:gap-6 lg:gap-7">
          {Colum3.map((item) => (
            <Link to={item.link} key={item.id}>
              <p className="textHover text-sm md:text-base">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
