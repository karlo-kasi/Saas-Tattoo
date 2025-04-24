import { startOfYear, addMonths, format, startOfMonth } from "date-fns";

export default function YearView({ onSelectDate }) {
  const start = startOfYear(new Date());
  const months = Array.from({ length: 12 }, (_, i) => addMonths(start, i));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {months.map((month, i) => (
        <div
          key={i}
          className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-50 border"
          onClick={() => onSelectDate(startOfMonth(month))}
        >
          <div className="text-center text-lg font-semibold text-indigo-700">
            {format(month, "MMMM yyyy")}
          </div>
          <div className="grid grid-cols-7 text-xs text-gray-500 mt-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
              <div key={idx} className="text-center font-medium">{d}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
