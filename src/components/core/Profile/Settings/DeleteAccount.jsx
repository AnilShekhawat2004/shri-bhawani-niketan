import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { GiCrossMark } from "react-icons/gi";
import Cat from "../../../../assets/ImageLine/Cat.gif";

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="my-10 flex flex-row gap-5 rounded-xl border border-red-300 bg-red-50 p-8 shadow-lg">
      {/* Icon Section */}
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-red-100">
        <FiTrash2 className="text-3xl text-red-600" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-3">
        <h2 className="text-[22px] font-semibold text-red-700">
          Delete Account
        </h2>

        <div className="w-4/5 text-sm text-gray-600 leading-relaxed">
          <p className="mb-1">Are you sure you want to delete your account?</p>
          <p>
            This account may contain all college informdation. Deleting your
            account is
            <span className="font-semibold text-red-700"> permanent </span> and
            will remove all data associated with it.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOnOpen}
          className="w-fit cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 transition"
        >
          I want to delete my account
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative flex flex-col bg-white rounded-xl shadow-lg border border-gray-400 max-w-md w-[90%]">
            <div className="flex justify-end px-4 pt-4">
              <GiCrossMark
                className="text-[25px] cursor-pointer"
                onClick={handleOnClose}
              />
            </div>
            <div className="flex flex-col justify-center items-center pb-5">
              <p className="text-[30px] text-bhawaniDark font-bold">Sorry !</p>
              <img src={Cat} alt="Cat" className="w-[200px]" loading="lazy" />
              <p className="text-[22px]">But You Cannot Delete This Account</p>
              <p className="text-[20px]">Go and do Your work</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
