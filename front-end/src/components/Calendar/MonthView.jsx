import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, format } from "date-fns";
import { it } from "date-fns/locale";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function MonthView({ currentDate, onSelectDate }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // La settimana inizia di lunedì
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    const cloneDay = day;
    days.push(
      <div
        key={day}
        onClick={() => onSelectDate(cloneDay)}
        className={`h-28 p-2 text-sm cursor-pointer border border-gray-200 transition ${
          !isSameMonth(day, monthStart)
            ? "bg-gray-50 text-gray-400"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="flex justify-end">
          <div
            className={`w-6 h-6 text-center text-xs font-medium leading-6 rounded-full ${
              isToday(day) ? "bg-indigo-600 text-white" : "text-gray-700"
            }`}
          >
            {format(day, "d", { locale: it })} {/* Giorno del mese */}
          </div>
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
        {weekdays}
      </div>
      {/* Giorni del mese */}
      <div className="grid grid-cols-7 border-t border-gray-200">
        {days}
      </div>
    </div>
  );
}