import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import EventImage from "../assets/College/Event.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import { getAllEvents } from "../services/operations/eventAPI";
import Error from "./Error";

function Events() {
  const [loading, setLoading] = useState(0);
  const [event, setEvent] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading((prev) => prev + 1);
      try {
        const res = await getAllEvents();
        if (res && res.length > 0) {
          setEvent(res);
        }
      } catch (error) {
        console.error("Error fetching event : ", error);
      } finally {
        setLoading((prev) => prev - 1);
      }
    };

    fetchData();
  }, []);

  const groupedBranch = event.reduce((acc, events) => {
    const branch = events.branch || "Other";
    if (!acc[branch]) acc[branch] = [];
    acc[branch].push(events);
    return acc;
  }, {});

  const BackUpto = ["/dashboard/event"].some((path) =>
    location.pathname.includes(path),
  );

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (event.length === 0) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className={`relative ${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
        <LandingImage
          LineImage={EventImage}
          text="Event"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="From thrilling fests to thought-provoking seminars, every event is a chance to grow, connect, and shine brighter because your journey deserves more than just classrooms."
            textClassName="font-m1 text-center text-[11px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[2px]"
          />
        </div>

        {BackUpto && (
          <div
            onClick={() => navigate(-1)}
            className="fixed z-50 top-32 left-10 flex items-center gap-3 px-5 py-3
                  bg-white/20 backdrop-blur-md border border-white/30
                  shadow-lg rounded-xl cursor-pointer
                  hover:bg-bhawaniRed transition-all duration-300 group"
          >
            <FaArrowLeft className="text-white group-hover:translate-x-[-3px] transition" />
            <p className="text-white font-m1">Back To Dashboard</p>
          </div>
        )}
      </div>

      <div className="w-[80%] mx-auto xl:mt-32 lg:mt-32 md:mt-28 mt-20">
        <div>
          <p className="xl:text-[50px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-[25px] font-m1 font-extrabold text-bhawaniDark">
            Bhawani Events
          </p>
        </div>

        <div className="mt-10">
          {Object.entries(groupedBranch).map(([branch, event]) => (
            <div key={branch} className="">
              <div className="mt-20">
                <p className="xl:text-[40px] lg:text-[40px] text-[30px]  font-bold font-m1 text-bhawaniDark translate-x-8">
                  {branch}
                </p>
                <div className="w-full mt-4 h-[1px] bg-bhawaniYellow"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
                {event.map((events) => (
                  <div
                    key={events._id}
                    className="mt-16 mx-auto relative group bg-white xl:w-[300px] lg:w-[300px] md:w-[300px] sm:w-[300px] w-[240px] xl:h-[360px] lg:h-[360px] md:h-[360px] sm:h-[360px] h-[300px] shadow-lg 
                                  hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl cursor-pointer"
                  >
                    <img
                      src={events.thumbnail}
                      alt={events.name}
                      loading="lazy"
                      className="absolute w-full h-[60%] rounded-t-2xl group-hover:scale-110 
                                        transition-all duration-500 object-cover"
                    />

                    <div
                      className="absolute bg-bhawaniDark xl:w-[80px] lg:w-[80px] md:w-[80px] sm:w-[80px] w-[70px] xl:h-[70px] lg:h-[70px] md:h-[70px] sm:h-[70px] h-[60px] rounded-br-2xl flex flex-col 
                                    justify-center items-center group-hover:bg-bhawaniPink transition-all duration-500"
                    >
                      <p className="text-white xl:text-[25px] lg:text-[25px] md:text-[25px] sm:text-[25px] text-[20px] font-bold font-helvetica">
                        {events.day}
                      </p>
                      <p className="text-white xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-[16px] text-[14px] font-helvetica">
                        {events.date}
                      </p>
                    </div>
                    <div className="absolute xl:mt-[225px] lg:mt-[225px] md:mt-[225px] sm:mt-[225px] mt-[180px] ml-2">
                      <p className="xl:text-[22px] lg:text-[22px] md:text-[22px] sm:text-[22px] text-[18px] font-semibold font-m2 group-hover:text-bhawaniRed">
                        {events.name}
                      </p>
                      <p className="mt-1 xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-[16px] text-[14px] group-hover:text-bhawaniRed">
                        {events.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!BackUpto && <Footer />}
    </div>
  );
}

export default Events;
