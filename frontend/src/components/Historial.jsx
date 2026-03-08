import { useState, useEffect } from 'react';
import { obtenerHistorial } from '../services/api';

function Historial({ onVolver }) {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      const datos = await obtenerHistorial();
      setHistorial(datos.reverse());
      setCargando(false);
    };
    cargarHistorial();
  }, []);

  const totalPartidas = historial.length;
  const totalGanadas = historial.filter((p) => p.estado === 'Ganó').length;
  const promedioAciertos = totalPartidas > 0
    ? (historial.reduce((acc, p) => acc + p.aciertos, 0) / totalPartidas).toFixed(1)
    : 0;

  return (
    <div style={estilos.contenedor}>
      <div style={{ ...estilos.burbuja, width: 350, height: 350, top: -100, right: -80, background: 'rgba(61,214,245,0.08)' }} />
      <div style={{ ...estilos.burbuja, width: 250, height: 250, bottom: -80, left: -60, background: 'rgba(245,166,35,0.08)' }} />

      <div style={estilos.wrapper}>

        {/* Header */}
        <div style={estilos.header}>
          <div>
            <h1 style={estilos.titulo}>📋 Historial</h1>
            <p style={estilos.subtitulo}>Todas las partidas jugadas</p>
          </div>
          <button style={estilos.botonVolver} onClick={onVolver}>
            Volver
          </button>
        </div>

        {/* Stats */}
        {totalPartidas > 0 && (
          <div style={estilos.statsGrid}>
            {[
              { label: 'Partidas', valor: totalPartidas, emoji: '🎮', color: '#3dd6f5' },
              { label: 'Ganadas', valor: totalGanadas, emoji: '🏆', color: '#7ed321' },
              { label: 'Promedio', valor: promedioAciertos, emoji: '⭐', color: '#f5a623' },
            ].map((stat) => (
              <div key={stat.label} style={{ ...estilos.statCard, borderColor: `${stat.color}44` }}>
                <span style={{ fontSize: '1.5rem' }}>{stat.emoji}</span>
                <span style={{ ...estilos.statValor, color: stat.color }}>{stat.valor}</span>
                <span style={estilos.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Lista */}
        {cargando ? (
          <div style={estilos.cargandoWrapper}>
            <div style={estilos.spinner} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Cargando historial...</p>
          </div>
        ) : historial.length === 0 ? (
          <div style={estilos.vacioWrapper}>
            <span style={{ fontSize: '3rem' }}>🎮</span>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '1rem' }}>
              No hay partidas todavía
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
              ¡Jugá la primera!
            </p>
          </div>
        ) : (
          <div style={estilos.lista}>
            {/* Encabezado tabla */}
            <div style={estilos.filaHeader}>
              <span>Jugador</span>
              <span>Aciertos</span>
              <span>Estado</span>
              <span>Fecha</span>
            </div>

            {historial.map((partida, index) => (
              <div
                key={partida.id}
                style={{
                  ...estilos.fila,
                  borderLeft: `4px solid ${partida.estado === 'Ganó' ? '#7ed321' : '#e94560'}`,
                  animationDelay: `${index * 0.05}s`,
                  animation: 'aparecer 0.4s ease forwards',
                  opacity: 0,
                }}
              >
                <div style={estilos.jugadorCelda}>
                  <div style={{ ...estilos.miniAvatar, background: partida.estado === 'Ganó' ? 'linear-gradient(135deg, #7ed321, #3dd6f5)' : 'linear-gradient(135deg, #e94560, #f5a623)' }}>
                    {partida.nombreJugador.charAt(0).toUpperCase()}
                  </div>
                  <span style={estilos.nombreTexto}>{partida.nombreJugador}</span>
                </div>

                <div style={estilos.aciertoCelda}>
                  <span style={{ ...estilos.aciertoNumero, color: partida.aciertos >= 6 ? '#7ed321' : '#e94560' }}>
                    {partida.aciertos}
                  </span>
                  <span style={estilos.aciertoBase}>/10</span>
                </div>

                <span style={{
                  ...estilos.estadoBadge,
                  background: partida.estado === 'Ganó' ? 'rgba(126,211,33,0.15)' : 'rgba(233,69,96,0.15)',
                  color: partida.estado === 'Ganó' ? '#7ed321' : '#e94560',
                  border: `1px solid ${partida.estado === 'Ganó' ? 'rgba(126,211,33,0.4)' : 'rgba(233,69,96,0.4)'}`,
                }}>
                  {partida.estado === 'Ganó' ? 'Victoria' : 'Derrota'}
                </span>

                <span style={estilos.fechaTexto}>{partida.fecha}</span>
              </div>
            ))}
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
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  burbuja: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  wrapper: {
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    position: 'relative',
    zIndex: 1,
    paddingTop: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titulo: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '2.2rem',
    color: '#ffffff',
    margin: 0,
  },
  subtitulo: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.9rem',
    fontWeight: 600,
    margin: 0,
  },
  botonVolver: {
    padding: '0.6rem 1.25rem',
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  statCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid',
    borderRadius: '16px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  statValor: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.8rem',
    lineHeight: 1,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  cargandoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '3rem',
  },
  spinner: {
    width: 40,
    height: 40,
    border: '4px solid rgba(255,255,255,0.1)',
    borderTop: '4px solid #f5a623',
    borderRadius: '50%',
    animation: 'girar 0.8s linear infinite',
  },
  vacioWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '3rem',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  filaHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    padding: '0.6rem 1rem',
    color: 'rgba(255,255,255,0.35)',
    fontSize: '0.78rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  fila: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '0.875rem 1rem',
  },
  jugadorCelda: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  miniAvatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: "'Fredoka One', cursive",
    fontSize: '0.9rem',
  },
  nombreTexto: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '0.95rem',
  },
  aciertoCelda: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.2rem',
  },
  aciertoNumero: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.3rem',
  },
  aciertoBase: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  estadoBadge: {
    padding: '0.3rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 800,
    width: 'fit-content',
  },
  fechaTexto: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '0.82rem',
    fontWeight: 600,
  },
};

export default Historial;