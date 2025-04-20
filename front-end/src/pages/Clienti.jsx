import { useState, useEffect } from "react"
import axios from "axios"

//componenti
import AddClienteModal from "../components/AddClienteModal"
import EditClienteModal from "../components/EditClienteModal";


export default function Clienti() {

    const [clienti, setClienti] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [clienteSelezionato, setClienteSelezionato] = useState(null);


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

    const handleDelete = async (id) => {
        try {

            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:3000/api/app/deleteclient/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Rimuove il cliente dallo stato
            setClienti((prev) => prev.filter((c) => c.id !== id));

        } catch (err) {
            console.error("Errore durante l'eliminazione:", err);
        }
    }


    return (
        <div className="p-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Clienti</h2>

                    </div>

                    <button onClick={() => setModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transitio cursor-pointer">
                        + Aggiungi Cliente
                    </button>
                </div>

                {/* Messaggio successo */}
                {successMsg && (
                    <div className="mb-4 text-green-600 text-sm">
                        ✅ {successMsg}
                    </div>
                )}
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
                                        <button
                                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all cursor-pointer"
                                            onClick={() => {
                                                setClienteSelezionato(cliente);
                                                setEditModalOpen(true);
                                            }}
                                        >
                                            Modifica
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cliente.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-red-600 hover:shadow-lg transition-all cursor-pointer"
                                        >
                                            Elimina
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <AddClienteModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onClienteCreato={(nuovoCliente) => {
                            setClienti((prev) => [...prev, nuovoCliente])
                            setSuccessMsg("Cliente aggiunto con successo!")
                            setTimeout(() => setSuccessMsg(""), 3000)
                        }}
                    />
                    <EditClienteModal
                        isOpen={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        cliente={clienteSelezionato}
                        onClienteModificato={(clienteModificato) => {
                            setClienti((prev) =>
                                prev.map((c) => (c.id === clienteModificato.id ? clienteModificato : c))
                            );
                            setSuccessMsg("Cliente modificato con successo!");
                            setTimeout(() => setSuccessMsg(""), 3000);
                        }}
                    />
                </div>
            </div>
        </div>
    );

}