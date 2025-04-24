import { format, addMonths, subMonths } from "date-fns";

export default function CalendarHeader({ currentView, setCurrentView, setSelectedDate }) {
  const today = new Date();

  return (
    <div className="mb-4 w-full">
      <h2 className="text-xl py-3 font-semibold text-gray-800 mb-2">Calendario</h2>

      {/* Riga superiore: navigazione + mese */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="ml-2 font-semibold text-base text-gray-700">
            {format(today, "MMMM yyyy")}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setSelectedDate(prev => subMonths(prev, 1))}
            className="px-2 py-1 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
          >
            ←
          </button>

          <button
            onClick={() => setSelectedDate(today)}
            className="px-2 py-1.5 text-sm bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
          >
            Oggi
          </button>

          <button
            onClick={() => setSelectedDate(prev => addMonths(prev, 1))}
            className="px-2 py-1 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
          >
            →
          </button>
          <select
            className="px-2 py-1.5 text-sm bg-gray-200 rounded text-gray-800"
            value={currentView}
            onChange={(e) => setCurrentView(e.target.value)}
          >
            <option value="year">Anno</option>
            <option value="month">Mese</option>
            <option value="week">Settimana</option>
            <option value="day">Giorno</option>
          </select>

          <button className="bg-indigo-600 text-sm text-white px-4 py-1.5 rounded hover:bg-indigo-700">
            Aggiungi evento
          </button>
        </div>
      </div>

      {/* Riga separata: selettore e aggiungi evento, allineati a destra */}

    </div>
  );
}

