import { useState, useEffect } from "react";
import axios from "axios";

export default function EditClienteModal({ isOpen, onClose, cliente, onClienteModificato }) {
  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome || "",
        telefono: cliente.telefono || "",
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!formData.nome.trim() || !formData.telefono.trim()) {
      setErrorMsg("Tutti i campi sono obbligatori!");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/app/modifyclient/${cliente.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClienteModificato(res.data.cliente);
      onClose();
    } catch (err) {
      console.error("Errore nella modifica:", err);
      setErrorMsg("Errore durante la modifica del cliente. Riprova.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-client-modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          &times;
        </button>

        <h2 id="edit-client-modal-title" className="text-xl font-semibold mb-4 text-gray-800">
          Modifica cliente
        </h2>

        {errorMsg && <div className="text-red-500 text-sm mb-4">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={!cliente}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 ${
                !cliente ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Salva modifiche
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}