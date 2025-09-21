import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Common/Navbar/Navbar";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import { ACCOUNT_TYPE } from "./utils/constants";
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
import CategoryProgram from "./Pages/CategoryProgram";
import Courses from "./components/core/Courses/Courses";
import CourseDetails from "./components/core/Courses/CourseDetails";
import Login from "./Pages/Login";
import Faculty from "./components/core/DashBoard/Faculty";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import AddFaculty from "./components/core/Faculty/AddFaculty/addFaculty";
import FacultyNext from "./components/core/Faculty/AddFaculty/FacultyNext";
import EditFaculty from "./components/core/Faculty/EditFaculty/EditFaculty";
import EditFacultyNext from "./components/core/Faculty/EditFaculty/EditFacultyNext";
import DashboardCourses from "./components/core/DashBoard/Courses";
import AddCourse from "./components/core/DashboardCourse/AddCourse/AddCourse";
import AddCourseDetails from "./components/core/DashboardCourse/AddCourse/AddCourseDetails";
import EditCourse from "./components/core/DashboardCourse/EditCourse/EditCourse";
import EditCourseDetails from "./components/core/DashboardCourse/EditCourse/EditCourseDetails";
import DashBoardEvent from "./components/core/DashBoard/Event";
import AddEvent from "./components/core/DashBoardEvent/AddEvent/addEvent";
import EditEvent from "./components/core/DashBoardEvent/EditEvent/editEvent";
import DashBoardNews from "./components/core/DashBoard/News";
import AddNews from "./components/core/DashBoardNews/AddNews/addNews";
import EditNews from "./components/core/DashBoardNews/EditNews/editNews";
import DashBoardAchievement from "./components/core/DashBoard/Achievement";
import AddAchievement from "./components/core/DashBoardAchievement/AddAchievement/addAchievement";
import EditAchievement from "./components/core/DashBoardAchievement/EditAchievement/editAchievement";
import DashBoardPhoto from "./components/core/DashBoard/Photos";
import AddPhoto from "./components/core/DashBoardPhotos/AddPhotos/addPhoto";
import EditPhoto from "./components/core/DashBoardPhotos/EditPhotos/editPhoto";
import DashBoardPayment from "./components/core/DashBoard/Payment";
import PaymentDetails from "./components/core/DashBoardPayment/PaymentDetails";

function App() {
  const { user } = useSelector((state) => state.profile);

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

        <Route path="/campusSafety" element={<CampuSafety />} />

        <Route path="/campusLife" element={<CampusLife />} />

        <Route path="/campusLife/:campusLifeName" element={<CampusImg />} />

        <Route path="/course" element={<CategoryProgram />} />

        <Route path="/course/:courseCatName" element={<Courses />} />

        <Route
          path="/course/:courseCatName/:courseId"
          element={<CourseDetails />}
        />

        <Route path="/auth/login" element={<Login />} />

        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <>
            <Route
              path="/dashboard/faculty"
              element={
                <PrivateRoute>
                  <Faculty />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/faculty/addFaculty"
                element={
                  <PrivateRoute>
                    <AddFaculty />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/faculty/addFacultyDetails"
                element={
                  <PrivateRoute>
                    <FacultyNext />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/faculty/editFaculty"
                element={
                  <PrivateRoute>
                    <EditFaculty />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/faculty/editFacultyDetails"
                element={
                  <PrivateRoute>
                    <EditFacultyNext />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/faculty/:teachId"
              element={
                <PrivateRoute>
                  <TeacherResume />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/courses"
              element={
                <PrivateRoute>
                  <DashboardCourses />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/courses/addCourse"
                element={
                  <PrivateRoute>
                    <AddCourse />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/courses/addCourseDetails"
                element={
                  <PrivateRoute>
                    <AddCourseDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/courses/editCourse"
                element={
                  <PrivateRoute>
                    <EditCourse />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/courses/editCourseDetails"
                element={
                  <PrivateRoute>
                    <EditCourseDetails />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/courses/:courseId"
              element={
                <PrivateRoute>
                  <CourseDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/event"
              element={
                <PrivateRoute>
                  <DashBoardEvent />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/event/addEvent"
                element={
                  <PrivateRoute>
                    <AddEvent />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/event/editEvent"
                element={
                  <PrivateRoute>
                    <EditEvent />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/event/eventDetails"
              element={
                <PrivateRoute>
                  <Events />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/news"
              element={
                <PrivateRoute>
                  <DashBoardNews />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/news/addNews"
                element={
                  <PrivateRoute>
                    <AddNews />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/news/editNews"
                element={
                  <PrivateRoute>
                    <EditNews />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/news/:NewsId"
              element={
                <PrivateRoute>
                  <NewsDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/achievement"
              element={
                <PrivateRoute>
                  <DashBoardAchievement />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/achievement/addAchievement"
                element={
                  <PrivateRoute>
                    <AddAchievement />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/achievement/editAchievement"
                element={
                  <PrivateRoute>
                    <EditAchievement />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/achievement/achievementDetails"
              element={
                <PrivateRoute>
                  <Achievement />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/photos"
              element={
                <PrivateRoute>
                  <DashBoardPhoto />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/photos/addPhoto"
                element={
                  <PrivateRoute>
                    <AddPhoto />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/photos/editPhoto"
                element={
                  <PrivateRoute>
                    <EditPhoto />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/photos/:campusLifeName"
              element={
                <PrivateRoute>
                  <CampusImg />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/payment"
              element={
                <PrivateRoute>
                  <DashBoardPayment />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/payment/:paymentId"
                element={
                  <PrivateRoute>
                    <PaymentDetails />
                  </PrivateRoute>
                }
              />
            </Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
