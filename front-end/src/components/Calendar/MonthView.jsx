import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, format } from "date-fns";

export default function MonthView({ currentDate, onSelectDate }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`h-24 border p-1 text-sm cursor-pointer relative hover:bg-gray-100 transition ${
            !isSameMonth(day, monthStart) ? "bg-gray-50 text-gray-400" : "bg-white"
          }`}
          key={day}
          onClick={() => onSelectDate(cloneDay)}
        >
          <div className={`font-medium w-6 h-6 text-center rounded-full ${
            isSameDay(day, new Date()) ? "bg-indigo-600 text-white" : "text-gray-700"
          }`}>
            {formattedDate}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  const weekdays = Array.from({ length: 7 }).map((_, idx) => (
    <div key={idx} className="text-center text-xs font-semibold text-gray-500 py-1">
      {format(addDays(startOfWeek(new Date()), idx), "EEE")}
    </div>
  ));

  return (
    <div className="bg-white">
      <div className="grid grid-cols-7 border-t border-b py-1">
        {weekdays}
      </div>
      <div>{rows}</div>
    </div>
  );
}