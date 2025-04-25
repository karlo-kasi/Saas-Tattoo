import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths, addYears, subYears } from "date-fns";
import { it } from "date-fns/locale";

// Funzione per capitalizzare la prima lettera
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function CalendarHeader({ currentView, setCurrentView, selectedDate, setSelectedDate }) {
  const today = new Date();

  const handlePrevious = () => {
    setSelectedDate((prev) => {
      switch (currentView) {
        case "year":
          return subYears(prev, 1); // Vai indietro di un anno
        case "month":
          return subMonths(prev, 1); // Vai indietro di un mese
        case "week":
          return subWeeks(prev, 1); // Vai indietro di una settimana
        case "day":
          return subDays(prev, 1); // Vai indietro di un giorno
        default:
          return prev;
      }
    });
  };

  const handleNext = () => {
    setSelectedDate((prev) => {
      switch (currentView) {
        case "year":
          return addYears(prev, 1); // Vai avanti di un anno
        case "month":
          return addMonths(prev, 1); // Vai avanti di un mese
        case "week":
          return addWeeks(prev, 1); // Vai avanti di una settimana
        case "day":
          return addDays(prev, 1); // Vai avanti di un giorno
        default:
          return prev;
      }
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-xl py-3 font-semibold text-gray-800 mb-2">Calendario</h2>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-black min-w-[120px]">
            {selectedDate
              ? capitalize(format(selectedDate, currentView === "year" ? "yyyy" : currentView === "month" ? "MMMM yyyy" : currentView === "week" ? "MMMM yyyy" : "d MMMM yyyy", { locale: it }))
              : ""}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {/* Pulsante Precedente */}
          <button
            onClick={handlePrevious}
            className="px-2 py-1 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
          >
            ←
          </button>

          {/* Pulsante Oggi */}
          <button
            onClick={() => setSelectedDate(today)}
            className="px-2 py-1.5 text-sm bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
          >
            Oggi
          </button>

          {/* Pulsante Successivo */}
          <button
            onClick={handleNext}
            className="px-2 py-1 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
          >
            →
          </button>

          {/* Selettore della vista */}
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
        </div>
      </div>
    </div>
  );
}


