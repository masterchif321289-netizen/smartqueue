import { useState, useEffect } from "react";
import Card from "../Components/Card";
import supabase from "../Services/supabase";
import { crearTurno, obtenerTurnos } from "../Services/turnoService";

function Turnos() {

  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState("Información");
  const [turno, setTurno] = useState("");
  const [cola, setCola] = useState([]);

  async function cargarTurnos() {
    const datos = await obtenerTurnos();
    setCola(datos);
  }

  useEffect(() => {

    cargarTurnos();

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
          cargarTurnos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };

  }, []);

  async function solicitarTurno() {

    if (nombre.trim().length < 3) {
      alert("El nombre debe tener al menos 3 letras");
      return;
    }

    const nuevoTurno = await crearTurno(nombre, servicio);

    if (!nuevoTurno) {
      alert("No se pudo generar el turno");
      return;
    }

    setTurno(nuevoTurno.numero);

    setNombre("");

  }

  return (

    <Card>

      <h2>Solicitar Turno</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <br /><br />

      <select
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
      >
        <option>Información</option>
        <option>Pagos</option>
        <option>Préstamos</option>
      </select>

      <br /><br />

      <button onClick={solicitarTurno}>
        Generar Turno
      </button>

      <br /><br />

      {
        turno &&
        <h3>Tu turno es: {turno}</h3>
      }

      <hr />

      <h2>Cola de Espera</h2>

      <p>Total de turnos: {cola.length}</p>

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

    </Card>

  );

}

export default Turnos;