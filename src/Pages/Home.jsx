import Gate from "../assets/ImageLine/gate.jpg";
import Summer from "../assets/ImageLine/Summer.webp";
import Footer from "../components/Common/Footer/Footer";
import CourseDoors from "../components/core/HomePage/CourseDoors/courseDoors";
import HomePrograme from "../components/core/HomePage/HomePrograme/homePrograme";
import ImageLine from "../components/core/HomePage/ImageLine/imageLine";
import NewsList from "../components/core/HomePage/News/news_List";
import HomeSlider from "../components/core/HomePage/Slider/homeSlider";
import StudentApply from "../components/core/HomePage/studentApply/studentApply";

function Home() {
  return (
    <div className="overflow-x-hidden xl:pt-[136px] lg:pt-[136px] md:pt-[136px] sm:pt-[70px] pt-[50px]">
      {/* Section 1 */}
      <div>
        {/* Home Slider */}
        <HomeSlider />
      </div>

      {/* Section 2 */}
      <div>
        <CourseDoors />
      </div>

      {/* Section 3 */}
      <div>
        <StudentApply />
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
        <HomePrograme />
      </div>

      <div>
        <NewsList />
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
        <Footer />
      </div>
    </div>
  );
}

export default Home;
