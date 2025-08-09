import React from "react";
import HomeSlider from "../components/core/HomePage/Slider/homeSlider";
import CourseDoors from "../components/core/HomePage/CourseDoors/courseDoors";
import StudentApply from "../components/core/HomePage/studentApply/studentApply";
import ImageLine from "../components/core/HomePage/ImageLine/imageLine"
import Summer from "../assets/ImageLine/Summer.webp"
import HomePrograme from "../components/core/HomePage/HomePrograme/homePrograme"
import NewsList from "../components/core/HomePage/News/news_List"
import Gate from "../assets/ImageLine/gate.jpg"
import Footer from "../components/Common/Footer/Footer"

function Home() {   
    return (
        <div className="overflow-x-hidden pt-[136px]">
            {/* Section 1 */}
            <div>
                {/* Home Slider */}
                <HomeSlider/>
            </div>

            {/* Section 2 */}
            <div>
              <CourseDoors/>
            </div>

            {/* Section 3 */}
            <div>
                <StudentApply/>
            </div>

            <div>
                <ImageLine
                    text={"Your Gift Is Someone’s Fresh Start"}
                    buttonText={"Give Now"}
                    LineImage={Summer}
                    LinkPage={"/give"}
                />
            </div>

            <div>
                <HomePrograme/>
            </div>

            <div>
                <NewsList/>
            </div>

            <div>
                <ImageLine
                    text={"Gateway to a brighter future."}
                    buttonText={"Apply"}
                    LineImage={Gate}
                    LinkPage={"/apply"}
                />
            </div>

            <div>
                <Footer/>
            </div>

        </div>
    );
}

export default Home;
