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
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEvents();
        if (res && res.length > 0) {
          setEvent(res);
        }
        console.log(res);
      } catch (error) {
        console.error("Error fetching event : ", error);
      } finally {
        setLoading(false);
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
    location.pathname.includes(path)
  );

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (event.length === 0) return <Error />;

  return (
    <div>
      <div className={`${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
        <LandingImage
          LineImage={EventImage}
          text="Event"
          className="absolute z-20"
          textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
        />
        <RedBar
          className="absolute font-m1"
          textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
          text="From thrilling fests to thought-provoking seminars, every event is a chance to grow, connect, and shine brighter because your journey deserves more than just classrooms."
        />
      </div>

      <div
        onClick={() => navigate(-1)}
        className={
          BackUpto
            ? "absolute z-50 flex gap-2 justify-center items-center px-4 py-3 bg-bhawaniRed shadow-md rounded-lg translate-y-10 translate-x-[80px] cursor-pointer"
            : "hidden"
        }
      >
        <FaArrowLeft className=" text-white" />
        <p className="text-white">Back To Dashboard</p>
      </div>

      <div className="w-[80%] mx-auto mt-32">
        <div>
          <p className="text-[50px] font-m1 font-extrabold text-bhawaniDark">
            Bhawani Events
          </p>
        </div>

        <div className="mt-10">
          {Object.entries(groupedBranch).map(([branch, event]) => (
            <div key={branch} className="">
              <div className="mt-20">
                <p className="text-[40px] font-bold font-m1 text-bhawaniDark translate-x-8">
                  {branch}
                </p>
                <div className="w-full mt-4 h-[1px] bg-bhawaniYellow"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {event.map((events) => (
                  <div
                    key={events._id}
                    className="mt-16 relative group bg-white w-[300px] h-[360px] shadow-lg 
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
                      className="absolute bg-bhawaniDark w-[80px] h-[70px] rounded-br-2xl flex flex-col 
                                    justify-center items-center group-hover:bg-bhawaniPink transition-all duration-500"
                    >
                      <p className="text-white text-[25px] font-bold font-helvetica">
                        {events.day}
                      </p>
                      <p className="text-white font-helvetica">{events.date}</p>
                    </div>
                    <div className="absolute mt-[225px] ml-2">
                      <p className="text-[22px] font-semibold font-m2 group-hover:text-bhawaniRed">
                        {events.name}
                      </p>
                      <p className="mt-1 group-hover:text-bhawaniRed">
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
