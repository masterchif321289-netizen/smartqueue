import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../Components/Navbar";

import Home from "../Pages/Home";
import Turnos from "../Pages/Turnos";
import Admin from "../Pages/Admin";
import Dashboard from "../Pages/Dashboard";

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