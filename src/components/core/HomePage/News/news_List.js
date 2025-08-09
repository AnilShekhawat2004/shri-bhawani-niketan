import React, { useEffect, useState } from 'react'
import { getAllNews } from '../../../../services/operations/newsAPI'
import { useSelector } from "react-redux"
import { MdDoubleArrow } from "react-icons/md";
import NewsCard from "./news_Card"
import { Link } from 'react-router-dom';

const NewsList = () => {
    const { loading } = useSelector((state) => state.profile)
    const [newsData, setNewsData] = useState(null)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getAllNews();

                // ✅ Only fix: ensure newsData is an array
                if (Array.isArray(res)) {
                    setNewsData(res);
                } else if (Array.isArray(res.news)) {
                    setNewsData(res.news);
                } else {
                    console.error("Invalid news data format", res);
                    setNewsData([]);
                }

            } catch (error) {
                console.log("Error fetching news", error);
                setNewsData([]);
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
                <div className="text-center text-bhawaniDark font-verdana font-bold lg:text-[40px] text-[30px]">Error-No News found</div>
                <div className="w-[40%] bg-bhawaniYellow h-[2px]"></div>
            </div>
        )
    }

    return (
        <div className="w-[85%] mx-auto flex flex-col lg:justify-start lg:items-start justify-center items-center">
            <Link to="/news" className="flex flex-row cursor-pointer">
                <p className="font-m2 font-semibold lg:text-[30px] text-[28px] text-bhawaniDark">Bhawani Niketan News</p>
                <MdDoubleArrow className="lg:text-[30px] text-[28px] translate-y-2 text-bhawaniDark" />
            </Link>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-center mt-10 mb-10">
                {newsData.slice(0, 3).map((news) => (
                    <NewsCard key={news._id} news={news} />
                ))}
            </div>
        </div>
    )
}

export default NewsList;
