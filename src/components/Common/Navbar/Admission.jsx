import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

function Admission({
  className,
  title,
  titleClassName,
  item = [],
  iconClassName,
  openClassName,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <button
          className={`relative transition-all duration-500 ${titleClassName}`}
        >
          {title}
        </button>

        <IoIosArrowDown
          className={`${iconClassName} transition-all duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-white translate-y-[17px] border 
      w-[260px] z-10 rounded-b-md shadow-md overflow-hidden ${openClassName}`}
        >
          <ul>
            {item.map((item, index) => (
              <li key={index}>
                <Link to={item.link} onClick={() => setOpen(false)}>
                  <p className="py-2 cursor-pointer font-m1 text-center text-[18px] lg:hover:text-bhawaniDark transition-all duration-300 text-gray-500">
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admission;
