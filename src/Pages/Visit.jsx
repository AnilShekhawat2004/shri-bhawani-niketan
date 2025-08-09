import React from 'react'
import LandingImage from '../components/Common/landingImage'
import RedBar from '../components/Common/redBar'
import Footer from '../components/Common/Footer/Footer'
import Dots from "../assets/ImageLine/Dots.png"
import VisitCollege from "../assets/College/Visit.png"
import TwoVisit from "../assets/Student/TwoVisit.jpg"
import Content from "../assets/Logo/ContentArea.svg"


function Visit() {
    return(
        <div>
            <LandingImage
                LineImage={VisitCollege}
                text={"Campus Tours"}
                className="absolute z-20"
                textClassName="text-[60px] text-center uppercase font-bold translate-y-9"
            />

            <RedBar
                className="absolute font-m1"
                text="Step into the vibrant world of our campus where energy, passion, and success come together to create an unforgettable experience!"
                textClassName="font-m1 text-center text-[28px]  flex justify-center translate-x-[150px] -translate-y-[20px]"
            />

            <div className="w-[100%] mx-auto h-full mt-32 flex flex-col items-center gap-5 justify-center">
                <p className="text-[45px] font-bold font-verdana text-center text-bhawaniDark">We can't wait to meet you.</p>
                <div className="w-[30%] h-[2px] bg-bhawaniYellow"></div>
                <p className="mt-5 text-[20px] font-verdana w-[60%] text-center">At Shri Bhawani Niketan College, discover a campus full of energy, creativity, and ambition where 
                students are empowered to excel, collaborate, and shape their futures with knowledge, passion, and purpose.</p>
                <img
                   src={Dots} 
                   alt="Dots"
                   loading='lazy'
                   className="w-[30px] mt-20"
                ></img>

                <div className="flex flex-row gap-20 w-[80%] h-auto items-center mt-32">
                    <img
                      src={TwoVisit}
                      alt="Student"
                      loading='lazy'
                      className="w-[50%] h-[350px] object-cover rounded-xl"
                    ></img>

                    <div className="flex flex-col gap-5 w-full">
                        <p className="text-[35px] text-bhawaniDark font-verdana font-bold">Individual Campus Tours</p>
                        <div className="w-[100px] h-[2px] bg-bhawaniYellow"></div>
                        <p className="text-[20px] font-verdana">Discover what Shri Bhawani Niketan College has to offer by 
                        exploring our vibrant campus! We’re excited to welcome you and 
                        your family or friends to experience the spirit of our institution. 
                        From dynamic academic programs and inspiring faculty to comfortable 
                        facilities and a culture rooted in excellence, there’s so much to see 
                        and feel. Come walk our grounds, connect with our community, and witness 
                        how we prepare students to thrive with confidence and purpose. Feel free 
                        to visit us anytime—we’re always happy to have you!</p>
                    </div>
                </div>

                <div className="relative w-full h-[350px] bg-bhawaniDark mt-32">
                    <img
                       src={Content}
                       alt="Content area"
                       className="absolute w-full h-full object-cover"
                    ></img>

                    <div className="absolute flex flex-col gap-8 z-10 justify-center items-center mt-10 ">
                        <p className="font-bold text-[45px] text-bhawaniYellow">Questions?</p>
                        <div className=" w-[200px] h-[2px] bg-bhawaniYellow"></div>
                        <p className="font-verdana text-[20px] text-white w-[55%] text-center">If you have questions about individual or group tours, please 
                        contact the Office of Admissions at sbnboyscollege@gmail.com or 
                        +91 141 2233863.</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Visit