import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Turnos from "../pages/Turnos";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";

function AppRouter() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/turnos" element={<Turnos />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;