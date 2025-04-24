import { format, addMonths, subMonths } from "date-fns";

export default function CalendarHeader({ currentView, setCurrentView, setSelectedDate }) {
  const today = new Date();

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedDate(prev => subMonths(prev, 1))}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ←
        </button>

        <button
          onClick={() => setSelectedDate(today)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Today
        </button>

        <button
          onClick={() => setSelectedDate(prev => addMonths(prev, 1))}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          →
        </button>
      </div>

      <div className="ml-4 font-semibold text-lg">
        {format(today, "MMMM yyyy")}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <select
          className="border px-2 py-1 rounded"
          value={currentView}
          onChange={(e) => setCurrentView(e.target.value)}
        >
          <option value="year">Year view</option>
          <option value="month">Month view</option>
          <option value="week">Week view</option>
          <option value="day">Day view</option>
        </select>

        <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
          Add event
        </button>
      </div>
    </div>
  );
}
