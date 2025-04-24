
import { BrowserRouter, Route, Routes } from "react-router-dom"

//pagine
import loginPage from "./pages/loginPage"
import Dashboard from "./pages/Dashboard"
import Clienti from "./pages/Clienti"
import Calendar from "./pages/Calendar"
import Appuntamenti from "./pages/Appuntamenti"

//componenti
import ProtectedRoute from "./components/ProtectedRoute"

//layout
import MainLayout from "./layout/MainLayout"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={loginPage} />

        {/* Rotte protette */}
        <Route Component={ProtectedRoute}>
          <Route Component={MainLayout}>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/clienti" Component={Clienti} />
            <Route path="/calendario" Component={Calendar} />
            <Route path="/appuntamenti" Component={Appuntamenti} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
