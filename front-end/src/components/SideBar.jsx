import { NavLink } from "react-router-dom";
import { useState } from "react"
import {
    Home,
    Users,
    Calendar,
    FileText,
    PieChart,
    Settings,
    Menu,
    ChevronLeft
} from "lucide-react";


export default function Sidebar({ isOpen, setIsOpen }) {




    return (
        <aside className={`h-screen bg-indigo-700 text-white fixed flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>

            {/* Contenuto top */}
            <div>
                <div className={`flex items-center ${isOpen ? "justify-between" : "justify-center"} h-16 px-4 font-bold text-xl`}>
                    {isOpen && <span>MyApp</span>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-indigo-200 cursor-pointer"
                    >
                        {isOpen ? <ChevronLeft size={25} /> : <Menu size={25} />}
                    </button>
                </div>


                <nav className="px-4 py-4 space-y-2">
                    <NavLinkItem to="/dashboard" icon={<Home size={23} />} label="Dashboard" isOpen={isOpen} />
                    <NavLinkItem to="/clienti" icon={<Users size={23} />} label="Clienti" isOpen={isOpen} />
                    <NavLinkItem to="/calendario" icon={<Calendar size={23} />} label="Calendario" isOpen={isOpen} />
                    <NavLinkItem to="/documenti" icon={<FileText size={23} />} label="Documenti" isOpen={isOpen} />
                    <NavLinkItem to="/report" icon={<PieChart size={23} />} label="Report" isOpen={isOpen} />
                </nav>
            </div>

            {/* Contenuto in fondo */}
            <div className="px-4 py-4 border-t border-indigo-600">
                <NavLinkItem to="/settings" icon={<Settings size={23} />} label="Impostazioni" isOpen={isOpen} />
            </div>
        </aside>
    );
}

function NavLinkItem({ to, icon, label, isOpen }) {


    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-indigo-800 text-white" : "hover:bg-indigo-600 text-indigo-200"
                }`
            }
        >
            {icon}
            <span className={`text-sm font-medium transition-all duration-200 ${isOpen ? "block" : "hidden"}`}>
                {label}
            </span>
        </NavLink>
    );
}

