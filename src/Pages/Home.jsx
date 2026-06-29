import { crearTurno } from "../services/turnoService";

function Home() {

  async function insertarTurnoPrueba() {

    const resultado = await crearTurno(
  "Prueba",
  "Información"
);

    console.log(resultado);

    if (resultado) {
      alert("Turno guardado correctamente");
    }

  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h1>SmartQueue</h1>

      <button onClick={insertarTurnoPrueba}>
        Insertar turno de prueba
      </button>

    </div>
  );
}

export default Home;