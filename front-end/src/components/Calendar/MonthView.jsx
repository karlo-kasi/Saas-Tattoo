import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, format } from "date-fns";

export default function MonthView({ currentDate, onSelectDate }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, "d");
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
              {formattedDate}
            </div>
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
  }

  const weekdays = Array.from({ length: 7 }).map((_, idx) => (
    <div
      key={idx}
      className="text-center text-xs font-medium text-gray-500 py-3 border-b border-gray-200 bg-white"
    >
      {format(addDays(startOfWeek(new Date()), idx), "EEE")}
    </div>
  ));

  return (
    <div className="w-full border border-gray-200 bg-white shadow overflow-hidden">
      <div className="grid grid-cols-7">
        {weekdays}
      </div>
      <div className="grid grid-cols-7 border-t border-gray-200">
        {days}
      </div>
    </div>
  );
}