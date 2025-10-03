import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getContactDetails } from "../../../services/operations/contactUs";

function ContactDetails() {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { contactId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getContactUsDetails = async () => {
      try {
        const res = await getContactDetails(contactId, token);
        setContactData(res);
      } catch (error) {
        console.error("Cannot get the contact details : ", error);
      } finally {
        setLoading(false);
      }
    };

    getContactUsDetails();
  }, [contactId, token]);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
        <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
          <h2 className="text-white text-3xl font-bold">Inquiry Details</h2>
          <p className="text-white text-md">
            Your voice matters. Reach out and be part of our journey
          </p>
        </div>
        <div className="pl-10 pr-10 pb-10 flex flex-col gap-2 max-h-[80vh] overflow-y-auto hide-scrollbar scroll-smooth">
          <div>
            <p className="text-[14px]">Name</p>
            <div className="w-full flex gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white">
              <p>{contactData.firstName}</p>
              <p>{contactData.lastName}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Email</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.email}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Contact number</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.contactNumber}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">City</p>
            <div className="w-full flex items-center text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.city}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">State</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.state}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Pincode</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.pincode}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Subject</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.subject}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Inquiry</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.inquiry}</p>
            </div>
          </div>

          <div>
            <p className="text-[14px]">Status</p>
            <div className="w-full flex text-gray-700 border border-gray-300 rounded-lg px-4 py-2 bg-white ">
              <p>{contactData.status}</p>
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
    </div>
  );
}

export default ContactDetails;
