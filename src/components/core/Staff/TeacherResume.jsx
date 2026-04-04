import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../Pages/Error";
import { getTeachDetails } from "../../../services/operations/teacherAPI";

const TeacherResume = () => {
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState(null);

  const { teachId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTeachDetails(teachId);
        setSectionData(res);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teachId]);

  console.log("This is the sectionData : ", sectionData);

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );

  if (!sectionData?.SubSection?.length) {
    return <Error />;
  }

  return (
    <div className="w-[80%] h-full mx-auto mt-20 grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-16 mb-20">
      {/* LEFT COLUMN */}
      <div>
        <div
          onClick={() => navigate(-1)}
          className="bg-bhawaniRed w-[50px] h-[50px] flex items-center 
        justify-center rounded-full hover:bg-bhawaniDark transition-all 
        duration-700 shadow-[2px_2px_rgba(255,255,255,0.25)] 
        hover:shadow-none shadow-bhawaniDark2 hover:scale-95 cursor-pointer"
        >
          <FaArrowLeftLong className="text-white text-[25px]" />
        </div>

        {sectionData && (
          <div className="mt-10">
            <img
              src={sectionData.image}
              alt={sectionData.name}
              loading="lazy"
              className="w-[320px] h-[380px] object-cover"
            />

            <div className="mt-10 mb-8">
              <p className="font-bold font-m1 text-bhawaniDark text-[35px]">
                {sectionData.name}
              </p>
              <p className="font-helvetica text-[20px]">
                {sectionData.designation}
              </p>
            </div>

            <div className="w-[60%] h-[1px] bg-gray-400"></div>
          </div>
        )}

        {/* CONTACT INFO */}
        <div className="mt-10">
          {sectionData?.SubSection?.map((resume) => (
            <div key={resume._id} className="mb-8 space-y-2">
              <div className="flex gap-2">
                <p className="font-bold text-[18px] text-bhawaniDark">Phone:</p>
                <p className="text-[17px]">{resume.contactNumber}</p>
              </div>

              <div className="flex gap-2">
                <p className="font-bold text-[18px] text-bhawaniDark">Email:</p>
                <p className="text-[17px]">{resume.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:mt-20">
        {sectionData?.SubSection?.map((resume) => (
          <div
            key={resume._id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* YEAR STARTED */}
            <div>
              <p className="font-bold text-[24px] text-bhawaniDark">
                Year Started
              </p>
              <p className="text-[20px] mt-1">{resume.startingYear}</p>
            </div>

            {/* EXPERIENCE */}
            <div>
              <p className="font-bold text-[24px] text-bhawaniDark">
                Experience
              </p>
              <p className="text-[20px] mt-1">{resume.experience} Years</p>
            </div>

            {/* EDUCATION HISTORY */}
            <div>
              <p className="font-bold text-[24px] text-bhawaniDark">
                Education
              </p>

              {resume.educationHistory?.map((edu, i) => (
                <p key={i} className="text-[20px] mt-1">
                  {edu.degree} - {edu.institute} ({edu.year})
                </p>
              ))}
            </div>

            {/* PROFESSIONAL HISTORY */}
            <div>
              <p className="font-bold text-[24px] text-bhawaniDark">
                Professional History
              </p>

              {resume.professionalHistory?.map((job, i) => (
                <p key={i} className="text-[20px] mt-1">
                  {job.designation} - {job.institute}({job.duration})
                </p>
              ))}
            </div>

            {/* STRENGTHS */}
            <div>
              <p className="font-bold text-[24px] text-bhawaniDark">
                Strengths
              </p>

              {resume.strengths?.map((item, i) => (
                <p key={i} className="text-[20px] mt-1">
                  • {item}
                </p>
              ))}
            </div>

            {/* HOBBIES */}
            <div>
              <p className="font-bold text-[24px] text-bhawaniDark">Hobbies</p>

              {resume.hobbies?.map((item, i) => (
                <p key={i} className="text-[20px] mt-1">
                  • {item}
                </p>
              ))}
            </div>

            {/* LOVE */}
            <div className="md:col-span-2">
              <p className="font-bold text-[24px] text-bhawaniDark">
                What I Love Most About Bhawani
              </p>

              <p className="text-[20px] mt-1">{resume.love}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherResume;
