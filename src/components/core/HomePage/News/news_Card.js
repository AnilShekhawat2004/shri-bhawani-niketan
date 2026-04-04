import { Link } from "react-router-dom";
import RButton from "../../../Common/Buttons/rButton";

const News_Card = ({ news }) => {
  // Limit description to X words
  const getLimitedDescription = (text, wordLimit = 20) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="group bg-bhawaniShine rounded-xl shadow-lg shadow-gray-300 
                    hover:shadow-xl hover:shadow-gray-400 transition-all duration-700
                    overflow-hidden flex flex-col h-full">
      {/* Image */}
      <img
        src={news?.image || "/fallback-image.webp"}
        alt={news?.newsName || "News Image"}
        loading="lazy"
        className="w-full aspect-[4/3] object-cover"
      />

      {/* Progress bar hover effect */}
      <div className="absolute bg-bhawaniDark w-0 h-[5px] group-hover:w-full transition-all duration-1000 ease-in-out" />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <p className="font-m1 text-bhawaniDark text-[18px] sm:text-[25px] md:text-[30px] lg:text-[35px] font-bold mb-2">
            {news?.newsName}
          </p>
          <p className="font-verdana text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">
            {getLimitedDescription(news?.newsDescription, 20)}
          </p>
        </div>

        <div className="mt-4">
          <Link to={news?._id ? `/news/${news._id}` : "#"}>
            <RButton
              text="Read more"
              className="text-white w-[120px] h-[50px] rounded-md"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News_Card;
