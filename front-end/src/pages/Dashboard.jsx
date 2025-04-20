import DashboardOverview from "../components/DashboardOverview"

export default function Dashboard() {
    return (
      <div className="p-6">
        <DashboardOverview />
        {/* Qui possiamo mettere i grafici, attività recenti, ecc. */}
      </div>
    )
  }