import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { GiCrossMark } from "react-icons/gi";
import Cat from "../../../../assets/ImageLine/Cat.gif";

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-red-100 to-red-200 p-8 rounded-2xl shadow-xl hover:shadow-2xl flex flex-col md:flex-row gap-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 animate-pulse">
        <FiTrash2 className="text-3xl text-red-600" />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-red-700">Delete Account</h2>
        <p className="text-gray-700 text-sm md:text-base max-w-md">
          Are you sure you want to delete your account? This action is{" "}
          <span className="font-semibold text-red-700">permanent</span> and will
          remove all data associated.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow transition transform hover:scale-105"
        >
          I want to delete my account
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-11/12 p-6 flex flex-col items-center gap-4 relative">
            <GiCrossMark
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <p className="text-3xl font-bold text-bhawaniDark">Sorry!</p>
            <img src={Cat} alt="Cat" className="w-48 rounded-lg" />
            <p className="text-xl text-gray-800 text-center">
              You cannot delete this account. Go and do your work!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
