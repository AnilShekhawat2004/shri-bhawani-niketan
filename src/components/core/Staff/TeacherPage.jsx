import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiConnector } from '../../../services/apiconnector'
import { teacherEndpoints } from "../../../services/apis"
import { getAllSections } from '../../../services/operations/teacherAPI'
import Footer from "../../Common/Footer/Footer"
import { RiArrowRightDoubleFill } from "react-icons/ri";
import LandingImage from '../../Common/landingImage'
import RedBar from '../../Common/redBar'
import Error from '../../../Pages/Error'

const TeacherPage = () => {

    const [loading, setLoading] = useState(true)
    const { teachCatName } = useParams()
    const [teachCatId, setTeachCatId] = useState("")
    const [teachCatDetails, setTeachCatDetails] = useState(null)
    const [teacherData, setTeacherData] = useState([])

    const [showError, setShowError] = useState(false);


    useEffect(() => {
       const getAllTeach = async() => {
            try{
                const res = await apiConnector("GET", teacherEndpoints.TEACHER_CATEGORY_API)
                const teach_id = 
                res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === teachCatName)[0]
                setTeachCatId(teach_id._id)
                setTeachCatDetails(teach_id)
            }catch(error){
                console.log("Error fetching Teacher id : ", error)
            }finally{
                setLoading(false)
            }
        }

        getAllTeach()
    }, [teachCatName])

    useEffect(() => {
        const getTeacherDetails = async() => {
            try{
                const res = await getAllSections(teachCatId)
                const filtered = res.filter(item => item.teachCat.includes(teachCatId))
                setTeacherData(filtered)
            }catch(error){
                console.log("Error in Fetching the Teacher Details : ", error)
            }finally{
                setLoading(false)
            }
        }

        if(teachCatId){
            getTeacherDetails()
        }
    },[teachCatId])

    useEffect(() => {
  if (!loading && teacherData.length === 0) {
    const timeout = setTimeout(() => {
      setShowError(true);
    }, 4000); // 4 seconds delay before showing error
    return () => clearTimeout(timeout);
  }
}, [loading, teacherData]);

    // loading || !teacherData
    if(loading){ 
        return(
           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
             <div className="loader"></div>
           </div>
      )
    }
    if (showError) return <Error />;

    return(
        <div className="">
            <div className="relative">
                {teachCatDetails && (
                    <div>
                        <LandingImage
                            LineImage={teachCatDetails.landingImage}
                            text={teachCatDetails.name}
                            className="absolute z-20"
                            textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
                        />
                        <RedBar
                            className="absolute font-m1"
                            textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
                            text={teachCatDetails.description}
                        />
                    </div>
                )}
            </div>
            <div className="w-[85%] mt-32 mb-32 mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {teacherData.map(teacher => (
                    <Link
                      key={teacher._id}
                      className="relative group w-[300px] h-[388.8px] cursor-pointer overflow-hidden hover:shadow-xl"
                      to={`/staff/${teachCatName}/${teacher.name.split(" ").join("-").toLowerCase()}`}
                    >
                      {/* Image */}
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />   
                      
                      {/* Fixed Black Gradient Tint (Always visible) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 z-10"></div>

                      {/* bhawaniOrange Overlay */}
                      <div className="absolute inset-0 opacity-0 bg-bhawaniOrange group-hover:opacity-60 transition-all duration-700 z-20"></div>                    

                      {/* Text Above the Overlay */}
                      <div className="absolute inset-0 flex flex-col z-30 text-white items-start justify-end p-4">
                        <p className="text-[22px] font-semibold text-lg font-verdana ">{teacher.name}</p>
                        <p className="mt-2 font-m1 text-[18px]">{teacher.designation}</p>
                      </div>

                      {/* White Arrow Button */}
                      <div className="absolute opacity-0 bottom-0 right-0 z-30 flex justify-center 
                           items-center bg-white w-[50px] h-[50px] shadow-md group-hover:opacity-100 transition-all duration-700">
                        <RiArrowRightDoubleFill className="text-bhawaniOrange text-[28px]" />
                      </div>

                    </Link>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default TeacherPage