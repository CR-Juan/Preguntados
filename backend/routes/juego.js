const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const rutaPreguntas = path.join(__dirname, '../data/preguntas.json');
const rutaResultados = path.join(__dirname, '../data/resultados.json');

// Obtener 10 preguntas aleatorias
router.get('/preguntas', (req, res) => {
  const preguntas = JSON.parse(fs.readFileSync(rutaPreguntas, 'utf-8'));

  const mezcladas = preguntas.sort(() => Math.random() - 0.5).slice(0, 10);

  const preguntasSinRespuesta = mezcladas.map(({ id, pregunta, opciones }) => ({
    id,
    pregunta,
    opciones,
  }));

  res.json(preguntasSinRespuesta);
});

// Guardar resultado de una partida
router.post('/resultado', (req, res) => {
  const { nombreJugador, aciertos } = req.body;

  if (!nombreJugador || aciertos === undefined) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const estado = aciertos >= 6 ? 'Ganó' : 'Perdió';

  const nuevoResultado = {
    id: Date.now(),
    nombreJugador,
    aciertos,
    estado,
    fecha: new Date().toLocaleDateString('es-CR'),
  };

  const resultados = JSON.parse(fs.readFileSync(rutaResultados, 'utf-8'));
  resultados.push(nuevoResultado);
  fs.writeFileSync(rutaResultados, JSON.stringify(resultados, null, 2));

  res.json(nuevoResultado);
});

// Verificar respuesta
router.post('/verificar', (req, res) => {
  const { idPregunta, respuestaUsuario } = req.body;

  const preguntas = JSON.parse(fs.readFileSync(rutaPreguntas, 'utf-8'));
  const pregunta = preguntas.find((p) => p.id === Number(idPregunta));

  if (!pregunta) {
    return res.status(404).json({ error: 'Pregunta no encontrada' });
  }

  const esCorrecta = pregunta.correcta === respuestaUsuario;
  res.json({ esCorrecta, respuestaCorrecta: pregunta.correcta });
});

module.exports = router;