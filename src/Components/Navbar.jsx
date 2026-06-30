import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {

  return (

    <nav>

      <NavLink to="/">
        Inicio
      </NavLink>

      <NavLink to="/turnos">
        Turnos
      </NavLink>

      <NavLink to="/admin">
        Administrador
      </NavLink>

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

    </nav>

  );

}

export default Navbar;