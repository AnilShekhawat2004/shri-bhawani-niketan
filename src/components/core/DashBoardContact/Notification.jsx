import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  getUnseenContact,
  markingSeenContact,
} from "../../../services/operations/contactUs";

function DashboardNotification() {
  const [bellOpen, setBellOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const UnseenContactCount = async () => {
      try {
        const res = await getUnseenContact();
        setUnseenCount(res?.unseenCount);
        setNotification(res?.recentNotification);
      } catch (error) {
        console.log("Error in getting notification count : ", error);
      }
    };

    UnseenContactCount();
  }, []);

  const contactNotification = async (prevNotifications = notification) => {
    const prev = prevNotifications.slice();
    setNotification(prev.map((n) => ({ ...n, seen: true })));
    setUnseenCount(0);

    try {
      const res = await markingSeenContact();
      if (!res?.success) {
        setNotification(prev);
        setUnseenCount(prev.filter((n) => !n.seen).length);
      }
    } catch (err) {
      console.error("Error while mark seen:", err);
      setNotification(prev);
      setUnseenCount(prev.filter((n) => !n.seen).length);
    }
  };

  const toggleBell = () => {
    setBellOpen((prev) => {
      const willOpen = !prev;
      if (!prev && unseenCount > 0) {
        contactNotification();
      }
      return willOpen;
    });
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={toggleBell}
        className="relative py-3 px-3 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-500"
      >
        <IoNotificationsOutline className="text-[25px] font-bold" />
        {unseenCount > 0 && (
          <span className="absolute text-center bg-red-500 text-white px-[7px] py-[1px] text-[12px] rounded-full -translate-y-8 translate-x-3">
            {unseenCount}
          </span>
        )}
      </div>

      {bellOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-96 overflow-y-auto bg-white shadow-lg border rounded-lg z-50">
          {notification.length > 0 ? (
            notification.map((item, index) => (
              <div
                onClick={() => navigate(`/dashboard/contact/${item._id}`)}
                key={item._id ?? index}
                className={`p-3 border-b last:border-none hover:bg-gray-200 transition-all duration-300 cursor-pointer ${
                  item.seen ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex gap-1 text-md text-gray-800">
                  <p>{item.firstName ?? "New message"}</p>
                  <p>{item.lastName}</p>
                </div>

                <p className="text-sm">{item.subject}</p>
                <span className="text-xs text-gray-500">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-500">No notifications</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardNotification;
