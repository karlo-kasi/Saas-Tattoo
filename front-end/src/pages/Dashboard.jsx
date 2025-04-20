import axios from "axios"
import { useState, useEffect} from "react"


//componenti
import DashboardOverview from "../components/DashboardOverview"

export default function Dashboard() {

    const [kpiData, setKpiData] = useState({
        fatturatoTotale: 0,
        clientiNuovi: 0,
        spesaMedia: 0,
        appuntamentiCompletati: 0,
      });
      const [range, setRange] = useState("30d");
    
      useEffect(() => {
        const token = localStorage.getItem("token");
    
        axios
          .get(`http://localhost:3000/api/app/kpi?range=${range}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setKpiData(res.data); // Imposta i dati ricevuti
          })
          .catch((err) => {
            console.error("Errore nella richiesta:", err);
          });
      }, [range]);
    
      return (
        <div className="p-6">
          {/* Passa i dati come props */}
          <DashboardOverview kpiData={kpiData} setRange={setRange} range={range}/>
          {/* Qui possiamo mettere i grafici, attività recenti, ecc. */}
        </div>
      );
  }