import { Link } from "react-router-dom";
import Hover1 from "../../../../assets/Slider hover/Hover 1.png";
import Hover2 from "../../../../assets/Slider hover/Hover 2.jpg";
import Hover3 from "../../../../assets/Slider hover/Hover 3.webp";
import Hover4 from "../../../../assets/Slider hover/Hover 4.jpg";

const hoverItems = [
  {
    id: 1,
    img: Hover1,
    color: "bg-bhawaniRed",
    textColor: "text-white",
    topText: "Experiential Learning",
    bottomText: "Immerse Yourself",
    desc: "Go beyond the classroom. Dive into real-world experience and personal growth.",
    link: "/course",
  },
  {
    id: 2,
    img: Hover2,
    color: "bg-bhawaniBlue",
    textColor: "text-black",
    topText: "Our Story",
    bottomText: "Discover Our Story",
    desc: "Uncover the journey, vision, and passion that shape who we are.",
    link: "/aboutUs",
  },
  {
    id: 3,
    img: Hover3,
    color: "bg-white",
    textColor: "text-bhawaniRed",
    topText: "Reach Out",
    bottomText: "Stay Connected",
    desc: "Connect with us let’s start a conversation and make great things happen together.",
    link: "/contactUs",
  },
  {
    id: 4,
    img: Hover4,
    color: "bg-yellow-200",
    textColor: "text-black",
    topText: "Campus Life",
    bottomText: "Find Your Place",
    desc: "Join a vibrant and inclusive community of dynamic doers and creative thinkers.",
    link: "/campusLife",
  },
];

function BottomSection({ className }) {
  return (
    <div
      className={`flex flex-col lg:flex-row font-helvetica bg-white w-full lg:h-[0.2px] lg:translate-y-[110px] ${className}`}
    >
      {/* Left border only on lg */}
      <div className="hidden lg:block border-white border-r-[0.5px] w-[40px] h-[145px]" />

      {hoverItems.map((item) => (
        <Link
          to={item.link}
          key={item.id}
          className="group relative flex flex-col justify-center items-center w-full lg:w-[365px] h-[200px] lg:h-[144.2px] lg:border-white lg:border-r-[0.5px]"
        >
          <span
            className={`lg:absolute z-10 left-0 top-0 -translate-y-[55px] h-1 w-0 lg:transition-all lg:duration-700 lg:group-hover:w-[365px] ${item.color}`}
          ></span>

          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={item.img}
              alt={`Hover ${item.id}`}
              className="object-cover w-full h-full 
                lg:absolute lg:w-[365px] lg:h-[200px] lg:opacity-0 lg:transition-all lg:duration-[1s] lg:group-hover:opacity-100 lg:-translate-y-[27px]"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 z-10">
              <div className="flex flex-col justify-center items-center lg:group-hover:-translate-y-10 transition-all duration-500">
                <p
                  className={`absolute -translate-y-5 text-[13px] uppercase w-[180px] text-center ${item.color} ${item.textColor}`}
                >
                  {item.topText}
                </p>
                <p className="absolute translate-y-5 text-[30px] whitespace-nowrap text-white lg:text-inherit">
                  {item.bottomText}
                </p>
              </div>

              <p className="absolute opacity-0 translate-y-5 leading-tight text-center text-[15px] lg:group-hover:opacity-100 delay-150 lg:transition-all lg:duration-500">
                {item.desc}
              </p>
            </div>
          </div>
        </Link>
      ))}

      {/* Right border only on lg */}
      <div className="hidden lg:block w-[40px] h-[145px]" />
    </div>
  );
}

export default BottomSection;
