import { useEffect, useState } from "react";
import { startOfWeek, addDays, setHours, setMinutes, isSameDay, format, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import axios from "axios";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function WeekView({ currentDate, onSelectDate }) {
  const [events, setEvents] = useState([]);
  const [appointments, setAppointments] = useState([]); // Stato per gli appuntamenti dal database
  const [showModal, setShowModal] = useState(false);
  const [selectedDayHour, setSelectedDayHour] = useState(null);
  const [title, setTitle] = useState("");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token"); // Recupera il token da localStorage
        if (!token) {
          console.error("Token is missing");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/app/calendar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Dati ricevuti:", response.data); // Verifica i dati ricevuti
        setAppointments(Array.isArray(response.data) ? response.data : []); // Imposta un array vuoto se la risposta non è un array
      } catch (error) {
        console.error("Errore nel recupero degli appuntamenti:", error);
        setAppointments([]); // Imposta un array vuoto in caso di errore
      }
    };

    fetchAppointments();
  }, []);

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
        <div className="text-center font-semibold text-sm py-2 border-r border-gray-200">Orario</div>
        {days.map((day, i) => (
          <div key={i} className="text-center font-semibold text-sm py-2 border-r border-gray-200">
            {capitalize(format(day, "EEE", { locale: it }))} {format(day, "d")}
          </div>
        ))}
      </div>

      {hours.map((hour) => (
        <div key={hour} className="grid grid-cols-8 border-b border-gray-200 h-16">
          <div className="text-xs text-gray-500 py-2 text-center py-1 border-r border-gray-200 bg-gray-50">{hour}:00</div>
          {days.map((day, i) => {
            // Filtra gli appuntamenti per il giorno e l'ora corrente
            const dayAppointments = appointments.filter(
              (appointment) =>
                isSameDay(parseISO(appointment.data_appuntamento), day) &&
                parseISO(appointment.data_appuntamento).getHours() === hour
            );

            return (
              <div
                key={i}
                className="relative border-r border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSlotClick(day, hour)}
              >
                {dayAppointments.map((appointment, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1 left-1 right-1 bg-indigo-500 text-white text-xs px-2 py-1 rounded truncate"
                    title={`${appointment.cliente_nome}: ${format(
                      parseISO(appointment.data_appuntamento),
                      "HH:mm"
                    )} (${appointment.durata_minuti} minuti)`}
                  >
                    {appointment.cliente_nome}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}

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
