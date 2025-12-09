import Map from "../assets/College/Map.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function CampusMap() {
  return (
    <div className="overflow-x-hidden">
      {/* Landing Section */}
      <div className="relative">
        <LandingImage
          LineImage={Map}
          text="Campus Map"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[50px] lg:text-[60px] text-center uppercase font-bold"
        />

        {/* Red Info Bar overlapping the LandingImage */}
        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="No confusion, just connection! Reach any building, block, or department in seconds with our campus map."
            textClassName="font-m1 text-center text-[12px] sm:text-[22px] md:text-[24px] lg:text-[28px] xs:pt-[1px] px-4"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[90%] sm:w-[85%] lg:w-[80%] mx-auto mt-16 sm:mt-24 lg:mt-32 flex flex-col items-center justify-center gap-6">
        <p className="font-verdana text-center text-[22px] sm:text-[27px] lg:text-[35px] text-bhawaniDark font-bold">
          Find your way, your future starts here!
        </p>

        <div className="w-[65%] h-[2px] bg-bhawaniYellow"></div>

        {/* Google Map */}
        <div className="w-full overflow-hidden mt-16 sm:mt-16 lg:mt-24">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.6485678501526!2d75.76822847527282!3d26.946353476627195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3a4bf0545a3%3A0x957aadce59c85bb!2sShri%20Bhawani%20Niketan%20P.G.%20Boys%20College!5e0!3m2!1sen!2sin!4v1746024083629!5m2!1sen!2sin"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Campus map"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CampusMap;
