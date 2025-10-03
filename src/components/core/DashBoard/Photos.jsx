import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  fetchPhotoCategories,
  getAllPhotos,
} from "../../../services/operations/imageAPI";
import Breadcrumb from "../../Common/Breadcrumb";
import AddButton from "../../Common/Buttons/addButton";
import Count from "../DashBoardPhotos/Count";
import Table from "../DashBoardPhotos/Table";
import AdminNavBar from "./AdminNavbar";
import Sidebar from "./SideBar";

function Photos() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [imageCat, setImageCat] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchImageCat = async () => {
      try {
        const res = await fetchPhotoCategories();
        if (res && res.length > 0) {
          setImageCat(res);
        }
      } catch (error) {
        console.error("Error fetching image categoires : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageCat();
  }, []);

  useEffect(() => {
    const getAllPhotosDetails = async () => {
      try {
        const res = await getAllPhotos();
        if (res && res.length > 0) {
          setPhotoDetails(res);
        }
      } catch (error) {
        console.log("Error in Fetching the Photos Data : ", error);
      } finally {
        setLoading(false);
      }
    };
    getAllPhotosDetails();

    if (location.state?.refresh) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );

  const isAddPhotoOpen = ["/addPhoto", "/editPhoto"].some((path) =>
    location.pathname.includes(path)
  );

  return (
    <div className="bg-violet-50 w-full h-full overflow-x-hidden">
      <AdminNavBar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />

        <div
          className={`transition-all mt-[75px] duration-300 pl-10 pt-5 w-full
                          ${isSidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <Breadcrumb />
          <div className="flex flex-row justify-between mr-8">
            <div>
              <h1 className="text-[35px] font-m2 font-bold md-2">
                Campus Life Management
              </h1>
              <p className="text-gray-400">
                Manage campus activites and student life content
              </p>
            </div>

            <div>
              <AddButton
                className="w-[150px]"
                text="Add Photos"
                onClick={() => navigate("/dashboard/photos/addPhoto")}
              >
                <IoMdAdd />
              </AddButton>
            </div>
          </div>
          <div className="mt-10">
            <Count />
          </div>
          <div>
            <Table
              photoDetails={photoDetails}
              setPhotoDetails={setPhotoDetails}
              imageCat={imageCat}
            />
          </div>
          {isAddPhotoOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative bg-white rounded-3xl space-y-6 shadow-xl max-w-2xl w-[90%]">
                <div className="bg-gradient-to-r rounded-t-3xl font-m1 from-bhawaniDark to-bhawaniDark2 py-6 px-8">
                  <h2 className="text-white text-3xl font-bold">
                    {location.pathname.includes("editPhoto")
                      ? "Edit Photo"
                      : "Add Photo"}
                  </h2>
                  <p className="text-white text-md">
                    {location.pathname.includes("editPhoto")
                      ? "Update your moments and relive your campus story."
                      : "Capture the moments that matter."}
                  </p>
                </div>
                <div className="pl-10 pr-10 pb-10 max-h-[80vh] overflow-y-auto hide-scrollbar scroll-smooth">
                  <Outlet />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Photos;
