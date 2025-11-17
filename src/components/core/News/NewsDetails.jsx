import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAllNews,
  getRecentNews,
} from "../../../services/operations/newsAPI";
import Footer from "../../Common/Footer/Footer";

function NewsDetails() {
  const [loading, setLoading] = useState(0);
  const { NewsId } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [recentData, setRecentData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const BackUpto = ["/dashboard/news"].some((path) =>
    location.pathname.includes(path)
  );

  useEffect(() => {
    const fetchNewsDetails = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllNews();
        const selectedNews = res.find((item) => item._id === NewsId);
        setNewsData(selectedNews);
      } catch (error) {
        console.error("Error in fetching news details", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };
    fetchNewsDetails();
  }, [NewsId, BackUpto]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getRecentNews(NewsId);
        let filteredRecentData = BackUpto
          ? res.slice(4)
          : res.filter((item) => item.status.includes("Published")).slice(3);
        let limitedRecentData = filteredRecentData.slice(0, 3);
        setRecentData(limitedRecentData);
      } catch (error) {
        console.error("Error in fetching recent news", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };
    fetchRecentNews();
  }, [NewsId, BackUpto]);

  if (loading > 0) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!newsData) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="text-center text-bhawaniDark font-verdana font-bold text-[40px]">
          Error - News Not Found
        </div>
        <div className="w-[40%] bg-bhawaniYellow h-[2px]"></div>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className={
          BackUpto
            ? "absolute z-50 flex gap-2 justify-center items-center px-4 py-3 bg-bhawaniRed shadow-md rounded-lg -translate-y-[60px] translate-x-[120px] cursor-pointer"
            : "hidden"
        }
      >
        <FaArrowLeft className=" text-white" />
        <p className="text-white">Back To Dashboard</p>
      </div>

      <div className="xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20 xl:w-[85%] lg:w-[85%] md:w-[90%] w-[100%] mx-auto">
        {/* Top separator */}
        <div className="w-full xl:h-[2px] lg:h-[2px] md:h-[2px] h-[1px] bg-bhawaniLight mb-10"></div>

        <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row gap-10">
          {/* Main News Details */}
          <div className="flex-1 flex flex-col gap-5 mx-5">
            <p className="text-bhawaniDark font-bold font-m1 xl:text-[50px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[20px]">
              {newsData.newsName}
            </p>

            <img
              src={newsData.image}
              alt="News"
              loading="lazy"
              className="w-full xl:h-[500px] lg:h-[500px] rounded-3xl object-cover"
            />

            <p className="font-verdana xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] mt-5">
              {newsData.newsDescription}
            </p>

            <div className="bg-bhawaniYellow w-full xl:h-[2px] lg:h-[2px] md:h-[2px] h-[1px]"></div>

            <p className="text-bhawaniDark xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]">
              Published on{" "}
              {new Date(newsData.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Recent News Sidebar */}
          <div className="xl:w-[30%] lg:w-[30%] md:w-[40%] sm:w-[60%] flex flex-col gap-6 mx-5">
            <h3 className="text-bhawaniDark xl:text-[28px] lg:text-[28px] md:text-[25px] text-[20px] font-bold mb-4">
              Recent News
            </h3>
            {recentData.map((news) => (
              <Link
                key={news._id}
                to={`/news/${news._id}`}
                className="bg-[#f9f9f9] p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-700 hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={news.image}
                  alt={news.newsName}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />
                <p className="xl:text-lg lg:text-lg md:text-base text-sm font-semibold">{news.newsName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {!BackUpto && <Footer />}
    </div>
  );
}

export default NewsDetails;
