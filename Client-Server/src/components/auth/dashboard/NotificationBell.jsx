import { Bell } from "lucide-react";
import { useState } from "react";

export const NotificationBell = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-10">
          <div className="p-4 border-b font-semibold">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n, idx) => (
                <li key={idx} className={`p-4 border-b hover:bg-gray-100 ${!n.read ? "bg-gray-50" : ""}`}>
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-sm text-gray-500">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

