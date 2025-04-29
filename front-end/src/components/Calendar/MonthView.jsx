import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, isSameDay, format, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import { useEffect, useState } from "react";
import axios from "axios";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function MonthView({ currentDate, onSelectDate }) {
  const [appointments, setAppointments] = useState([]);

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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    const cloneDay = day;
    days.push(
      <div
        key={day}
        onClick={() => onSelectDate(cloneDay)}
        className={`h-28 p-2 text-sm cursor-pointer border border-gray-200 transition ${!isSameMonth(day, monthStart)
            ? "bg-gray-50 text-gray-400"
            : "bg-white hover:bg-gray-50"
          }`}
      >
        <div className="flex justify-end">
          <div
            className={`w-6 h-6 text-center text-xs font-medium leading-6 rounded-full ${isToday(day) ? "bg-indigo-600 text-white" : "text-gray-700"
              }`}
          >
            {format(day, "d", { locale: it })}
          </div>
        </div>
        <div className="mt-2 space-y-1">
          {/* Mostra gli appuntamenti per il giorno corrente */}
          {Array.isArray(appointments) &&
            appointments
              .filter((appointment) => isSameDay(parseISO(appointment.data_appuntamento), day))
              .map((appointment, index) => {
                const startTime = parseISO(appointment.data_appuntamento);
                const duration = appointment.durata_minuti / 60; // Durata in ore

                return (
                  <div
                    key={index}
                    className="bg-indigo-500 text-white text-xs rounded px-1 truncate"
                    style={{
                      height: "20px", // Altezza fissa per ogni appuntamento
                      width: `${Math.min(duration * 100, 100)}%`, // Larghezza proporzionale alla durata
                    }}
                    title={`${appointment.cliente_nome}: ${format(startTime, "HH:mm")} (${appointment.durata_minuti} minuti)`}
                  >
                    {appointment.cliente_nome}
                  </div>
                );
              })}
        </div>
      </div>
    );
    day = addDays(day, 1);
  }

  const weekdays = Array.from({ length: 7 }).map((_, idx) => (
    <div
      key={idx}
      className="text-center text-xs font-medium text-gray-500 py-3 border-b border-gray-200 bg-white"
    >
      {capitalize(format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), idx), "EEEEEE", { locale: it }))} {/* Giorni della settimana */}
    </div>
  ));

  return (
    <div className="w-full border border-gray-200 bg-white shadow overflow-hidden">
      {/* Giorni della settimana */}
      <div className="grid grid-cols-7">
        {["L", "M", "M", "G", "V", "S", "D"].map((d, i) => (
          <div key={i} className="text-center text-xs font-medium text-gray-500 py-3 border-b border-gray-200 bg-white">
            {d}
          </div>
        ))}
      </div>
      {/* Giorni del mese */}
      <div className="grid grid-cols-7 border-t border-gray-200">
        {days}
      </div>
    </div>
  );
}