import Trust from "../assets/College/Trustess.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

const TrusteesData = [
  {
    id: 1,
    name: "Sh. Nagendra Singh Bagar",
    post: "President",
  },
  {
    id: 2,
    name: "Sh. Mahendra Singh Jeslan",
    post: "Vice President",
  },
  {
    id: 3,
    name: "Sh. Sudarshan Singh Surpura",
    post: "Secretary",
  },
  {
    id: 4,
    name: "Sh. Jalim Singh Hudil",
    post: "Joint Secretary",
  },
  {
    id: 5,
    name: "Dr. Abhay Singh Rathore",
    post: "Education Advisor",
  },
  {
    id: 6,
    name: "Sh. Shyam Singh Manda",
    post: "Treasurer",
  },
  {
    id: 7,
    name: "Sh. Jalim Singh Aaspura",
    post: "Executive Member",
  },
  {
    id: 8,
    name: "Sh. Dilip Singh Chhapoli",
    post: "Executive Member",
  },
  {
    id: 9,
    name: "Sh. Gulab Singh Mertia",
    post: "Executive Member",
  },
  {
    id: 10,
    name: "Sh. Sampat Singh Dhamora",
    post: "Executive Member",
  },
]

function Trustees() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={Trust}
          text={"Trustees"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-[400px]"
          textClassName="text-[30px] sm:text-[50px] lg:text-[60px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="Meet the guardians of our legacy our trustees ensure every step forward is rooted in excellence, transparency, and progress."
            textClassName="font-m1 text-center text-[12px] sm:text-[22px] md:text-[24px] lg:text-[28px] xs:pt-[1px] px-4"
          />
        </div>
      </div>

      <div className="w-[80%] h-full mx-auto xl:mt-32 lg:mt-32 md:mt-24 mt-20 flex flex-col justify-center items-center gap-5">
        <p className="font-verdana text-center text-[35px] xs:text-[25px] text-bhawaniDark font-bold">
          Board of Trustees
        </p>

        <div className="w-[65%] h-[2px] bg-bhawaniYellow"></div>

        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 xl:mt-20 lg:mt-20 md:mt-14 mt-10 gap-10">

          {TrusteesData.map((item) => (
            <div
            key={item.id}
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              {item.name}
            </p>
            <p className="xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[14px] xs:text-[13px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              {item.post}
            </p>
          </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Trustees;
