const express = require('express');
const cors = require('cors');

const rutasJuego = require('./routes/juego');
const rutasHistorial = require('./routes/historial');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/juego', rutasJuego);
app.use('/api/historial', rutasHistorial);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});