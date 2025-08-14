import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiconnector";
import { teacherEndpoints } from "../../../services/apis";
import { getAllSubSections } from "../../../services/operations/teacherAPI";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Error from "../../../Pages/Error";

const TeacherResume = () => {
  const [loading, setLoading] = useState(true);
  const [teachSectionDetails, setTeachSectionDetails] = useState(null);
  const [teachSubData, setTeachSubData] = useState([]);
  const location = useLocation();

  const { teachId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionRes = await apiConnector(
          "GET",
          teacherEndpoints.GET_ALL_SECTION_API
        );
        const section = sectionRes?.data?.data?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === teachId
        );

        if (!section) throw new Error("Section not found");

        setTeachSectionDetails(section);

        const subSectionRes = await getAllSubSections(section._id);
        const filtered = subSectionRes.filter((item) =>
          item.teacherSection.includes(section._id)
        );

        setTeachSubData(filtered);
      } catch (error) {
        console.error("Error fetching teacher resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teachId]);

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );

  if (!teachSubData.length) {
    if (location.pathname.includes("/dashboard/faculty")) {
      toast.error("Faculty Details not found");
      setTimeout(() => navigate(-1), 1200);
      return null;
    } else {
      return <Error />;
    }
  }


  return (
    <div className="w-[80%] h-full mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left Column */}
      <div>
        <div
          onClick={() => navigate(-1)}
          className="bg-bhawaniRed w-[50px] h-[50px] flex items-center 
          justify-center rounded-full hover:bg-bhawaniDark transition-all 
          duration-700 shadow-[2px_2px_rgba(255,255,255,0.25)] 
          hover:shadow-none shadow-bhawaniDark2 hover:scale-95 cursor-pointer"
        >
          <FaArrowLeftLong className="text-white text-[25px] font-bold" />
        </div>

        {teachSectionDetails && (
          <div className="mt-10">
            <img
              src={teachSectionDetails.image}
              alt={teachSectionDetails.name}
              loading="lazy"
              className="w-[280px] h-[340px] object-cover"
            />

            <div className="mt-14 mb-10">
              <p className="font-bold font-m1 text-bhawaniDark text-[35px]">
                {teachSectionDetails.name}
              </p>
              <p className="font-helvetica text-[20px]">
                {teachSectionDetails.designation}
              </p>
            </div>

            <div className="w-[30%] h-[1px] bg-gray-400"></div>
          </div>
        )}

        <div className="mt-10">
          {teachSubData.map((resume) => (
            <div key={resume._id} className="mb-10 space-y-2">
              <div className="flex gap-2">
                <p className="font-helvetica font-bold text-[19px] text-bhawaniDark">
                  Phone:
                </p>
                <p className="font-verdana text-[17px]">
                  {resume.contactNumber}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-helvetica font-bold text-[19px] text-bhawaniDark">
                  Email:
                </p>
                <p className="font-verdana text-[17px]">
                  {resume.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:mt-20 space-y-10">
        {teachSubData.map((resume) => (
          <div key={resume._id} className="grid grid-cols-1 gap-6">
            {[
              ["Year Started at Bhawani", resume.startingYear],
              ["Education History", resume.educationHistory],
              ["Experience", resume.experience],
              ["Strengths", resume.strengths],
              ["Hobbies", resume.hobbies],
              ["What I Love Most About Bhawani", resume.love],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="font-bold font-sans text-[25px] text-bhawaniDark">
                  {label}:
                </p>
                <p className="font-m1 text-[20px] ">{value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherResume;
