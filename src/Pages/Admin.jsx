import { useState, useEffect } from "react";
import supabase from "../Services/supabase";
import "../Styles/Admin.css";
import {
  obtenerTurnos,
  llamarSiguiente,
  obtenerTurnoActual,
  finalizarTurno
} from "../Services/turnoService";

function Admin() {

  const [cola, setCola] = useState([]);
  const [actual, setActual] = useState(null);

  async function cargarDatos() {

    const turnos = await obtenerTurnos();
    const turnoActual = await obtenerTurnoActual();

    setCola(turnos);
    setActual(turnoActual);

  }

  useEffect(() => {

    cargarDatos();

    const canal = supabase
      .channel("turnos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "turnos",
        },
        () => {
          cargarDatos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };

  }, []);

  async function siguiente() {

    const turno = await llamarSiguiente();

    if (!turno) {
      alert("No hay turnos en espera.");
      return;
    }

    setActual(turno);

    await cargarDatos();

  }

  async function finalizar() {

    if (!actual) return;

    await finalizarTurno(actual.id);

    await cargarDatos();

  }

  return (

<div className="admin">

<div className="admin-header">

<h1>Panel del Administrador</h1>

<p>

Control de turnos en tiempo real

</p>

</div>

      <div className="turno-box">

<h2>Turno Actual</h2>

{

actual ?

<h1>{actual.numero}</h1>

:

<h3>No hay turno</h3>

}

</div>

      {
        actual
          ? <h1>{actual.numero}</h1>
          : <h3>No hay turno</h3>
      }

      <div className="botones">

<div className="botones">

<button
onClick={siguiente}
disabled={actual!==null}
>

Llamar siguiente

</button>

<button
onClick={finalizar}
disabled={!actual}
>

Finalizar

</button>

</div>
</div>

      <hr />

      <h2>Cola</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>Turno</th>
            <th>Nombre</th>
            <th>Servicio</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>

          {
            cola.map((cliente) => (

              <tr key={cliente.id}>
                <td>{cliente.numero}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.servicio}</td>
                <td>{cliente.estado}</td>
              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Admin;