import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DeleteFaculty from "./DeleteFaculty";

function Table({ teachDetails, setTeachDetails, teachCat }) {
  const [page, setPage] = useState(1);
  const [selectCategory, setSelectCatgory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const limit = 5;

  const categories = [{ _id: "All", name: "All Departments" }, ...teachCat];

  let filteredData =
    selectCategory === "All"
      ? teachDetails
      : teachDetails.filter((item) => item.teachCat.includes(selectCategory));

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
            <div className="bg-gray-300 p-2 rounded-md ">
              <RiGroupLine className="text-[20px] text-bhawaniRed" />
            </div>
            <p className="font-m2 text-[30px] font-bold">Faculty Directory</p>
          </div>
          <p className="text-gray-500">
            Complete list of faculty members and staff
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative w-full max-w-xs z-10">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search faculty..."
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
            {categories.map((teachCat) => (
              <option key={teachCat._id} value={teachCat._id}>
                {teachCat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-10">
        {paginatedData.length > 0 ? (
          <div className="border-gray-300 border-[1px] rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Department</th>
                  <th className="px-4 py-4 text-left">Position</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-5">{item.name}</td>
                    <td className="py-5">
                      <div className="inline-block text-[14px] bg-blue-50 border border-blue-500 text-blue-600 text-center py-[2px] px-3 rounded-2xl">
                        {item.teachCat
                          .map(
                            (catId) =>
                              teachCat.find((cat) => cat._id === catId)?.name ||
                              "Unknown"
                          )
                          .join(", ")}
                      </div>
                    </td>
                    <td className="px-4 py-5">{item.designation}</td>
                    <td className="px-4 py-5 flex gap-5">
                      <PiEye
                        className="text-blue-600 text-[20px] cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/faculty/${item.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          )
                        }
                      />
                      <FaRegEdit
                        className="text-yellow-500 text-[18px] cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/faculty/editFaculty?id=${item._id}`
                          )
                        }
                      />
                      <DeleteFaculty
                        sectionId={item._id}
                        setTeachDetails={setTeachDetails}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center ">No Faculty found for this filter.</p>
        )}
      </div>

      <div>
        {filteredData.length > limit && (
          <div className="flex flex-row justify-center items-center gap-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="flex justify-center items-center hover:shadow-md gap-2 border border-black rounded-xl hover:bg-gray-200
              py-3 px-4 transition-all duration-500 cursor-pointer"
            >
              <IoIosArrowBack />
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="flex flex-row-reverse justify-center items-center hover:shadow-md gap-2 border border-black rounded-xl hover:bg-gray-200
              py-3 px-4 transition-all duration-500 cursor-pointer"
            >
              <IoIosArrowForward />
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
