import React, { useEffect, useState } from "react";
import { openAiService } from "../../../services/openAi.services.js";
import { useSelector } from "react-redux";

const progressService = new openAiService();

const ProgressTracker = () => {
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

        // Initialize checked state for all tasks
        const initialState = {};
        filteredTasks.forEach((_, idx) => {
          initialState[idx] = false;
        });
        setChecked(initialState);
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

  if (loading) return <p>Loading roadmap...</p>;
  if (!tasks.length) return <p>No roadmap found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">Career Roadmap</h2>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() => handleCheckboxChange(index)}
              className="mt-1"
            />
            <span className={checked[index] ? "line-through text-gray-500" : ""}>
              {task.replace(/\*\*/g, "").trim()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker;
