import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  format,
  addDays,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { addNotification } from "../../store/features/notificationSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router'
import ChatBot from "../../components/chatbot/ChatBot"


const Schedule = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);
  const Navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleAddEvent = () => {
    if (!newEvent.trim()) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");

    const message = `Task "${newEvent}" added to ${format(selectedDate, "PPP")}`;
    toast.success(message);
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message,
      })
    );

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent.trim()],
    }));
    setNewEvent("");
  };

  const handleDeleteEvent = (index) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const updatedEvents = [...(events[dateKey] || [])];
    const eventToDelete = updatedEvents[index];

    updatedEvents.splice(index, 1);

    const message = `Task "${eventToDelete}" deleted from ${format(selectedDate, "PPP")}`;
    toast.error(message);
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message,
      })
    );

    setEvents((prev) => ({
      ...prev,
      [dateKey]: updatedEvents,
    }));

    if (editingIndex === index) {
      setEditingIndex(null);
      setEditedText("");
    }
  };

  const handleEditEvent = (index) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const taskToEdit = events[dateKey][index];
    setEditingIndex(index);
    setEditedText(taskToEdit);
  };

  const handleSaveEdit = () => {
    if (!editedText.trim()) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const updatedEvents = [...(events[dateKey] || [])];
    updatedEvents[editingIndex] = editedText.trim();

    const message = `Task updated to "${editedText}" on ${format(selectedDate, "PPP")}`;
    toast.info(message);
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message,
      })
    );

    setEvents((prev) => ({
      ...prev,
      [dateKey]: updatedEvents,
    }));
    setEditingIndex(null);
    setEditedText("");
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
            className={`p-2 text-center rounded-lg cursor-pointer border transition-all duration-200 ease-in-out min-h-[80px]
              ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""} 
              ${isToday ? "bg-blue-100" : ""} 
              ${isSelected ? "bg-indigo-300 text-white" : "hover:bg-indigo-100"}`}
          >
            <div>{formattedDate}</div>
            {events[dateKey] && events[dateKey].length > 0 && (
              <div className="mt-1 text-xs font-semibold text-indigo-600">
                {events[dateKey].length} Task{events[dateKey].length > 1 ? "s" : ""}
              </div>
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
        <div className="mb-4 max-h-60 overflow-y-auto space-y-2 pr-1">
          {(events[dateKey] || []).map((event, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded text-sm break-words">
              {editingIndex === idx ? (
                <div className="w-full">
                  <input
                    className="w-full p-1 border rounded text-sm mb-2"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveEdit}
                      className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-xs"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-full break-words mb-2">{event}</div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditEvent(idx)}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(idx)}
                      className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add new task"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAddEvent}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full"
          >
            Add Task
          </button>
        </div>
        <ChatBot />
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Schedule;
