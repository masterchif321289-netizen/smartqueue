import supabase from "./supabase";

// Obtener todos los turnos
export async function obtenerTurnos() {
  const { data, error } = await supabase
    .from("turnos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al obtener turnos:", error);
    return [];
  }

  return data;
}
async function generarNumeroTurno(servicio) {

  let prefijo = "";

  switch (servicio) {
    case "Información":
      prefijo = "I";
      break;

    case "Pagos":
      prefijo = "P";
      break;

    case "Préstamos":
      prefijo = "L";
      break;

    default:
      throw new Error("Servicio no válido");
  }

  const { data, error } = await supabase
    .from("turnos")
    .select("numero")
    .eq("servicio", servicio);

  if (error) {
    console.error(error);
    return null;
  }

  let ultimo = 0;

  data.forEach(turno => {

    const numero = parseInt(turno.numero.substring(1));

    if (numero > ultimo) {
      ultimo = numero;
    }

  });

  const siguiente = ultimo + 1;

  return prefijo + String(siguiente).padStart(3, "0");
} 
// Crear un turno
export async function crearTurno(nombre, servicio) {

  const numero = await generarNumeroTurno(servicio);

  if (!numero) return null;

  const turno = {
    numero,
    nombre,
    servicio,
    estado: "Esperando"
  };

  const { data, error } = await supabase
    .from("turnos")
    .insert([turno])
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data[0];
}
// Obtener el turno que se está atendiendo
export async function obtenerTurnoActual() {
  const { data, error } = await supabase
    .from("turnos")
    .select("*")
    .eq("estado", "Atendiendo")
    .limit(1);

  if (error) {
    console.error(error);
    return null;
  }

  return data.length > 0 ? data[0] : null;
}
// Llamar al siguiente turno
export async function llamarSiguiente() {

  const { data, error } = await supabase
    .from("turnos")
    .select("*")
    .eq("estado", "Esperando")
    .order("id", { ascending: true })
    .limit(1);

  if (error) {
    console.error(error);
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  const turno = data[0];

  const { error: errorUpdate } = await supabase
    .from("turnos")
    .update({ estado: "Atendiendo" })
    .eq("id", turno.id);

  if (errorUpdate) {
    console.error(errorUpdate);
    return null;
  }

  turno.estado = "Atendiendo";

  return turno;
}
// Finalizar turno
export async function finalizarTurno(id) {

  const { error } = await supabase
    .from("turnos")
    .update({
      estado: "Finalizado",
      atendido_en: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }

}