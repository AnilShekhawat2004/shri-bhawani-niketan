import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";

export default function MobileDropDown({
  className,
  title,
  titleClassName,
  item = [],
  iconClassName,
  closeMenu,
  openClassName,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

  return (
    <div ref={dropdownRef} className={` ${className}`}>
      <div>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className={`w-full flex items-center uppercase justify-between text-[17px] border-b border-gray-300 ${titleClassName} 
                      ${openDropdown ? "text-bhawaniYellow" : "text-white"}`}
        >
          <span>{title}</span>
          <IoMdArrowDropdown
            className={`transition-transform text-bhawaniYellow duration-300 ${
              openDropdown ? "rotate-180" : ""
            } ${iconClassName}`}
          />
        </button>

        <AnimatePresence>
          {openDropdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-4 mt-2 flex flex-col space-y-2"
            >
              {item.map((item, index) => (
                <Link key={index} to={item.link} onClick={closeMenu} >
                  <li className="list-none px-3">
                    <p className={`py-2 cursor-pointer uppercase text-[15px] text-white`}>
                      {item.label}
                    </p>
                  </li>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
