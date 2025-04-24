import React from "react";
import { X, Bell, CheckCircle, Info, AlertTriangle } from "lucide-react";

const iconMap = {
  info: <Info className="text-blue-500" />,
  success: <CheckCircle className="text-green-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
  default: <Bell className="text-gray-500" />
};

const Notification = ({ type = "default", message, timestamp, onClose }) => {
  return (
    <div className="flex items-start gap-3 bg-white shadow-lg border border-gray-200 p-4 rounded-2xl animate-fade-in-down">
      <div className="mt-1">{iconMap[type] || iconMap.default}</div>
      <div className="flex-1">
        <p className="text-gray-800 font-medium">{message}</p>
        {timestamp && (
          <p className="text-sm text-gray-400 mt-1">{timestamp}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-red-400 transition"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;
