import React from "react";
import { useSelector } from "react-redux";

const WelcomeBanner = () => {
  const studentName = useSelector((state) => state.trackAuth.studentData.name);

  return (
    <div className="rounded-2xl shadow-md bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white mb-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
        Welcome back, {studentName}! 🎓
      </h1>
      <p className="text-sm md:text-base opacity-90">
        Let’s keep up the momentum. Check your progress or explore new opportunities today!
      </p>
    </div>
  );
};

export default WelcomeBanner;
