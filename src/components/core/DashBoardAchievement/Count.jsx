import { BsFillTrophyFill } from "react-icons/bs";
import { IoIosTrendingUp } from "react-icons/io";

function Count({ counts }) {
  return (
    <div className="flex flex-row gap-10">
      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Total Awards</p>
          <p className=" text-[30px] font-bold font-m2">
            {counts.achievementCount}
          </p>

          <div className="text-green-500 flex items-center gap-1">
            <IoIosTrendingUp className="text-[20px]" />
            <p>+5% this month</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <BsFillTrophyFill className="text-yellow-500 text-[30px] " />
        </div>
      </div>
    </div>
  );
}
export default Count;
