import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import NewsPaper from "../assets/News/News.webp";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import NewsCard from "../components/core/HomePage/News/news_Card";
import { getAllNews } from "../services/operations/newsAPI";

function News() {
  const [loading, setLoading] = useState(true)
  const [newsData, setNewsData] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNews();
        let filteredData = res.filter((item) =>
          item.status.includes("Published")
        );
        setNewsData(filteredData);
        setLoading(false)
      } catch (error) {
        console.log("Error fetching news", error);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!loading && newsData.length === 0) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="text-center text-bhawaniDark font-verdana font-bold text-[40px]">
          Error - No News Found
        </div>
        <div className="w-[40%] bg-bhawaniYellow h-[2px]"></div>
      </div>
    );
  }

  const visibleNews = showAll ? newsData : newsData.slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={NewsPaper}
          text="Bhawani News"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[25px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 sm:translate-y-10 md:translate-y-16 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="Stay informed, stay inspired Bhawani News brings you the latest achievements, events, and stories that celebrate the spirit, talent, and unstoppable energy of our vibrant college community."
            textClassName="font-m1 text-center text-[11px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[5px]"
          />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mx-auto">
        <div className="xl:w-[85%] lg:w-[85%] md:w-[85%] sm:w-[90%] w-[100%] mx-auto xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20">
          <p className="text-bhawaniDark xl:text-[50px] lg:text-[50px] md:text-[40px] sm:text-[25px] text-[20px] text-center font-extrabold">
            Newsroom
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 place-items-center gap-10 mx-auto px-8 md:px-0 lg:px-0">
            {visibleNews.map((news) => (
              <NewsCard key={news._id} news={news} className="h-full"/>
            ))}
          </div>

          {!showAll && newsData.length > 6 && (
            <div className="flex justify-center xl:mt-20 lg:mt-20 md:mt-20 sm:mt-10 mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="xl:text-[16px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] px-6 py-4 bg-bhawaniLight text-bhawaniDark font-semibold 
                            rounded-full shadow-lg hover:bg-gray-300 transition-all duration-700 font-verdana flex justify-center 
                            items-center gap-1 hover:scale-110"
              >
                View All News
                <IoIosArrowDown className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-center font-bold" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default News;
