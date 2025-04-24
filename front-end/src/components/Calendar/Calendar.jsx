// Entry point che include le viste e lo switch tra esse
import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import YearView from "./YearView";

export default function Calendar() {
  const [currentView, setCurrentView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderView = () => {
    switch (currentView) {
      case "year":
        return <YearView onSelectDate={(date) => { setSelectedDate(date); setCurrentView("day"); }} />;
      case "month":
        return <MonthView onSelectDate={(date) => { setSelectedDate(date); setCurrentView("day"); }} currentDate={selectedDate} />;
      case "week":
        return <WeekView currentDate={selectedDate} onSelectDate={(date) => { setSelectedDate(date); setCurrentView("day"); }} />;
      case "day":
        return <DayView date={selectedDate} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-gray-50 p-4 rounded-t-xl shadow-md flex items-center justify-between">
        <CalendarHeader
          currentView={currentView}
          setCurrentView={setCurrentView}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="border rounded-b-xl shadow-md overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
}

