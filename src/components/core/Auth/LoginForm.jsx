import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
import YButton from "../../Common/Buttons/yButton";

function LoginForm({ className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((pervData) => ({
      ...pervData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className={`bg-white w-[28%] rounded-3xl shadow-2xl h-auto flex flex-col justify-center items-start p-10 gap-y-4 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p className="text-bhawaniDark font-m1 lg:text-[30px] font-bold">
          Welcom Back!
        </p>
        <p className="font-m2 text-[19px] ">
          Access Your Campus World with One Click
        </p>
      </div>
      <label className="w-[80%]">
        <p className="text-md font-lg">Email Address</p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-input-style"
        />
      </label>
      <label className="w-[80%]">
        <p className="text-md font-lg">Password</p>
        <div className="relative w-full">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            className="form-input-style pr-10"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={20} fill="#374151" />
            ) : (
              <AiOutlineEye fontSize={20} fill="#374151" />
            )}
          </span>
        </div>
      </label>
      <YButton
        type="submit"
        className="w-full hover:border-bhawaniYellow hover:border-2"
      >
        Sign In
      </YButton>
    </form>
  );
}

export default LoginForm;
