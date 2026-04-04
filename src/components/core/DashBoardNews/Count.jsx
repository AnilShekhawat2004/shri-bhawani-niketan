import { IoIosTrendingUp } from "react-icons/io";
import { LuNewspaper } from "react-icons/lu";

function Count({ counts }) {
  return (
    <div className="flex flex-row gap-10">
      <div className="w-[20%] h-auto flex justify-between items-center bg-orange-100 hover:bg-orange-200 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-orange-600 text-[16px] font-sans">
            Total Articles
          </p>
          <p className="text-orange-800 text-[30px] font-bold font-m2">
            {counts.newsCount}
          </p>
          <div className="w-[70%] h-[10px] rounded-xl bg-black"></div>
          <div className="flex justify-center items-center gap-1">
            <IoIosTrendingUp className="text-green-600 text-[20px]" />
            <p className="text-orange-600">
              <span className="text-green-600">100%</span> this month
            </p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center rounded-full bg-orange-600">
          <LuNewspaper className="text-white text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-green-100 hover:bg-green-200 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-green-600 text-[16px] font-sans">Published</p>
          <p className="text-green-800 text-[30px] font-bold font-m2">
            {counts.publishedCount}
          </p>
          <div className="w-[70%] h-[10px] rounded-xl bg-black"></div>
          <p className="text-green-600">
            <span className="text-green-600">89%</span> Published
          </p>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center rounded-full bg-green-600">
          <LuNewspaper className="text-white text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-yellow-100 hover:bg-yellow-200 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-yellow-600 text-[16px] font-sans">
            Draft Articles
          </p>
          <p className="text-yellow-800 text-[30px] font-bold font-m2">
            {counts.draftCount}
          </p>
          <div className="w-[70%] h-[10px] rounded-xl bg-black"></div>
          <p className="text-yellow-600">
            <span className="text-yellow-600">11%</span> pending
          </p>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center rounded-full bg-yellow-600">
          <LuNewspaper className="text-white text-[30px] " />
        </div>
      </div>
    </div>
  );
}

export default Count;
