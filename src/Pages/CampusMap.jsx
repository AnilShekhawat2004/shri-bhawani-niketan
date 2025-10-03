import Map from "../assets/College/Map.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function CampusMap() {
  return (
    <div>
      <LandingImage
        LineImage={Map}
        text={"Campus Map"}
        className="absolute z-20"
        textClassName="text-[60px] text-center uppercase font-bold"
      />

      <RedBar
        className="absolute font-m1"
        text="No confusion, just connection reach any building, block, or department in seconds with our campus map"
        textClassName="font-m1 text-center text-[28px]  flex justify-center translate-x-[150px] -translate-y-[20px]"
      />

      <div className="w-[80%] mx-auto mt-32 gap-3 flex flex-col items-center justify-center">
        <p className="font-verdana text-center text-[35px] text-bhawaniDark font-bold ">
          Find your way to the future start here!
        </p>

        <div className="w-[65%] h-[2px] bg-bhawaniYellow"></div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.6485678501526!2d75.76822847527282!3d26.946353476627195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3a4bf0545a3%3A0x957aadce59c85bb!2sShri%20Bhawani%20Niketan%20P.G.%20Boys%20College!5e0!3m2!1sen!2sin!4v1746024083629!5m2!1sen!2sin"
          className="w-full lg:h-[500px] border-0 mt-32"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Campus map"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
}

export default CampusMap;
