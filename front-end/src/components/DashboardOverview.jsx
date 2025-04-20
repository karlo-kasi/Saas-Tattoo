import { SlidersHorizontal } from "lucide-react";

export default function DashboardOverview({ kpiData, setRange, range }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Overview</h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setRange("7d")}
                        className={`text-sm px-3 py-1.5 rounded-md font-medium cursor-pointer ${range === "7d"
                            ? "bg-gray-200 text-gray-800" // Stile attivo
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setRange("30d")}
                        className={`text-sm px-3 py-1.5 rounded-md font-medium cursor-pointer ${range === "30d"
                            ? "bg-gray-200 text-gray-800" // Stile attivo
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}>
                        Monthly
                    </button>
                    <button
                        onClick={() => setRange("all")}
                        className={`text-sm px-3 py-1.5 rounded-md font-medium cursor-pointer ${range === "all"
                            ? "bg-gray-200 text-gray-800" // Stile attivo
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}>
                        Yearly
                    </button>
                    <button className="ml-3 border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                        <SlidersHorizontal className="w-4 h-4 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* 4 KPI Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200 bg-white rounded-lg overflow-hidden border border-gray-200">
                {/* KPI 1 */}
                <div className="p-4">
                    <p className="text-sm text-gray-500">Fatturato Totale</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">€{kpiData.fatturatoTotale}</h3>
                    <p className="text-green-600 text-xs mt-1 font-medium bg-green-100 rounded px-2 inline-block">+2.5%</p>
                </div>

                {/* KPI 2 */}
                <div className="p-4">
                    <p className="text-sm text-gray-500">Clienti Attivi</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{kpiData.clientiNuovi}</h3>
                    <p className="text-green-600 text-xs mt-1 font-medium bg-green-100 rounded px-2 inline-block">+9.5%</p>
                </div>

                {/* KPI 3 */}
                <div className="p-4">
                    <p className="text-sm text-gray-500">Spesa Media</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">€{kpiData.spesaMedia}</h3>
                    <p className="text-red-600 text-xs mt-1 font-medium bg-red-100 rounded px-2 inline-block">-1.6%</p>
                </div>

                {/* KPI 4 */}
                <div className="p-4">
                    <p className="text-sm text-gray-500">Appuntamenti</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{kpiData.appuntamentiCompletati}</h3>
                    <p className="text-green-600 text-xs mt-1 font-medium bg-green-100 rounded px-2 inline-block">+3.5%</p>
                </div>
            </div>
        </div>
    );
}