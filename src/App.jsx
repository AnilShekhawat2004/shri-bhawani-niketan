import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Common/Navbar/Navbar";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import { ACCOUNT_TYPE } from "./utils/constants"
import Staff from "./Pages/Staff";
import TeacherPage from "./components/core/Staff/TeacherPage";
import TeacherResume from "./components/core/Staff/TeacherResume";
import Employment from "./Pages/Employment";
import CampusMap from "./Pages/CampusMap";
import Trustees from "./Pages/Trustees";
import Policy from "./Pages/Policy";
import HarassmentPolicy from "./Pages/HarassmentPolicy";
import Visit from "./Pages/Visit";
import Give from "./Pages/Give";
import Payment from "./components/core/Payment/Payment";
import News from "./Pages/News";
import NewsDetails from "./components/core/News/NewsDetails";
import Apply from "./Pages/Apply";
import Events from "./Pages/Events";
import Achievement from "./Pages/Achievement";
import CampuSafety from "./Pages/CampuSafety";
import CampusLife from "./Pages/CampusLife";
import CampusImg from "./components/core/CampusLife/CampusImg";
import CategoryProgram from "./Pages/CategoryProgram"
import Courses from "./components/core/Courses/Courses";
import CourseDetails from "./components/core/Courses/CourseDetails"
import Login from "./Pages/Login";
import Faculty from "./components/core/DashBoard/Faculty";
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import AddFaculty from "./components/core/Faculty/AddFaculty/addFaculty";
import FacultyNext from "./components/core/Faculty/AddFaculty/FacultyNext"
import EditFaculty from "./components/core/Faculty/EditFaculty/EditFaculty";
import EditFacultyNext from "./components/core/Faculty/EditFaculty/EditFacultyNext";

function App() {
  
  const { user } = useSelector((state) => state.profile)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contactUs" element={<Contact />} />

        <Route path="/aboutUs" element={<About />} />

        <Route path="/staff" element={<Staff />} />

        <Route path="/staff/:teachCatName" element={<TeacherPage />} />

        <Route
          path="/staff/:teachCatName/:teachId"
          element={<TeacherResume />}
        />

        <Route path="/employment" element={<Employment />} />

        <Route path="/campus-map" element={<CampusMap />} />

        <Route path="/trustess" element={<Trustees />} />

        <Route path="/privacy-policy" element={<Policy />} />

        <Route path="/harassment-policy" element={<HarassmentPolicy />} />

        <Route path="/visit" element={<Visit />} />

        <Route path="/give" element={<Give />} />

        <Route path="/give/payment" element={<Payment />} />

        <Route path="/news" element={<News />} />

        <Route path="/news/:NewsId" element={<NewsDetails />} />

        <Route path="/apply" element={<Apply />} />

        <Route path="/events" element={<Events />} />

        <Route path="/achievement" element={<Achievement />} />

        <Route path="/campusSafety" element={<CampuSafety/>} />
        
        <Route path="/campusLife" element={<CampusLife/>} />

        <Route path="/campusLife/:campusLifeName" element={<CampusImg/>} />

        <Route path="/course" element={<CategoryProgram/>} />

        <Route path="/course/:courseCatName" element={<Courses/>} />

        <Route path="/course/:courseCatName/:courseId" element={<CourseDetails/>} />

        <Route path="/auth/login" element={<Login/>}/>

        {
           user?.accountType === ACCOUNT_TYPE.ADMIN && (
             <>
              <Route path="/dashboard/faculty" element={
                <PrivateRoute>
                  <Faculty/>
                </PrivateRoute>
                }>

                <Route path="/dashboard/faculty/addFaculty" element={
                  <PrivateRoute>
                    <AddFaculty/>
                  </PrivateRoute>
                }/>

                <Route path="/dashboard/faculty/addFacultyDetails" element={
                  <PrivateRoute>
                    <FacultyNext/>
                  </PrivateRoute>
                }/>

                <Route path="/dashboard/faculty/editFaculty" element={
                  <PrivateRoute>
                    <EditFaculty/>
                  </PrivateRoute>
                }/>

                <Route path="/dashboard/faculty/editFacultyDetails" element={
                  <PrivateRoute>
                    <EditFacultyNext/>
                  </PrivateRoute>
                }/>
                </Route>

                <Route path="/dashboard/faculty/:teachId" element={
                  <PrivateRoute>
                    <TeacherResume/>
                  </PrivateRoute>
                }/>
             </>
           )
         }
      </Routes> 
    </div>
  );
}

export default App;
