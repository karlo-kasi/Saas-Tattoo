import { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, isSameDay, format } from "date-fns";
import { it } from "date-fns/locale";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function DayView({ date, onSelectDate }) {
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
    const eventTime = new Date(date);
    eventTime.setHours(selectedHour, 0, 0, 0);
    setEvents([...events, { title, time: eventTime }]);
    setTitle("");
    setShowModal(false);
  };

  // Calcolo del mese corrente per il mini calendario
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="flex h-full">
      {/* Dettaglio del giorno */}
      <div className="w-3/4">
        <div className="text-lg px-4 py-2 border-l border-r border-b border-gray-300 text-gray-400 bg-white">
          {capitalize(format(date, "EEEE", { locale: it }))}
        </div>
        <div className="divide-y h-[calc(100vh-150px)] overflow-y-auto">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 px-4 py-2 cursor-pointer border-gray-300 hover:bg-gray-100 relative"
              onClick={() => handleHourClick(hour)}
            >
              <div className="text-xs px-3 text-gray-500 absolute left-1 top-2">{hour}:00</div>
              {events
                .filter((e) => e.time.getHours() === hour)
                .map((e, i) => (
                  <div key={i} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                    {e.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mini calendario */}
      <div className="w-1/4 bg-white shadow border border-gray-200 p-4">
        <div className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {capitalize(format(date, "MMMM yyyy", { locale: it }))}
        </div>
        <div className="grid grid-cols-7 text-xs font-medium text-gray-500 mb-2">
          {["L", "M", "M", "G", "V", "S", "D"].map((d, i) => (
            <div key={i} className="text-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, i) => (
            <div
              key={i}
              onClick={() => onSelectDate(day)}
              className={`text-center py-1 cursor-pointer rounded ${
                isSameDay(day, date)
                  ? "bg-indigo-700 text-white" // Giorno selezionato
                  : isToday(day)
                  ? "bg-indigo-200 text-indigo-800" // Giorno attuale
                  : !isSameMonth(day, monthStart)
                  ? "text-gray-300" // Giorni fuori dal mese corrente
                  : "hover:bg-gray-100 text-gray-700" // Giorni normali
              }`}
            >
              {format(day, "d", { locale: it })}
            </div>
          ))}
        </div>
      </div>

      {/* Modale per aggiungere eventi */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Aggiungi evento</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titolo evento"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Annulla
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}