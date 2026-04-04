import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Common/Navbar/Navbar";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import CampusImg from "./components/core/CampusLife/CampusImg";
import CourseDetails from "./components/core/Courses/CourseDetails";
import Courses from "./components/core/Courses/Courses";
import DashBoardAchievement from "./components/core/DashBoard/Achievement";
import DashBoardContact from "./components/core/DashBoard/ContactUs";
import DashboardCourses from "./components/core/DashBoard/Courses";
import DashBoardEvent from "./components/core/DashBoard/Event";
import Faculty from "./components/core/DashBoard/Faculty";
import DashBoardNews from "./components/core/DashBoard/News";
import DashBoardPayment from "./components/core/DashBoard/Payment";
import DashBoardPhoto from "./components/core/DashBoard/Photos";
import AddAchievement from "./components/core/DashBoardAchievement/AddAchievement/addAchievement";
import EditAchievement from "./components/core/DashBoardAchievement/EditAchievement/editAchievement";
import ContactDetails from "./components/core/DashBoardContact/ContactDetails";
import EditContact from "./components/core/DashBoardContact/EditContact";
import EditCourse from "./components/core/DashboardCourse/EditCourse/EditCourse";
import AddEvent from "./components/core/DashBoardEvent/AddEvent/addEvent";
import EditEvent from "./components/core/DashBoardEvent/EditEvent/editEvent";
import AddNews from "./components/core/DashBoardNews/AddNews/addNews";
import EditNews from "./components/core/DashBoardNews/EditNews/editNews";
import PaymentDetails from "./components/core/DashBoardPayment/PaymentDetails";
import AddPhoto from "./components/core/DashBoardPhotos/AddPhotos/addPhoto";
import EditPhoto from "./components/core/DashBoardPhotos/EditPhotos/editPhoto";
import EditFaculty from "./components/core/Faculty/EditFaculty/EditFaculty";
import NewsDetails from "./components/core/News/NewsDetails";
import Payment from "./components/core/Payment/Payment";
import Settings from "./components/core/Profile/DashBoardSettings";
import Profile from "./components/core/Profile/Profile";
import TeacherPage from "./components/core/Staff/TeacherPage";
import TeacherResume from "./components/core/Staff/TeacherResume";
import About from "./Pages/About";
import Achievement from "./Pages/Achievement";
import Apply from "./Pages/Apply";
import CampuSafety from "./Pages/CampuSafety";
import CampusLife from "./Pages/CampusLife";
import CampusMap from "./Pages/CampusMap";
import CategoryProgram from "./Pages/CategoryProgram";
import Contact from "./Pages/Contact";
import Employment from "./Pages/Employment";
import Events from "./Pages/Events";
import Give from "./Pages/Give";
import HarassmentPolicy from "./Pages/HarassmentPolicy";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import News from "./Pages/News";
import Policy from "./Pages/Policy";
import Staff from "./Pages/Staff";
import Trustees from "./Pages/Trustees";
import Visit from "./Pages/Visit";
import ScrollToTop from "./components/Common/ScrollToTop"
import AddTeacher from "./components/core/Faculty/AddFaculty/addTeacher"
import AddCourse from "./components/core/DashboardCourse/AddCourse/createCourse";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop/>
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

        <Route path="/trustees" element={<Trustees />} />

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
                path="addFaculty"
                element={
                  <PrivateRoute>
                    <AddTeacher/>
                  </PrivateRoute>
                }
              />

              <Route
                path="editFaculty"
                element={
                  <PrivateRoute>
                    <EditFaculty />
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
                path="addCourse"
                element={
                  <PrivateRoute>
                    <AddCourse />
                  </PrivateRoute>
                }
              />

              <Route
                path="editCourse"
                element={
                  <PrivateRoute>
                    <EditCourse />
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
                path="addEvent"
                element={
                  <PrivateRoute>
                    <AddEvent />
                  </PrivateRoute>
                }
              />

              <Route
                path="editEvent"
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
                path="addNews"
                element={
                  <PrivateRoute>
                    <AddNews />
                  </PrivateRoute>
                }
              />

              <Route
                path="editNews"
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
                path="addAchievement"
                element={
                  <PrivateRoute>
                    <AddAchievement />
                  </PrivateRoute>
                }
              />

              <Route
                path="editAchievement"
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
                path="addPhoto"
                element={
                  <PrivateRoute>
                    <AddPhoto />
                  </PrivateRoute>
                }
              />

              <Route
                path="editPhoto"
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

            <Route
              path="/dashboard/contact"
              element={
                <PrivateRoute>
                  <DashBoardContact />
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard/contact/:contactId"
                element={
                  <PrivateRoute>
                    <ContactDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard/contact/editInquiry"
                element={
                  <PrivateRoute>
                    <EditContact />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </>
        
      </Routes>
    </div>
  );
}

export default App;
