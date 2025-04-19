import { useState, useEffect } from "react"
import axios from "axios"

export default function Clienti() {

    const [clienti, setClienti] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios.get("http://localhost:3000/api/app/clienti", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setClienti(res.data))
            .then(console.log(clienti))
    }, [])


    return (
        <div className="p-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Clienti</h2>
                        
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
                        + Aggiungi Cliente
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="text-gray-500 text-left">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Telefono</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            {clienti.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td className="px-6 py-4 font-medium">{cliente.nome}</td>
                                    <td className="px-6 py-4">{cliente.telefono}</td>
                                    <td className="px-6 py-4">{cliente.email}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition cursor-pointer">
                                            Modifica
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition cursor-pointer">
                                            Elimina
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}