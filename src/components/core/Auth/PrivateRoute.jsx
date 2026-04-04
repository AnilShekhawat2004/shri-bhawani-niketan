import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../../../utils/constants";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { token, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(loading){
    return(
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    )
  }

  if(!token){
    return(
      <Navigate to="/auth/login" replace/>
    )
  }

  if (token) {
    try {
      const decode = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decode.exp < now) {
        return (
          <div className="w-full min-h-screen flex justify-center items-center">
            <div className="backdrop-blur-md border border-gray-300 bg-white px-5 py-5 shadow-lg rounded-lg">
              <div className="flex flex-col gap-2">
                <p className="text-[26px] text-bhawaniDark font-bold">
                  Session expired
                </p>
                <p>Please Login again.</p>
                <div
                  onClick={() => {
                    dispatch(logout(navigate));
                  }}
                  className="cursor-pointer text-center w-[80px] h-[30px] pt-[1px] px-1 bg-gray-400 border border-gray-600 rounded-md text-white hover:bg-gray-500 hover:border-gray-700 shadow-md"
                >
                  <p className="font-m2">Sign In</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.log("Invaild Token", error);
      dispatch(logout(navigate));
    }
  }

  if (adminOnly && user?.accountType !== ACCOUNT_TYPE.ADMIN) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center backdrop-blur-md border border-gray-300 bg-white px-5 py-5 shadow-lg rounded-lg">
          <div className="flex flex-col gap-2">
            <p className="text-[28px] text-bhawaniDark font-bold">
              This protected route
            </p>
            <p className="">Only accessable to admin</p>
            <div
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer text-center px-2 py-2 bg-gray-400 border border-gray-600 rounded-md text-white hover:bg-gray-500 hover:border-gray-700 shadow-md"
            >
              <p className="font-m2">Homepage</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
