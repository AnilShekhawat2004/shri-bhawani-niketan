import React, { useEffect, useState } from 'react';
import { getAllTeacherCategories } from '../services/operations/teacherAPI';
import Footer from "../components/Common/Footer/Footer";
import RButton from "../components/Common/Buttons/rButton"
import LandingImage from '../components/Common/landingImage';
import RedBar from '../components/Common/redBar';
import Classroom from "../assets/Student/Classroom.png"
import { Link } from 'react-router-dom';
import Error from './Error';

const Staff = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTeacherCategories();
        if (res && res.length > 0) {
          setCategories(res);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedCategories = categories.reduce((acc, category) => {
    const branch = category.branch || "Other";
    if (!acc[branch]) acc[branch] = [];
    acc[branch].push(category);
    return acc;
  }, {});

  if (loading) return(
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
    </div>
  );
  if (categories.length === 0) return <Error/>;

  return (
    <div>
       
       <div>

        <LandingImage
          LineImage={Classroom}
          text={"Faculty & Staff"}
          className="absolute z-20"
          textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
        />

        <RedBar
          className="absolute font-m1"
          textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
          text="In every classroom, there’s a spark waiting to become a flame and a teacher ready to light it"
        />
       </div>

       <div className="w-[80%] mx-auto mt-32">
          {Object.entries(groupedCategories).map(([branch, categories]) => (
            <div key={branch} className="mb-24 ">
                <div className="flex flex-col gap-5 items-center justify-center mb-10">
                   <h2 className="text-2xl font-semibold  text-center font-m1 text-[45px] text-bhawaniDark">{branch} Staff</h2>
                   <div className="w-[35%] h-[2px] bg-bhawaniYellow"></div>
                </div>  

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map(category => (
                  <div
                    key={category._id}
                    className="border  group bg-bhawaniBeige  p-4 flex flex-col justify-center items-center
                    shadow-[0_4px_10px_rgba(152,0,46,0.1)] hover:shadow-[0_8px_20px_rgba(152,0,46,0.2),_0_0_10px_rgba(253,183,20,0.3)] 
                    transition-shadow duration-300"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-[200px] h-[205px] object-cover mb-2 rounded group-hover:scale-110 transition-all duration-700"
                    />
                    <p className="font-semibold font-m1 text-center text-[22px]">{category.name}</p>
                    <Link to={`/staff/${category.name.split(" ").join("-").toLowerCase()}`}>
                      <RButton
                        className="scale-0 text-[15px] font-verdana mt-3 group-hover:scale-100 transition-all duration-700"
                      >
                        {"Know Your Mentors"}
                      </RButton>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
       </div>

      <Footer />
    </div>
  );
};

export default Staff;
