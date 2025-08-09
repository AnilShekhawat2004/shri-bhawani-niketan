import React, { useEffect, useState } from 'react'
import LandingImage from '../components/Common/landingImage'
import RedBar from '../components/Common/redBar'
import Footer from '../components/Common/Footer/Footer'
import NewsCard from '../components/core/HomePage/News/news_Card'
import NewsPaper from "../assets/News/News.webp"
import { getAllNews } from '../services/operations/newsAPI'
import { useSelector } from "react-redux"
import { IoIosArrowDown } from "react-icons/io";


function News () {
    const {loading} = useSelector((state) => state.profile)
    const [newsData, setNewsData] = useState(null)
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getAllNews()
                setNewsData(res)
            } catch(error) {
                console.log("Error fetching news", error)
            }
        }
        fetchNews()
    }, [])

    if (loading || !newsData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="loader"></div>
            </div>
        )
    }

    if (!loading && newsData.length === 0) {
        return (
            <div className="flex flex-col gap-3 items-center">
                <div className="text-center text-bhawaniDark font-verdana font-bold text-[40px]">Error - No News Found</div>
                <div className="w-[40%] bg-bhawaniYellow h-[2px]"></div>
            </div>
        )
    }

    const visibleNews = showAll ? newsData : newsData.slice(0, 6)

    return (
        <div>
            <LandingImage
                LineImage={NewsPaper}
                text="Bhawani News"
                className="absolute z-20"
                textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
            />
            <RedBar
                className="absolute font-m1"
                textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
                text="Stay informed, stay inspired Bhawani News brings you the latest achievements, events, and stories that celebrate the spirit, talent, and unstoppable energy of our vibrant college community."
            />

            <div className="w-[85%] mx-auto mt-32">
                <p className="text-bhawaniDark text-[50px] font-extrabold">Newsroom</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-10">
                    {visibleNews.map((news) => (
                        <NewsCard key={news._id} news={news} />
                    ))}
                </div>

                {!showAll && newsData.length > 6 && (
                    <div className="flex justify-center mt-20">
                        <button
                            onClick={() => setShowAll(true)}
                            className="w-[250px] h-[60px] px-6 py-3 bg-bhawaniLight text-bhawaniDark font-semibold 
                            rounded-full shadow-lg hover:bg-gray-300 transition-all duration-700 font-verdana flex justify-center 
                            items-center gap-1 hover:scale-110"
                        >
                            View All News
                            <IoIosArrowDown className="text-[20px] text-center font-bold" />
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default News
