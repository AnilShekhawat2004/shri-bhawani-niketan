import React, { useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

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
    <div ref={dropdownRef} className={` ${className}`}>
      <div
        className="flex flex-row items-center justify-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <button
          className={`relative transition-all duration-500 ${titleClassName}`}
        >
          {title}
        </button>

        <IoIosArrowDown className={`${iconClassName}`} />
      </div>

      {open && (
        <div
          className={`absolute top-full flex flex-row items-center justify-center 
                   gap-20 left-0 bg-white translate-y-[15px] border w-[260px] h-[250px] z-10 
                   rounded-b-md overflow-hidden ${openClassName}`}
        >
          <ul>
            {item.map((item, index) => (
              <Link key={index} to={item.link}
                onClick={() => setOpen(false)}
              >
                <li>
                  <p className="py-2 cursor-pointer font-m1 text-center text-[18px] lg:hover:text-bhawaniDark transition-all duration-500 text-gray-500">
                    {item.label}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admission;
