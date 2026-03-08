import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Obtener 10 preguntas aleatorias
export const obtenerPreguntas = async () => {
  const respuesta = await axios.get(`${BASE_URL}/juego/preguntas`);
  return respuesta.data;
};

// Verificar si una respuesta es correcta
export const verificarRespuesta = async (idPregunta, respuestaUsuario) => {
  const respuesta = await axios.post(`${BASE_URL}/juego/verificar`, {
    idPregunta,
    respuestaUsuario,
  });
  return respuesta.data;
};

// Guardar resultado de la partida
export const guardarResultado = async (nombreJugador, aciertos) => {
  const respuesta = await axios.post(`${BASE_URL}/juego/resultado`, {
    nombreJugador,
    aciertos,
  });
  return respuesta.data;
};

// Obtener historial de partidas
export const obtenerHistorial = async () => {
  const respuesta = await axios.get(`${BASE_URL}/historial`);
  return respuesta.data;
};