import { useState } from "react";
import { startOfWeek, addDays, format, setHours, setMinutes, isSameDay } from "date-fns";

export default function WeekView({ currentDate, onSelectDate }) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayHour, setSelectedDayHour] = useState(null);
  const [title, setTitle] = useState("");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleSlotClick = (day, hour) => {
    setSelectedDayHour({ day, hour });
    setShowModal(true);
  };

  const handleAddEvent = () => {
    const { day, hour } = selectedDayHour;
    const eventTime = setMinutes(setHours(new Date(day), hour), 0);
    setEvents([...events, { title, time: eventTime }]);
    setTitle("");
    setShowModal(false);
  };

  return (
    <div className="overflow-auto h-[calc(100vh-150px)]">
      <div className="grid grid-cols-8 border-b border-gray-200 bg-white">
        <div className="text-center font-semibold text-sm py-2 border-r border-gray-200">Time</div>
        {days.map((day, i) => (
          <div key={i} className="text-center font-semibold text-sm py-2 border-r border-gray-200">
            {format(day, "EEE d")}
          </div>
        ))}
      </div>

      {hours.map((hour) => (
        <div key={hour} className="grid grid-cols-8 border-b border-gray-200 h-16">
          <div className="text-xs text-gray-500 py-2 text-center py-1 border-r border-gray-200 bg-gray-50">{hour}:00</div>
          {days.map((day, i) => {
            const dayEvents = events.filter(e => isSameDay(e.time, day) && e.time.getHours() === hour);
            return (
              <div
                key={i}
                className="relative border-r border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSlotClick(day, hour)}
              >
                {dayEvents.map((e, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1 left-1 right-1 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                  >
                    {e.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-2">
              Add Event @ {selectedDayHour?.hour}:00 on {format(selectedDayHour?.day, "MMMM d, yyyy")}
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full border px-3 py-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
