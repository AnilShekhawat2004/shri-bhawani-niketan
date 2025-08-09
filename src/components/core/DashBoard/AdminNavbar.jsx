import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../../../assets/Logo/Apply Logo.png"

function AdminNavBar({toggleSidebar}) {
    return(
        <div className="w-full h-[75px] inset-0 fixed flex shadow-sm border-b border-gray-300 bg-white pl-5 pr-5 top-0 z-50">
             <div className="flex flex-row items-center justify-center mr-10 h-[60%] w-[3%] mt-2 rounded-full hover:bg-gray-200 transition-all duration-500">
                <RxHamburgerMenu 
                 onClick={toggleSidebar}
                 className="text-[25px] cursor-pointer"/>
             </div>
             <div className="flex flex-row gap-1 items-center mt-1 w-[20%] h-[80%]">
                <img
                    src={Logo}
                    alt="Logo"
                    loading="lazy"
                    className="w-[30%] "
                />
                <p className="font-m1 text-center mt-2 text-[35px] font-bold">Admin</p>
             </div>
        </div>
    )
}

export default AdminNavBar