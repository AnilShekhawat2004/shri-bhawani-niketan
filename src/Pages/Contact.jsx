import { IoMdArrowForward } from "react-icons/io";
import ContactUs from "../assets/College/Contact.png";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import ContactForm from "../components/core/Contact/ContactForm";

function Contact() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        {/* Image */}
        <LandingImage
          LineImage={ContactUs}
          text={"Contact Us"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[50px] lg:text-[60px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="We look forward to hearing from you and would be happy to help you with general inquiries."
            textClassName="font-m1 text-center text-[16px] sm:text-[22px] md:text-[24px] lg:text-[28px] px-4"
          />
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="xl:mt-[140px] lg:mt-[140px] md:mt-28 sm:mt-24 mt-20 flex flex-wrap justify-center gap-16 px-4">
        {/* Contact Form */}
        <div className="w-full max-w-2xl rounded-3xl  transition-all duration-700 hover:shadow-xl hover:shadow-gray-500">
          <ContactForm />
        </div>

        {/* Google Map */}
        <div className="w-full max-w-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.645719310046!2d75.77311160876502!3d26.94644374661859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3a4bf0545a3%3A0x957aadce59c85bb!2sShri%20Bhawani%20Niketan%20P.G.%20Boys%20College!5e0!3m2!1sen!2sin!4v1745170084396!5m2!1sen!2sin"
            width="600"
            height="450"
            className="border-0 rounded-3xl w-full shadow-md shadow-gray-400 
                                 hover:-translate-y-[15px] transition-all duration-700 hover:shadow-xl hover:shadow-gray-500"
            allowfullscreen=""
            loading="lazy"
            title="Map view"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="mt-14 ml-5 flex flex-col gap-5">
            <div className="font-m1 xl:text-[35px] lg:text-[30px] text-[25px] font-bold text-bhawaniDark flex flex-row items-center gap-3">
              <p>We’re Just a Visit Away</p>
              <IoMdArrowForward />
            </div>

            <p className="xl:text-[20px] lg:text-[20px] md:text-[18px] text-[16px] xl:w-[380px] lg:w-[380px] md:w-[300px] w-[200px]">
              Maharao Shekha Circle (Chomu Pulia), Sikar Road, Jaipur - 302039
            </p>

            <div className=" flex xl:flex-row lg:flex-row flex-col gap-4">
              <div className="flex flex-row xl:text-[20px] lg:text-[20px] md:text-[18px] text-[16px] gap-2 items-center">
                <p className="font-bold">Phone : </p>
                <p>+91 141 2233863</p>
              </div>

              <div className="flex flex-row xl:text-[20px] lg:text-[20px] md:text-[18px] text-[16px] gap-2 items-center">
                <p className="font-bold">Mail : </p>
                <p>sbnboyscollege@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
