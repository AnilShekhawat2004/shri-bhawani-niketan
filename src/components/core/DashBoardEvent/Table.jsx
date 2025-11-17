import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import DeleteEvent from "./DeleteEvent";

const monthsBranch = [
  { id: "All", month: "All Events" },
  { id: "January", month: "January" },
  { id: "February", month: "February" },
  { id: "March", month: "March" },
  { id: "April", month: "April" },
  { id: "May", month: "May" },
  { id: "June", month: "June" },
  { id: "July", month: "July" },
  { id: "August", month: "August" },
  { id: "September", month: "September" },
  { id: "October", month: "October" },
  { id: "November", month: "November" },
  { id: "December", month: "December" },
];

function Table({ eventDetails, setEventDetails }) {
  const [page, setPage] = useState(1);
  const [selectCategory, setSelectCatgory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const limit = 5;

  let filteredData =
    selectCategory === "All"
      ? eventDetails
      : eventDetails.filter((item) => item.branch.includes(selectCategory));

  filteredData = filteredData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / limit);

  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  const handleCatgoryChange = (e) => {
    setSelectCatgory(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col bg-white w-[97%] h-auto rounded-xl shadow-xl border-gray-300 border-[1px] pt-5 pb-12 mt-20 mb-20">
      <div className="flex flex-row items-center justify-between pl-10 pr-16 pt-5">
        <div className="flex flex-col justify-start items-start">
          <div className="flex justify-center items-center gap-3">
            <div className="bg-bhawaniDark/10 p-3 rounded-lg">
              <CiCalendar className="text-[22px] text-bhawaniDark" />
            </div>
            <p className="font-m2 text-2xl md:text-3xl font-bold text-bhawaniDark">
              Event Calendar
            </p>
          </div>
          <p className="text-gray-500 text-sm">Complete list of campus event</p>
        </div>

        <div className="flex gap-4">
          <div className="relative w-full max-w-xs z-10">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search Event..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input-style !pl-9"
            />
          </div>
          <select
            value={selectCategory}
            onChange={handleCatgoryChange}
            className="form-input-style w-full max-w-xs"
          >
            {monthsBranch.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-10">
        {paginatedData.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-bhawaniDark to-bhawaniDark2 text-white">
                <tr>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Month</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-5">{item.name}</td>
                    <td className="py-5">
                      <div className="inline-block text-[14px] bg-blue-50 border border-blue-500 text-blue-600 text-center py-[2px] px-3 rounded-2xl">
                        {item.branch}
                      </div>
                    </td>
                    <td>
                      <div className="flex px-4 py-5 gap-1">
                        <p>{item.day}</p>
                        <p>{item.date}</p>
                      </div>
                    </td>
                    <td className="px-4 py-5 flex gap-5">
                      <PiEye
                        className="text-blue-600 text-[20px] cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/event/eventDetails`)
                        }
                      />
                      <FaRegEdit
                        className="text-yellow-500 text-[18px] cursor-pointer"
                        onClick={() =>
                          navigate(`/dashboard/event/editEvent?id=${item._id}`)
                        }
                      />
                      <DeleteEvent
                        eventId={item._id}
                        setEventDetails={setEventDetails}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center ">No Event found for this filter.</p>
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
