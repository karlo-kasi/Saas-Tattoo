import { Bell, ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios"


export default function Navbar() {

    const [dati, setDati] = useState(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios.get("http://localhost:3000/api/app/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setDati(res.data))
            .catch(err => console.error("Errore nella richiesta:", err));
    }, [])

    // Chiudi dropdown cliccando fuori
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-16 bg-gray-900 text-white flex items-center justify-end px-6 border-b border-gray-700">


            {/* Search + Notifiche + Avatar */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Cerca..."
                    className="bg-gray-800 text-sm px-4 py-1.5 rounded-md placeholder-gray-400 text-white outline-none w-64 transition focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700 hover:text-indigo-200 cursor-pointer"
                />
                {/* 🔔 Notifiche + Avatar */}
                <div className="relative flex items-center gap-4" ref={dropdownRef}>
                    <button
                        className="p-1.5 rounded-lg transition hover:bg-indigo-600 text-indigo-200 hover:text-indigo-200 cursor-pointer">
                        <Bell size={22} />
                    </button>

                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-2 p-1.5 rounded-lg transition hover:text-indigo-200 cursor-pointer ${isProfileOpen
                            ? "bg-indigo-800 text-white"
                            : "hover:bg-indigo-600 text-indigo-200"
                            }`}
                    >
                        <img
                            src="https://img.freepik.com/vettori-premium/icona-profilo-avatar-predefinito-immagine-utente-social-media-icona-avatar-grigia-silhouette-profilo-vuoto-illustrazione-vettoriale_561158-3467.jpg"
                            alt="Avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{dati?.nome || "Utente"}</span>
                        <ChevronDown size={16} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-14 bg-white text-gray-800 shadow-lg rounded-md w-48 py-2 z-50">
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 transition"
                            >
                                Profilo
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 transition"
                            >
                                Impostazioni
                            </a>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                            >
                                Esci
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
