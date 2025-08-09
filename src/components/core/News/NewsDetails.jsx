import React, { useEffect, useState } from 'react'
import Footer from "../../Common/Footer/Footer"
import { Link, useParams } from 'react-router-dom'
import { getAllNews, getRecentNews } from '../../../services/operations/newsAPI'

function NewsDetails() {
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);
  const { NewsId } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [recentData, setRecentData] = useState([]);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const res = await getAllNews();
        const selectedNews = res.find(item => item._id === NewsId);
        setNewsData(selectedNews);
      } catch (error) {
        console.error("Error in fetching news details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetails();
  }, [NewsId]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const res = await getRecentNews(NewsId);
        setRecentData(res);
      } catch (error) {
        console.error("Error in fetching recent news", error);
      } finally {
        setRecentLoading(false);
      }
    };
    fetchRecentNews();
  }, [NewsId]);

  if (loading || recentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!newsData) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="text-center text-bhawaniDark font-verdana font-bold text-[40px]">Error - News Not Found</div>
        <div className="w-[40%] bg-bhawaniYellow h-[2px]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-32 w-[85%] mx-auto">
        {/* Top separator */}
        <div className="w-full h-[2px] bg-bhawaniLight mb-10"></div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main News Details */}
          <div className="flex-1 flex flex-col gap-5">
            <p className="text-bhawaniDark font-bold font-m1 text-[50px]">{newsData.newsName}</p>

            <img src={newsData.newsImage} alt="News" loading='lazy' className="w-full lg:h-[500px] rounded-3xl object-cover" />

            <p className="font-verdana text-[20px] mt-5">{newsData.newsDescription}</p>

            <div className="bg-bhawaniYellow w-full h-[2px]"></div>

            <p className="text-bhawaniDark text-[22px]">
              Published on {new Date(newsData.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Recent News Sidebar */}
          <div className="lg:w-[30%] flex flex-col gap-6">
            <h3 className="text-bhawaniDark text-[28px] font-bold mb-4">Recent News</h3>
            {recentData.map((news) => (
              <Link key={news._id} to={`/news/${news._id}`}className="bg-[#f9f9f9] p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-700 hover:shadow-2xl cursor-pointer">
                <img src={news.newsImage} alt={news.newsName} className="h-40 w-full object-cover rounded-md mb-3" />
                <p className="text-lg font-semibold">{news.newsName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsDetails;
