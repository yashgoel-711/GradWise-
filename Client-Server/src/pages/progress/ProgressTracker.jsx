import React, { useEffect, useState } from "react";
import { openAiService } from "../../services/openAi.services.js";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const progressService = new openAiService();

const ProgressTrackerPage = () => {
  const studentInfo = useSelector((state) => state.trackAuth.studentData);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!studentInfo) return;

      try {
        const response = await progressService.AiData(studentInfo);
        const roadmap = response?.data?.data?.roadmap || [];

        // Filter out unwanted values like "bullets"
        const filteredTasks = roadmap.filter((task) => task !== "bullets");

        setTasks(filteredTasks);

        const initialChecked = {};
        filteredTasks.forEach((_, idx) => {
          initialChecked[idx] = false;
        });
        setChecked(initialChecked);
      } catch (err) {
        console.error("Error fetching AI roadmap:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentInfo]);

  const handleCheckboxChange = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading roadmap...</span>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="text-center text-gray-500 mt-20">
        <p>No roadmap found for the current student.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📌 Career Progress Tracker</h2>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => handleCheckboxChange(index)}
                className="mt-1 accent-indigo-500"
              />
              <span className={`${checked[index] ? "line-through text-gray-400" : "text-gray-700"} text-base`}>
                {task.replace(/\*\*/g, "").trim()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
