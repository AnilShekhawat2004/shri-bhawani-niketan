import React from 'react'
import Footer from '../components/Common/Footer/Footer'
import ContactUs from "../assets/College/Contact.png"
import ContactForm from '../components/core/Contact/ContactForm'
import { IoMdArrowForward } from "react-icons/io";
import RedBar from '../components/Common/redBar';
import LandingImage from "../components/Common/landingImage"


function Contact () {
    return (
        <div>
            <div className="relative">
                {/* Image */}
                <LandingImage 
                    LineImage={ContactUs}
                    text={"Contact Us"}
                    className="absolute z-20"
                    textClassName="text-[60px] "
                />

                <RedBar text="We look forward to hearing from you and would
                be happy to help you with general inquiries."
                  className="absolute font-semibold text-[36px] -translate-y-[15px] z-30"
                  textClassName="text-[35px] -translate-y-[35px]"
                />
            </div>

            {/* Contact Form and Map */}
            <div className="mt-28 flex flex-wrap justify-center gap-16 px-4">
                {/* Contact Form */}
                <div className="w-full max-w-2xl rounded-3xl hover:-translate-y-[15px] transition-all duration-700 hover:shadow-xl hover:shadow-gray-500">
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
                        <div className="font-m1 text-[35px] font-bold text-bhawaniDark flex flex-row items-center gap-3">
                           <p>We’re Just a Visit Away</p>
                           <IoMdArrowForward />
                        </div>
                        
                        <p className="text-[20px] w-[380px]">Maharao Shekha Circle (Chomu Pulia), Sikar Road, Jaipur - 302039</p>

                        <div className=" flex flex-row gap-4">
                           <div className="flex flex-row text-[20px] gap-2 items-center">
                               <p className="font-bold">Phone : </p>
                               <p>+91 141 2233863</p>
                           </div>

                           <div className="flex flex-row text-[20px] gap-2 items-center">
                               <p className="font-bold">Mail : </p>
                               <p>sbnboyscollege@gmail.com</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact
