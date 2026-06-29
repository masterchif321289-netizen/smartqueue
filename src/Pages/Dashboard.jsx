import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import "../styles/dashboard.css";
import {
  obtenerTurnos,
  obtenerTurnoActual
} from "../services/turnoService";

function Dashboard() {

  const [cola, setCola] = useState([]);
  const [actual, setActual] = useState(null);

  async function cargarDashboard() {

    const turnos = await obtenerTurnos();

    const turnoActual = await obtenerTurnoActual();

    const esperando = turnos.filter(
      turno => turno.estado === "Esperando"
    );

    setCola(esperando);
    setActual(turnoActual);

  }

  useEffect(() => {

    cargarDashboard();

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
          cargarDashboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };

  }, []);

  return (

<div className="dashboard">

      <h1>Dashboard</h1>

      <hr />

      <h2>Turno Actual</h2>

{
    actual ? (
        <>
            <h1>{actual.numero}</h1>

            <p>
                <strong>Servicio:</strong> {actual.servicio}
            </p>

            <p>
                <strong>Estado:</strong> {actual.estado}
            </p>
        </>
    ) : (
        <h2>No hay turno en atención</h2>
    )
}

      <hr />

      <h2>Cola de Espera</h2>

      <div className="espera">

<h2>Cola de Espera</h2>

<p className="contador">

Personas esperando: {cola.length}

</p>
</div>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>Turno</th>
            <th>Nombre</th>
            <th>Servicio</th>
          </tr>
        </thead>

        <tbody>

          {
            cola.map((cliente) => (

              <tr key={cliente.id}>
                <td>{cliente.numero}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.servicio}</td>
              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Dashboard;