import { useState } from "react";
import { BsFillTrophyFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import DeleteAchievement from "./DeleteAchievement";

function Table({ achieveDetails, setAchieveDetails }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const limit = 5;

  let filteredData = achieveDetails;

  filteredData = filteredData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / limit);

  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col bg-white w-[97%] h-auto rounded-xl shadow-xl border-gray-300 border-[1px] pt-5 pb-12 mt-20 mb-20">
      <div className="flex flex-row items-center justify-between pl-10 pr-16 pt-5">
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-center items-center gap-3">
            <div className="bg-gray-300 p-2 rounded-md ">
              <BsFillTrophyFill className="text-[20px] text-bhawaniRed" />
            </div>
            <p className="font-m2 text-[30px] font-bold">Achievement records</p>
          </div>
          <p className="text-gray-500">Track all awards and recognitions</p>
        </div>

        <div className="flex gap-4">
          <div className="relative w-full max-w-xs z-10">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search achievement..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input-style !pl-9"
            />
          </div>
        </div>
      </div>
      <div className="p-10">
        {paginatedData.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-bhawaniDark to-bhawaniDark2 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-5">{item.title}</td>
                    <td className="py-5">
                      <div className="inline-block text-[14px] bg-blue-50 border border-blue-500 text-blue-600 text-center py-[2px] px-3 rounded-2xl">
                        {item.status}
                      </div>
                    </td>
                    <td className="px-4 py-5 flex gap-5">
                      <PiEye
                        className="text-blue-600 text-[20px] cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/achievement/achievementDetails`)
                        }
                      />
                      <FaRegEdit
                        className="text-yellow-500 text-[18px] cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/achievement/editAchievement?id=${item._id}`
                          )
                        }
                      />
                      <DeleteAchievement
                        achieveId={item._id}
                        setAchieveDetails={setAchieveDetails}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center ">No Achievement found for this filter.</p>
        )}
      </div>

      <div>
        {filteredData.length > limit && (
          <div className="flex justify-center items-center gap-10 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-2 border border-gray-400 text-gray-700 rounded-xl py-2 px-5 hover:bg-bhawaniDark hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              <IoIosArrowBack />
              Previous
            </button>
            <span className="text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-2 border border-gray-400 text-gray-700 rounded-xl py-2 px-5 hover:bg-bhawaniDark hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              Next
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
