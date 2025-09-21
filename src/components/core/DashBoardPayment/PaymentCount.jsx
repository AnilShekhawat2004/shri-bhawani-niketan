import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io";
import { getPaymentCount } from "../../../services/operations/paymentAPI";

function PaymentCount() {
  const [counts, setCounts] = useState({
    amountCount: 0,
    donorCount: 0,
  });

  useEffect(() => {
    const fetchPaymentCount = async () => {
      const res = await getPaymentCount();
      if (res) {
        setCounts(res);
      }
    };
    fetchPaymentCount();
  }, []);

  return (
    <div className="flex flex-row gap-10">
      <div
        className="w-[20%] h-auto flex justify-between items-center bg-[linear-gradient(to_right,#2E8B57,#228B22,#006400)]
        shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5"
      >
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans text-white opacity-80">
            Total Donations
          </p>
          <div className="flex flex-row items-center text-[30px] font-bold font-m2 text-white">
            <FaRupeeSign className="text-[30px] text-white" />
            <p>{counts.amountCount}</p>
          </div>

          <div className="text-white flex items-center gap-1">
            <IoIosTrendingUp className="text-[20px]" />
            <p>+23% this month</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <FaRupeeSign className="text-white opacity-90 text-[30px] " />
        </div>
      </div>

      <div className="w-[20%] h-auto flex justify-between items-center bg-white shadow-lg border-[1px] border-gray-200 cursor-pointer rounded-lg pt-7 pb-7 pl-5 pr-5">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-sans">Total Donors</p>
          <p className=" text-[30px] font-bold font-m2">{counts.donorCount}</p>

          <div className="text-green-500 flex items-center gap-1">
            <IoIosTrendingUp className="text-[20px]" />
            <p>+12% new donors</p>
          </div>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-3 flex justify-center items-center">
          <FaUserGroup className="text-blue-500 text-[30px] " />
        </div>
      </div>
    </div>
  );
}
export default PaymentCount;
