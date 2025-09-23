import { useEffect, useState } from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getContactCounts } from "../../../services/operations/contactUs";

function Count() {
  const [counts, setCounts] = useState({
    ContactCount: 0,
    PendingContactCount: 0,
    ResolvedContactCount: 0,
  });

  useEffect(() => {
    const fetchContactCounts = async () => {
      const res = await getContactCounts();
      if (res) {
        setCounts(res);
      }
    };
    fetchContactCounts();
  }, []);

  return (
    <div className="flex flex-row gap-10">
      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Total Inquiries</p>
          <p className=" text-[30px] font-bold font-m2">
            {counts.ContactCount}
          </p>

          <div className="text-green-500 flex items-center gap-1">
            <IoIosTrendingUp className="text-[20px]" />
            <p>+15% this month</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <IoIosMail className="text-blue-800 text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Pending</p>
          <p className=" text-[30px] font-bold font-m2">
            {counts.PendingContactCount}
          </p>

          <div className="flex items-center gap-1">
            <p>Awaiting response</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <MdOutlineWatchLater className="text-orange-600 text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Resolved</p>
          <p className=" text-[30px] font-bold font-m2">
            {counts.ResolvedContactCount}
          </p>

          <div className="flex items-center gap-1">
            <p>82% resolution rate</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <IoMdCheckmarkCircleOutline className="text-green-500 text-[30px] " />
        </div>
      </div>
    </div>
  );
}

export default Count;
