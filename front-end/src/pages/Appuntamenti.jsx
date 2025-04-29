import axios from "axios";
import { useEffect, useState } from "react";
export default function Appuntamenti() {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
          try {
            const token = localStorage.getItem("token"); // Recupera il token da localStorage
            if (!token) {
              console.error("Token is missing");
              return;
            }
            const response = await axios.get("http://localhost:3000/api/app/calendar", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Dati ricevuti:", response.data); // Verifica i dati ricevuti
            setAppointments(Array.isArray(response.data) ? response.data : []); // Imposta un array vuoto se la risposta non è un array
          } catch (error) {
            console.error("Errore nel recupero degli appuntamenti:", error);
            setAppointments([]); // Imposta un array vuoto in caso di errore
          }
        };
    
        fetchAppointments();
      }, []);

    return (
        <div>
            <h1>Numero appuntamenti: {appointments.length}</h1>
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index} className="border-b border-gray-200 py-2">
                  <div className="font-semibold">{appointment.cliente_nome}</div>
                  <div className="text-sm text-gray-500">{appointment.data_appuntamento}</div>
                  <div className="text-sm text-gray-500">{appointment.durata}</div>
                </li>
              ))}
            </ul>
        </div>
    );
}