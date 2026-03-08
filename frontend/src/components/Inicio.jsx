import { useState } from 'react';

function Inicio({ onIniciar, onHistorial }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleIniciar = () => {
    if (nombre.trim() === '') {
      setError('¡Ingresá tu nombre primero!');
      return;
    }
    setError('');
    onIniciar(nombre.trim());
  };

  return (
    <div style={estilos.contenedor}>
      {/* Burbujas decorativas */}
      <div style={{ ...estilos.burbuja, width: 300, height: 300, top: -80, left: -80, background: 'rgba(255,100,150,0.15)' }} />
      <div style={{ ...estilos.burbuja, width: 200, height: 200, bottom: 50, right: -50, background: 'rgba(100,200,255,0.15)' }} />
      <div style={{ ...estilos.burbuja, width: 150, height: 150, top: '40%', right: '10%', background: 'rgba(255,220,0,0.1)' }} />

      <div style={estilos.wrapper}>
        {/* Logo */}
        <div style={estilos.logoArea}>
          <div style={estilos.logoCirculo}>
            <span style={{ fontSize: '3.5rem' }}>🎯</span>
          </div>
          <h1 style={estilos.titulo}>Preguntados</h1>
          <p style={estilos.subtitulo}>¿Cuánto sabés del mundo?</p>
        </div>

        {/* Formulario */}
        <div style={estilos.tarjeta}>
          <p style={estilos.labelInput}>¿Cómo te llamás?</p>
          <input
            style={estilos.input}
            type="text"
            placeholder="Ingresá tu nombre..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleIniciar()}
          />
          {error && <p style={estilos.error}>⚠️ {error}</p>}

          <button style={estilos.botonJugar} onClick={handleIniciar}>
            ¡JUGAR AHORA!
          </button>

          <button style={estilos.botonHistorial} onClick={onHistorial}>
            Ver Historial de Partidas
          </button>
        </div>

        <p style={estilos.info}>10 preguntas · 3 opciones · ¡Demuestra tu conocimiento!</p>
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
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '480px',
    animation: 'aparecer 0.6s ease',
    position: 'relative',
    zIndex: 1,
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoCirculo: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #cc8a20, #e94560)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 40px rgba(245, 166, 35, 0.6)',
    animation: 'flotar 3s ease-in-out infinite, brillar 2s ease-in-out infinite',
  },
  titulo: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '3.5rem',
    background: 'linear-gradient(90deg, #f5a623, #e94560, #3dd6f5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '2px',
    margin: 0,
  },
  subtitulo: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '1px',
  },
  categorias: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  categoriaChip: {
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    border: '1.5px solid',
    fontSize: '0.8rem',
    fontWeight: 700,
    background: 'rgba(255,255,255,0.05)',
  },
  tarjeta: {
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '24px',
    padding: '2rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  labelInput: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 800,
    fontSize: '1rem',
    textAlign: 'center'
  },
  input: {
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: '2px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    fontSize: '1rem',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 600,
    outline: 'none',
    transition: 'border 0.3s',
    textAlign: 'center'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    fontWeight: 700,
    margin: 0,
  },
  botonJugar: {
    padding: '1rem',
    background: 'linear-gradient(135deg, #f5a623, #e94560)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.1rem',
    fontFamily: "'Fredoka One', cursive",
    fontWeight: 400,
    cursor: 'pointer',
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(233, 69, 96, 0.5)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  botonHistorial: {
    padding: '0.75rem',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
  },
  info: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
};

export default Inicio;