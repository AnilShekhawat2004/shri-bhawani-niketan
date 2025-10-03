import Trust from "../assets/College/Trustess.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function Trustees() {
  return (
    <div>
      <LandingImage
        LineImage={Trust}
        text={"Trustees"}
        className="absolute z-20"
        textClassName="text-[60px] text-center uppercase font-bold"
      />

      <RedBar
        className="absolute font-m1"
        text="Meet the guardians of our legacy our trustees ensure every step forward is rooted in excellence, transparency, and progress."
        textClassName="font-m1 text-center text-[28px]  flex justify-center translate-x-[150px] -translate-y-[20px]"
      />

      <div className="w-[80%] h-full mx-auto mt-32 flex flex-col justify-center items-center gap-5">
        <p className="font-verdana text-center text-[35px] text-bhawaniDark font-bold">
          Board of Trustees
        </p>

        <div className="w-[65%] h-[2px] bg-bhawaniYellow"></div>

        <div className="grid grid-cols-3 mt-20 gap-10">
          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Nagendra Singh Bagar
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              President
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Mahendra Singh Jeslan
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Vice President
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Sudarshan Singh Surpura
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Secretary
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Jalim Singh Hudil
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Joint Secretary
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Dr. Abhay Singh Rathore
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Education Advisor
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Shyam Singh Manda
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Treasurer
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Jalim Singh Aaspura
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Executive Member
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Dilip Singh Chhapoli
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Executive Member
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Gulab Singh Mertia
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Executive Member
            </p>
          </div>

          <div
            className="flex flex-col gap-3 group border items-center justify-center 
                    border-gray-500 pl-5 pr-2 pt-5 pb-5 hover:bg-bhawaniDark2 hover:border-bhawaniYellow 
                    transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:border-[3px]"
          >
            <p className="text-[22px] font-bold text-gray-400 font-verdana group-hover:text-white transition-all duration-700">
              Sh. Sampat Singh Dhamora
            </p>
            <p className="text-[18px] text-gray-400 font-m1 group-hover:text-white transition-all duration-700">
              Executive Member
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Trustees;
