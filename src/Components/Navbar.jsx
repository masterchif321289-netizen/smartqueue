import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {

  return (

    <nav>

      <NavLink to="/">
        Inicio
      </NavLink>

      <NavLink to="/Turnos">
        Turnos
      </NavLink>

      <NavLink to="/Admin">
        Administrador
      </NavLink>

      <NavLink to="/Dashboard">
        Dashboard
      </NavLink>

    </nav>

  );

}

export default Navbar;