import { useEffect, useState } from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { PiBookOpenBold } from "react-icons/pi";
import { getCategoryProgramCount, getCourseCounts } from "../../../services/operations/courseAPI";

function Count() {
  const [counts, setCounts] = useState({
    courseCount: 0,
    ProgramCount: 0,
  });

  useEffect(() => {
    const fetchCount = async () => {
      const res = await getCourseCounts();
      if (res) {
        setCounts((prev) => ({ ...prev, courseCount: res.courseCount }));
      }
    };
    fetchCount();
  }, []);

  useEffect(() => {
    const fetchProgramCount = async () => {
      const res = await getCategoryProgramCount();
      if (res) {
        setCounts((prev) => ({ ...prev, ProgramCount: res.ProgramCount }));
      }
    };
    fetchProgramCount();
  }, []);

  return (
    <div className="flex flex-row gap-10">
      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Total Degree Program</p>
          <p className="text-green-600 text-[30px] font-bold font-m2">
            {counts.ProgramCount}
          </p>

          <div className="text-green-500 flex items-center gap-1">
            <IoIosTrendingUp className="text-[20px]" />
            <p>+10% this year</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <PiBookOpenBold className="text-green-600 text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Total Courses</p>
          <p className="text-blue-600 text-[30px] font-bold font-m2">
            {counts.courseCount}
          </p>

          <div className="text-blue-500 flex items-center gap-1">
            <IoIosTrendingUp className="text-[20px]" />
            <p>+5% this Semester</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <PiBookOpenBold className="text-blue-600 text-[30px] " />
        </div>
      </div>
    </div>
  );
}
export default Count;
