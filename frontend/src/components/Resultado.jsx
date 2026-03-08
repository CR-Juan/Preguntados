function Resultado({ resultado, onJugarDeNuevo, onHistorial }) {
  const { nombreJugador, aciertos, estado } = resultado;
  const gano = estado === 'Ganó';

  const barras = Array.from({ length: 10 }, (_, i) => i < aciertos);

  return (
    <div style={estilos.contenedor}>
      <div style={{ ...estilos.burbuja, width: 400, height: 400, top: -150, left: -100, background: gano ? 'rgba(126,211,33,0.1)' : 'rgba(233,69,96,0.1)' }} />
      <div style={{ ...estilos.burbuja, width: 300, height: 300, bottom: -100, right: -80, background: 'rgba(61,214,245,0.08)' }} />

      <div style={estilos.wrapper}>

        {/* Emoji grande animado */}
        <div style={{ ...estilos.emojiCirculo, background: gano ? 'linear-gradient(135deg, #7ed321, #3dd6f5)' : 'linear-gradient(135deg, #e94560, #f5a623)', boxShadow: gano ? '0 0 60px rgba(126,211,33,0.5)' : '0 0 60px rgba(233,69,96,0.5)' }}>
          <span style={{ fontSize: '3.5rem' }}>{gano ? '🏆' : '😞'}</span>
        </div>

        {/* Título resultado */}
        <div style={estilos.tituloArea}>
          <h1 style={{ ...estilos.titulo, color: gano ? '#7ed321' : '#e94560' }}>
            {gano ? '¡Ganaste!' : '¡Perdiste!'}
          </h1>
          <p style={estilos.subtitulo}>
            {gano ? '¡Excelente desempeño, campeón!' : 'No te rindás, ¡intentalo de nuevo!'}
          </p>
        </div>

        {/* Tarjeta de puntaje */}
        <div style={estilos.tarjeta}>
          <div style={estilos.jugadorFila}>
            <div style={estilos.avatar}>
              {nombreJugador.charAt(0).toUpperCase()}
            </div>
            <span style={estilos.jugadorNombre}>{nombreJugador}</span>
          </div>

          <div style={estilos.puntajeFila}>
            <span style={{ ...estilos.puntajeNumero, color: gano ? '#7ed321' : '#e94560' }}>
              {aciertos}
            </span>
            <div style={estilos.puntajeDetalle}>
              <span style={estilos.puntajeLabel}>de 10 correctas</span>
              <span style={{ ...estilos.estadoChip, background: gano ? 'rgba(126,211,33,0.2)' : 'rgba(233,69,96,0.2)', color: gano ? '#7ed321' : '#e94560', border: `1.5px solid ${gano ? '#7ed321' : '#e94560'}` }}>
                {gano ? 'Victoria' : 'Derrota'}
              </span>
            </div>
          </div>

          {/* Barra visual de aciertos */}
          <div style={estilos.barrasArea}>
            {barras.map((acertada, i) => (
              <div
                key={i}
                style={{
                  ...estilos.barra,
                  background: acertada
                    ? 'linear-gradient(180deg, #7ed321, #3dd6f5)'
                    : 'rgba(255,255,255,0.1)',
                  boxShadow: acertada ? '0 0 8px rgba(126,211,33,0.5)' : 'none',
                  animationDelay: `${i * 0.08}s`,
                  animation: acertada ? 'aparecer 0.4s ease forwards' : 'none',
                }}
              />
            ))}
          </div>
          <p style={estilos.barrasLabel}>Necesitabas mínimo 6 para ganar</p>
        </div>

        {/* Botones */}
        <div style={estilos.botones}>
          <button style={estilos.botonPrimario} onClick={onJugarDeNuevo}>
            Jugar de nuevo
          </button>
          <button style={estilos.botonSecundario} onClick={onHistorial}>
            Ver Historial
          </button>
        </div>

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
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  burbuja: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  wrapper: {
    width: '100%',
    maxWidth: '460px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    animation: 'aparecer 0.5s ease',
    position: 'relative',
    zIndex: 1,
  },
  emojiCirculo: {
    width: 110,
    height: 110,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'flotar 3s ease-in-out infinite',
  },
  tituloArea: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  titulo: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '3rem',
    margin: 0,
  },
  subtitulo: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.95rem',
    fontWeight: 600,
  },
  tarjeta: {
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '24px',
    padding: '1.75rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  jugadorFila: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f5a623, #e94560)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.2rem',
    boxShadow: '0 0 15px rgba(245,166,35,0.4)',
  },
  jugadorNombre: {
    color: '#ffffff',
    fontWeight: 800,
    fontSize: '1.1rem',
  },
  puntajeFila: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  puntajeNumero: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '4rem',
    lineHeight: 1,
  },
  puntajeDetalle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  puntajeLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  estadoChip: {
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 800,
    width: 'fit-content',
  },
  barrasArea: {
    display: 'flex',
    gap: '0.35rem',
    alignItems: 'flex-end',
  },
  barra: {
    flex: 1,
    height: 28,
    borderRadius: '6px',
  },
  barrasLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.78rem',
    fontWeight: 600,
    margin: 0,
  },
  botones: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  botonPrimario: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f5a623, #e94560)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.05rem',
    fontFamily: "'Fredoka One', cursive",
    cursor: 'pointer',
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(233,69,96,0.4)',
  },
  botonSecundario: {
    width: '100%',
    padding: '0.875rem',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
  },
};

export default Resultado;