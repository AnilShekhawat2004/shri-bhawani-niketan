import { IoIosTrendingUp } from "react-icons/io";
import { RiGroupLine } from "react-icons/ri";

function Count({counts}) {
  return (
    <div className="flex flex-row gap-10">
      <div className="w-[20%] h-auto flex justify-between items-center bg-blue-100 hover:bg-blue-200 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-blue-600 text-[16px] font-sans">
            Total Department
          </p>
          <p className="text-blue-800 text-[30px] font-bold font-m2">
            {counts.teachCategoryCount}
          </p>
          <div className="w-[70%] h-[10px] rounded-xl bg-black"></div>
          <p className="text-blue-600">
            <span className="text-blue-600">100%</span> active
          </p>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center rounded-full bg-blue-600">
          <RiGroupLine className="text-white text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-yellow-100 hover:bg-yellow-200 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-yellow-600 text-[16px] font-sans">Total Faculty</p>
          <p className="text-yellow-800 text-[30px] font-bold font-m2">
            {counts.teacherSectionCount}
          </p>
          <div className="w-[70%] h-[10px] rounded-xl bg-black"></div>
          <div className="flex justify-center items-center gap-1  ">
            <IoIosTrendingUp className="text-green-600 text-[20px]" />
            <p className="text-yellow-600">
              <span className="text-green-600">+7.5%</span> active
            </p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center rounded-full bg-yellow-600">
          <RiGroupLine className="text-white text-[30px] " />
        </div>
      </div>
    </div>
  );
}

export default Count;
