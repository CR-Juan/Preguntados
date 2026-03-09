const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const rutaResultados = path.join(__dirname, '../data/resultados.json');

// Retorna todas las partidas guardadas para mostrar en el historial.
router.get('/', (req, res) => {
  const resultados = JSON.parse(fs.readFileSync(rutaResultados, 'utf-8'));
  res.json(resultados);
});

module.exports = router;