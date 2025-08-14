import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  power,
  errors,
  setValue,
  getValues,
}) {
  const { editTeacher, teacher } = useSelector((state) => state.teacher);

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editTeacher) {
      const rawHobbies = teacher?.SubSection?.[0]?.[name] || [];
      // Ensure it's always an array
      const hobbiesArray = Array.isArray(rawHobbies)
        ? rawHobbies
        : typeof rawHobbies === "string" && rawHobbies.trim() !== ""
        ? rawHobbies.split(",").map((h) => h.trim())
        : [];
      setChips(hobbiesArray);
    }
    register(name);
  }, [editTeacher, name, register, teacher.SubSection]);

  useEffect(() => {
    setValue(name, chips);
  }, [chips, name, setValue]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const chipValue = event.target.value.trim();

      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
        <span className="text-red-500">*</span>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {Array.isArray(chips) &&
          chips.map((chip, index) => (
            <div
              key={index}
              className="m-1 flex items-center rounded-full bg-bhawaniDark px-2 py-1 text-sm text-white"
            >
              {chip}

              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => handleDeleteChip(index)}
              >
                <MdClose className="text-sm text-white" />
              </button>
            </div>
          ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-input-style"
        />
      </div>
    </div>
  );
}
