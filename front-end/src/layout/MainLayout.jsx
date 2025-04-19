
import { Outlet } from "react-router-dom"
import { useState } from "react"

import Sidebar from "../components/SideBar"
import Navbar from "../components/Navbar"

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex">
      {/* Sidebar fissa a sinistra */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Wrapper per tutto il contenuto */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Contenuto con padding dinamico a sinistra */}
        <main className={`transition-all duration-300 px-6 pt-6 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}