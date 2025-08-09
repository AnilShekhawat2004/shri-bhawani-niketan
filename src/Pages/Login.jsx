import LoginForm from "../components/core/Auth/LoginForm";
import Bhawani from "../assets/College/Bhawani.png";
import { useSelector } from "react-redux";

function Login() {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center  w-full h-full overflow-hidden">
      {loading ? (
        <div className="loader flex w-full h-full justify-center items-center"></div>
      ) : (
        <div className="relative w-[100vw] h-[100vh]">
          <img
            src={Bhawani}
            alt="Bhawani"
            loading="lazy"
            draggable="false"
            className="absolute  w-[100vw] h-[100vh] object-cover"
          />

          <div className="flex lg:justify-start md:justify-center items-center w-[100vw] h-[100vh]  lg:ml-40">
            <LoginForm className="absolute z-20"/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
