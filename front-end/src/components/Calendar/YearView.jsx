import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday } from "date-fns";
import { it } from "date-fns/locale";
import { useState } from "react";

// Funzione per capitalizzare la prima lettera
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function YearView({ currentDate, onSelectDate }) {
  const renderMonthGrid = (monthIndex) => {
    const baseDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    const monthStart = startOfMonth(baseDate);
    const monthEnd = endOfMonth(baseDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div key={monthIndex} className="bg-white p-2 rounded-lg shadow border border-gray-200">
        {/* Nome del mese */}
        <div className="text-center text-sm font-semibold mb-2">
          {capitalize(format(baseDate, "MMMM", { locale: it }))}
        </div>

        {/* Giorni della settimana */}
        <div className="grid grid-cols-7 text-[10px] text-gray-500 font-medium mb-1">
          {["L", "M", "M", "G", "V", "S", "D"].map((d, i) => (
            <div key={i} className="text-center py-1">{d}</div>
          ))}
        </div>

        {/* Giorni del mese */}
        <div className="grid grid-cols-7 text-[11px]">
          {days.map((day, i) => (
            <div
              key={i}
              onClick={() => onSelectDate(day)}
              className={`text-center py-1 cursor-pointer transition text-gray-700 border border-gray-200 ${
                !isSameMonth(day, monthStart)
                  ? "bg-gray-50 text-gray-300"
                  : isToday(day)
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {format(day, "d", { locale: it })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white shadow border border-gray-200 p-4">
      {/* Griglia dei mesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => renderMonthGrid(i))}
      </div>
    </div>
  );
}