import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPaymentDetails } from "../../../services/operations/paymentAPI";
import LoaderOverlay from "../../Common/LoaderOverlay";

function PaymentDetails() {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { paymentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOnePaymentDetails = async () => {
      try {
        const res = await getPaymentDetails(paymentId, token);
        setPaymentData(res);
        // if (res && res.length > 0) {
        //   setPaymentData(res);
        // }
      } catch (error) {
        console.error("Cannot get the payment details : ", error);
      } finally {
        setLoading(false);
      }
    };

    getOnePaymentDetails();
  }, [paymentId, token]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
        <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
          <h2 className="text-white text-3xl font-bold">Donor Details</h2>
          <p className="text-white text-md">
            Every contribution strengthens our school’s mission and future
            generations.
          </p>
        </div>
        <div className="pl-10 pr-10 pb-10 max-h-[80vh] overflow-y-auto hide-scrollbar scroll-smooth">
          <div>
            <p className="text-[14px]">Name</p>
            <div className="w-full flex gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white">
              <p>{paymentData.firstName}</p>
              <p>{paymentData.lastName}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Email</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{paymentData.email}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Contact number</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{paymentData.number}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Amount</p>
            <div className="w-full flex items-center text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <FaRupeeSign className="text-gray-600" />
              <p>{paymentData.amount}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Comment</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{paymentData.comment}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Order id</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{paymentData.razorpay_order_id}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Payment id</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{paymentData.razorpay_payment_id}</p>
            </div>
          </div>

          <div className="flex mt-4 justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="pl-6 pr-6 pt-3 pb-3 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-400 font-m2 transition-all duration-500 "
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      {loading > 0 && <LoaderOverlay/>}
    </div>
  );
}

export default PaymentDetails;
