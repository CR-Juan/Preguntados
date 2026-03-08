import { useState } from 'react';
import Inicio from './components/Inicio';
import Juego from './components/Juego';
import Resultado from './components/Resultado';
import Historial from './components/Historial';

function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [nombreJugador, setNombreJugador] = useState('');
  const [resultadoFinal, setResultadoFinal] = useState(null);

  const irAJuego = (nombre) => {
    setNombreJugador(nombre);
    setPantalla('juego');
  };

  const irAResultado = (resultado) => {
    setResultadoFinal(resultado);
    setPantalla('resultado');
  };

  const irAInicio = () => {
    setResultadoFinal(null);
    setNombreJugador('');
    setPantalla('inicio');
  };

  const irAHistorial = () => setPantalla('historial');

  return (
    <div>
      {pantalla === 'inicio' && (
        <Inicio onIniciar={irAJuego} onHistorial={irAHistorial} />
      )}
      {pantalla === 'juego' && (
        <Juego nombreJugador={nombreJugador} onFinalizar={irAResultado} />
      )}
      {pantalla === 'resultado' && (
        <Resultado resultado={resultadoFinal} onJugarDeNuevo={irAInicio} onHistorial={irAHistorial} />
      )}
      {pantalla === 'historial' && (
        <Historial onVolver={irAInicio} />
      )}
    </div>
  );
}

export default App;