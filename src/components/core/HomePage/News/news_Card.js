import React from 'react';
import { Link } from 'react-router-dom';
import RButton from '../../../Common/Buttons/rButton';

const News_Card = ({ news }) => {
  const getLimitedDescription = (text, wordLimit = 20) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="lg:w-full lg:max-w-[500px] w-[400px] group relative bg-bhawaniShine rounded-md shadow-lg shadow-gray-300 
         hover:shadow-xl hover:shadow-gray-400 transition-all duration-700 overflow-hidden
         hover:-translate-y-3">
      <div>
        <img
          src={news?.image}
          alt={news?.newsName}
          loading="lazy"
          className="h-[250px] w-full object-cover"
        />
      </div>

      <div className="absolute bg-bhawaniDark w-0 h-[5px] group-hover:w-full transition-all duration-[1s] ease-in-out -translate-y-[4.5px]" />

      <div className=" flex flex-col pt-2 pl-4 pb-7 gap-5 min-h-[300px]">
        <p className="text-[32px] md:text-[40px] font-m1 text-bhawaniDark">
          {news?.newsName}
        </p>
        <p className="font-verdana text-[16px] md:text-[20px]">
          {getLimitedDescription(news?.newsDescription, 20)}
        </p>

        <Link to={`/news/${news._id}`}>
          <RButton text="Read more" className="text-white w-[150px] h-[50px] rounded-md" />
        </Link>
      </div>
    </div>
  );
};

export default News_Card;