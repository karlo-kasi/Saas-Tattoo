import { useState, useEffect } from "react"
import axios from "axios"



export default function AddClienteModal({ isOpen, onClose, onClienteCreato }) {

    const [dataForm, setDataForm] = useState({
        nome: "",
        telefono: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        try {
            const res = await axios.post(
                "http://localhost:3000/api/app/newclient",
                dataForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // 1. Aggiorna lista
            onClienteCreato(res.data.cliente)

            // 2. Reset form
            setDataForm({ nome: "", telefono: "" })

            // 3. Chiudi modale
            onClose()
        } catch (err) {
            console.error("Errore nel salvataggio:", err)
        }
    }

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Chiudi */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                >
                    &times;
                </button>

                {/* Titolo */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Aggiungi nuovo cliente</h2>

                {/* Form (solo struttura) */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={dataForm.nome}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefono</label>
                        <input
                            type="phone"
                            name="telefono"
                            value={dataForm.telefono}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition cursor-pointer"
                        >
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}