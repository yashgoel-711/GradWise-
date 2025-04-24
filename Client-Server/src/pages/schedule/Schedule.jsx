import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleAddEvent = () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));
    setNewEvent("");
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center py-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        const dateKey = format(day, "yyyy-MM-dd");
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        days.push(
          <div
            key={day}
            onClick={() => handleDateClick(cloneDay)}
            className={`p-2 text-center rounded-lg cursor-pointer border transition-all duration-200 ease-in-out
              ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}
              ${isToday ? "bg-blue-100" : ""}
              ${isSelected ? "bg-indigo-300 text-white" : "hover:bg-indigo-100"}`}
          >
            <div>{formattedDate}</div>
            {events[dateKey] && events[dateKey].length > 0 && (
              <div className="mt-1 h-1 w-1 mx-auto rounded-full bg-indigo-500"></div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  const renderSidebar = () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return (
      <div className="p-4 w-full md:w-1/3 bg-white rounded-xl shadow-md">
        <h3 className="font-bold mb-2">Tasks for {format(selectedDate, "PPP")}:</h3>
        <ul className="mb-4 space-y-1">
          {(events[dateKey] || []).map((event, idx) => (
            <li key={idx} className="text-sm bg-gray-100 p-2 rounded">{event}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Add new task"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddEvent}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Add Task
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      <div className="flex-1">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {renderSidebar()}
    </div>
  );
};

export default Schedule;
