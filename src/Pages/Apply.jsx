import React from "react";
import ApplyImage from "../assets/Student/apply.jpeg"
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import ContentArea from "../assets/Logo/ContentArea.svg"
import Footer from "../components/Common/Footer/Footer";
import YButton from "../components/Common/Buttons/yButton";
import { Link } from 'react-router-dom'
import Dots from "../assets/ImageLine/Dots.png"
import AboutUs from "../assets/College/SkyViewSbn.png"
import SButton from "../components/Common/Buttons/sButton";
function Apply () {
    return(
        <div>
            <div>
                <LandingImage
                LineImage={ApplyImage}
                text="Belong to a community where you matter"
                className="absolute z-20"
                textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
                />
                <RedBar
                className="absolute font-m1"
                textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
                text="Step into a space where learning meets purpose. At our college, you don’t just apply you claim your place in a community driven by growth, values, and opportunity."
                />

                <div className="w-full h-auto mx-auto mt-32 flex flex-col items-center gap-10">
                    <p className="w-[50%] text-[45px] font-verdana font-bold text-bhawaniDark text-center">A Community Waiting to Welcome You</p>
                    <div className="bg-bhawaniYellow w-[60%] h-[2px]"></div>

                    <p className="font-verdana text-center text-[20px] w-[55%]">At Shri Bhawani Niketan College, we believe every journey begins with curiosity. 
                    If you're interested in joining us or have questions about admission, just drop your 
                    details below. Though the admission process takes place offline, we’ll personally 
                    reach out to help you with the next steps.</p>

                    <Link to={"/contactUs"} className="w-[40%]">
                        <YButton className="w-full">{"Apply Now"}</YButton>
                    </Link>

                    <img
                      src={Dots}
                      alt="Dots"
                      loading="lazy"
                      className="w-[30px] h-[150px] mt-10"
                    ></img>

                    <div className="w-[85%] flex flex-row mt-10 justify-center items-center gap-10">
                        <div className="w-[40%] lg:h-[400px] bg-white flex justify-center items-center shadow-2xl">
                            <img
                              src={AboutUs}
                              alt="AboutUs"
                              loading="lazy"
                              className="w-[90%] h-[320px] object-cover"
                            ></img>
                        </div>

                        <div className="w-[40%] h-[280px] bg-gray-100 flex flex-col items-center gap-5 justify-center shadow-xl">
                            <div className="w-full flex flex-col gap-2 justify-center items-center">
                                <p className="font-m1 text-bhawaniDark text-[35px] font-bold">Our Legacy, Your Future</p>
                                <div className="bg-bhawaniYellow w-[70%] h-[2px] "></div>
                            </div>

                            <p className="font-verdana text-[17px] w-[90%] text-center">Want to know us better before you apply? Dive into our story, 
                            explore our campus spirit, and see why students proudly call Shri 
                            Bhawani Niketan College their second home.</p>

                            <Link to={"/aboutUs"}>
                                <SButton>{"Learn Now"}</SButton>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full h-[400px] overflow-hidden relative mt-32 bg-bhawaniDark flex justify-center items-center">
                        <img
                           src={ContentArea}
                           alt="ContentArea"
                           loading="lazy"
                           className="w-[100%] h-[550px] absolute"
                        ></img>

                        <div className="absolute z-10 flex flex-col items-center justify-center gap-5">
                            <p className="text-white font-bold font-m1 text-[40px]">Questions?</p>
                            <div className="w-[20%] h-[2px] bg-bhawaniYellow"></div>

                            <p className="w-[52%] text-white font-verdana text-[22px] text-center ">Need help or have questions? Our admission counselor is here to assist you. 
                            Reach out at sbnboyscollege@gmail.com or call us at +91 141 2233863.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Apply