// Entry point che include le viste e lo switch tra esse
import { useState, useEffect } from "react";
import axios from "axios";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import YearView from "./YearView";

export default function Calendar() {

  const [appuntamenti, setAppuntamenti] = useState([]);
  const [currentView, setCurrentView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token"); // Recupera il token da localStorage
    if (!token) {
      console.error("Token is missing");
      return;
    }

    axios
      .get("http://localhost:3000/api/app/calendar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAppuntamenti(response.data); // Imposta i dati ricevuti
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(appuntamenti);

  const renderView = () => {
    switch (currentView) {
      case "year":
        return (
          <YearView
            currentDate={selectedDate} // Passa la currentDate
            onSelectDate={(date) => {
              setSelectedDate(date);
              setCurrentView("day");
            }}
          />
        );
      case "month":
        return (
          <MonthView
            onSelectDate={(date) => {
              setSelectedDate(date);
              setCurrentView("day");
            }}
            currentDate={selectedDate}
          />
        );
      case "week":
        return (
          <WeekView
            currentDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setCurrentView("day");
            }}
          />
        );
      case "day":
        return <DayView date={selectedDate} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 p-4 rounded-t-xl shadow-md flex items-center justify-between">
        <CalendarHeader
          currentView={currentView}
          selectedDate={selectedDate}
          setCurrentView={setCurrentView}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="rounded-b-xl shadow-md overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
}

