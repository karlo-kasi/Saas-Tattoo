import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, isSameMonth, isToday } from "date-fns";

export default function YearView({ currentDate, onSelectDate }) {
  const renderMonthGrid = (monthIndex) => {
    const baseDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    const monthStart = startOfMonth(baseDate);
    const monthEnd = endOfMonth(baseDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div key={monthIndex} className="bg-white p-2 rounded-lg shadow border border-gray-200">
        <div className="text-center text-sm font-semibold mb-2">
          {format(baseDate, "MMMM")}
        </div>
        <div className="grid grid-cols-7 text-[10px] text-gray-500 font-medium mb-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
            <div key={d} className="text-center py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-[11px]">
          {days.map((day, i) => (
            <div
              key={i}
              onClick={() => onSelectDate(day)}
              className={`text-center py-1 rounded cursor-pointer transition text-gray-700 ${
                !isSameMonth(day, monthStart)
                  ? "text-gray-300"
                  : isToday(day)
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white shadow border border-gray-200 p-4">
      <div className="text-xl font-semibold text-gray-800 mb-4">
        {format(currentDate, "yyyy")}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => renderMonthGrid(i))}
      </div>
    </div>
  );
}
