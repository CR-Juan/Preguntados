import { useState, useEffect } from 'react';
import { obtenerPreguntas, verificarRespuesta, guardarResultado } from '../services/api';

function Juego({ nombreJugador, onFinalizar }) {
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [mostrarSalir, setMostrarSalir] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [animarPregunta, setAnimarPregunta] = useState(false);

  useEffect(() => {
    const cargarPreguntas = async () => {
      const datos = await obtenerPreguntas();
      setPreguntas(datos);
      setCargando(false);
      setTimeout(() => setAnimarPregunta(true), 100);
    };
    cargarPreguntas();
  }, []);

  const handleResponder = async (opcion) => {
    if (seleccion) return;

    setSeleccion(opcion);
    const { esCorrecta, respuestaCorrecta } = await verificarRespuesta(
      preguntas[indiceActual].id,
      opcion
    );

    setFeedback(esCorrecta ? 'correcto' : 'incorrecto');
    setRespuestaCorrecta(respuestaCorrecta);

    const nuevosAciertos = esCorrecta ? aciertos + 1 : aciertos;
    if (esCorrecta) setAciertos(nuevosAciertos);

    setTimeout(async () => {
      if (indiceActual + 1 >= preguntas.length) {
        const resultado = await guardarResultado(nombreJugador, nuevosAciertos);
        onFinalizar(resultado);
      } else {
        setAnimarPregunta(false);
        setTimeout(() => {
          setIndiceActual(indiceActual + 1);
          setSeleccion(null);
          setFeedback(null);
          setRespuestaCorrecta(null);
          setAnimarPregunta(true);
        }, 200);
      }
    }, 1800);
  };

  if (cargando) {
    return (
      <div style={estilos.contenedor}>
        <div style={estilos.cargandoWrapper}>
          <div style={estilos.spinner} />
          <p style={estilos.cargandoTexto}>Preparando preguntas...</p>
        </div>
      </div>
    );
  }

  const preguntaActual = preguntas[indiceActual];
  const progresoPct = ((indiceActual) / preguntas.length) * 100;

  const coloresOpciones = ['#3dd6f5', '#f5a623', '#e94560', '#7ed321'];

  return (
    <div style={estilos.contenedor}>
      {/* Burbujas decorativas */}
      <div style={{ ...estilos.burbuja, width: 350, height: 350, top: -100, right: -100, background: 'rgba(61,214,245,0.08)' }} />
      <div style={{ ...estilos.burbuja, width: 250, height: 250, bottom: -50, left: -80, background: 'rgba(233,69,96,0.1)' }} />

      <div style={estilos.wrapper}>

        {/* Header */}
        <div style={estilos.header}>
          <div style={estilos.jugadorBadge}>
            <span style={estilos.jugadorAvatar}>
              {nombreJugador.charAt(0).toUpperCase()}
            </span>
            <span style={estilos.jugadorNombre}>{nombreJugador}</span>
          </div>

          <div style={estilos.contadorPregunta}>
            <span style={estilos.contadorNumero}>{indiceActual + 1}</span>
            <span style={estilos.contadorTotal}>/ {preguntas.length}</span>
          </div>

          <div style={estilos.aciertoBadge}>
            <span style={{ fontSize: '1.1rem' }}>✅</span>
            <span style={estilos.aciertoNumero}>{aciertos}</span>
          </div>

          <button style={estilos.botonSalir} onClick={() => setMostrarSalir(true)}>
            Salir
          </button>
        </div>

        {/* Barra de progreso */}
        <div style={estilos.barraFondo}>
          <div style={{ ...estilos.barraRelleno, width: `${progresoPct}%` }} />
        </div>

        {/* Tarjeta pregunta */}
        <div style={{
          ...estilos.tarjetaPregunta,
          opacity: animarPregunta ? 1 : 0,
          transform: animarPregunta ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          <div style={estilos.numeroPreguntaChip}>
            Pregunta {indiceActual + 1}
          </div>
          <p style={estilos.textoPregunta}>{preguntaActual.pregunta}</p>
        </div>

        {/* Opciones */}
        <div style={estilos.opcionesGrid}>
          {preguntaActual.opciones.map((opcion, i) => {
            const color = coloresOpciones[i % coloresOpciones.length];
            let estadoFondo = 'rgba(255,255,255,0.05)';
            let estadoBorde = `rgba(${color === '#3dd6f5' ? '61,214,245' : color === '#f5a623' ? '245,166,35' : color === '#e94560' ? '233,69,96' : '126,211,33'},0.3)`;
            let escala = 1;

            if (seleccion) {
              if (opcion === respuestaCorrecta) {
                estadoFondo = 'rgba(126,211,33,0.25)';
                estadoBorde = '#7ed321';
                escala = opcion === seleccion ? 1.02 : 1;
              } else if (opcion === seleccion && feedback === 'incorrecto') {
                estadoFondo = 'rgba(233,69,96,0.25)';
                estadoBorde = '#e94560';
              }
            }

            return (
              <button
                key={opcion}
                onClick={() => handleResponder(opcion)}
                disabled={!!seleccion}
                style={{
                  ...estilos.opcionBoton,
                  background: estadoFondo,
                  borderColor: estadoBorde,
                  transform: `scale(${escala})`,
                  cursor: seleccion ? 'default' : 'pointer',
                  opacity: seleccion && opcion !== seleccion && opcion !== respuestaCorrecta ? 0.5 : 1,
                }}
              >
                <span style={{ ...estilos.opcionLetra, background: color, boxShadow: `0 0 12px ${color}66` }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={estilos.opcionTexto}>{opcion}</span>
                {seleccion && opcion === respuestaCorrecta && (
                  <span style={estilos.iconoCheck}>✅</span>
                )}
                {seleccion && opcion === seleccion && feedback === 'incorrecto' && (
                  <span style={estilos.iconoCheck}>❌</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{
            ...estilos.feedbackBanner,
            background: feedback === 'correcto'
              ? 'linear-gradient(135deg, rgba(126,211,33,0.2), rgba(126,211,33,0.05))'
              : 'linear-gradient(135deg, rgba(233,69,96,0.2), rgba(233,69,96,0.05))',
            borderColor: feedback === 'correcto' ? '#7ed321' : '#e94560',
          }}>
            <span style={{ color: feedback === 'correcto' ? '#7ed321' : '#e94560', fontWeight: 800, fontSize: '1rem' }}>
              {feedback === 'correcto' ? '¡Respuesta correcta!' : `Incorrecto · Era: ${respuestaCorrecta}`}
            </span>
          </div>
        )}

        {/* Modal de confirmación para salir */}
        {mostrarSalir && (
          <div style={estilos.modalOverlay}>
            <div style={estilos.modal}>
              <span style={{ fontSize: '2.5rem' }}>⚠️</span>
              <h2 style={estilos.modalTitulo}>¿Seguro que querés salir?</h2>
              <p style={estilos.modalTexto}>
                Tu partida no se guardará y perderás tu progreso actual.
              </p>
              <div style={estilos.modalBotones}>
                <button style={estilos.modalBotonSalir} onClick={() => onFinalizar({ nombreJugador, aciertos, estado: aciertos >= 6 ? 'Ganó' : 'Perdió' })}>
                  Sí, salir
                </button>
                <button style={estilos.modalBotonQuedarme} onClick={() => setMostrarSalir(false)}>
                  Seguir jugando
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const estilos = {
  contenedor: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #11002e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  burbuja: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  cargandoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  spinner: {
    width: 50,
    height: 50,
    border: '4px solid rgba(255,255,255,0.1)',
    borderTop: '4px solid #f5a623',
    borderRadius: '50%',
    animation: 'girar 0.8s linear infinite',
  },
  cargandoTexto: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 700,
    fontSize: '1rem',
  },
  wrapper: {
    width: '100%',
    maxWidth: '580px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jugadorBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255,255,255,0.08)',
    padding: '0.4rem 0.75rem',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  jugadorAvatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f5a623, #e94560)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 800,
    fontSize: '0.85rem',
    fontFamily: "'Fredoka One', cursive",
  },
  jugadorNombre: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '0.9rem',
  },
  contadorPregunta: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.25rem',
  },
  contadorNumero: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '2rem',
    color: '#ffffff',
    lineHeight: 1,
  },
  contadorTotal: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '1rem',
    fontWeight: 600,
  },
  aciertoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(126,211,33,0.15)',
    padding: '0.4rem 0.75rem',
    borderRadius: '20px',
    border: '1px solid rgba(126,211,33,0.3)',
  },
  aciertoNumero: {
    color: '#7ed321',
    fontWeight: 800,
    fontSize: '1rem',
  },
  barraFondo: {
    width: '100%',
    height: 8,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
    background: 'linear-gradient(90deg, #f5a623, #e94560)',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
    boxShadow: '0 0 10px rgba(245,166,35,0.6)',
  },
  tarjetaPregunta: {
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '20px',
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  numeroPreguntaChip: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f5a623, #e94560)',
    color: '#fff',
    padding: '0.2rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 800,
    letterSpacing: '1px',
    width: 'fit-content',
    textTransform: 'uppercase',
  },
  textoPregunta: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 1.5,
    margin: 0,
  },
  opcionesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  opcionBoton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    padding: '0.875rem 1rem',
    border: '2px solid',
    borderRadius: '14px',
    transition: 'all 0.25s ease',
    textAlign: 'left',
    width: '100%',
  },
  opcionLetra: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1a0533',
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1rem',
    flexShrink: 0,
  },
  opcionTexto: {
    color: '#ffffff',
    fontSize: '0.95rem',
    fontWeight: 600,
    flex: 1,
  },
  iconoCheck: {
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  feedbackBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.25rem',
    borderRadius: '14px',
    border: '2px solid',
    animation: 'aparecer 0.3s ease',
  },
  botonSalir: {
    padding: '0.4rem 0.875rem',
    background: 'rgba(233,69,96,0.15)',
    color: '#e94560',
    border: '1.5px solid rgba(233,69,96,0.4)',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    animation: 'aparecer 0.2s ease',
  },
  modal: {
    background: 'linear-gradient(135deg, #2d1b69, #1a0533)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '24px',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '380px',
    width: '90%',
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
  },
  modalTitulo: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.6rem',
    color: '#ffffff',
    margin: 0,
    textAlign: 'center',
  },
  modalTexto: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.9rem',
    fontWeight: 600,
    textAlign: 'center',
    margin: 0,
  },
  modalBotones: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
    marginTop: '0.5rem',
  },
  modalBotonSalir: {
    padding: '0.875rem',
    background: 'linear-gradient(135deg, #e94560, #c1121f)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontFamily: "'Fredoka One', cursive",
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(233,69,96,0.4)',
  },
  modalBotonQuedarme: {
    padding: '0.875rem',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
  },
};

export default Juego;