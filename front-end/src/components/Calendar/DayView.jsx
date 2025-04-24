import { useState } from "react";
import { format, setHours, setMinutes } from "date-fns";

export default function DayView({ date }) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [title, setTitle] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    const eventTime = setMinutes(setHours(new Date(date), selectedHour), 0);
    setEvents([...events, { title, time: eventTime }]);
    setTitle("");
    setShowModal(false);
  };

  return (
    <div className="flex h-full">
      <div className="w-3/4">
        <div className="text-lg font-semibold px-4 py-2 border-b bg-white">
          {format(date, "EEEE, MMMM d, yyyy")}
        </div>
        <div className="divide-y h-[calc(100vh-150px)] overflow-y-auto">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 px-4 py-2 cursor-pointer hover:bg-gray-100 relative"
              onClick={() => handleHourClick(hour)}
            >
              <div className="text-xs text-gray-500 absolute left-1 top-2">{hour}:00</div>
              {events
                .filter((e) => e.time.getHours() === hour)
                .map((e, i) => (
                  <div key={i} className="ml-12 text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded inline-block">
                    {e.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/4 border-l p-4 bg-gray-50 hidden lg:block">
        <div className="text-center font-medium mb-2">Mini calendar</div>
        {/* Qui potrai aggiungere un mini calendar futuro */}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-2">Add Event @ {selectedHour}:00</h2>
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