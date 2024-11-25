const habilidades = [
  { clave: 'pase', etiqueta: 'Pase' },
  { clave: 'tiro', etiqueta: 'Tiro' },
  { clave: 'regate', etiqueta: 'Regate' },
  { clave: 'defensa', etiqueta: 'Defensa' },
  { clave: 'arquero', etiqueta: 'Arquero' },
  { clave: 'estadoFisico', etiqueta: 'Estado Físico' }
];

function CreadorEquiposFutbol() {
  const [jugadores, setJugadores] = React.useState([]);
  const [nuevoJugador, setNuevoJugador] = React.useState({
    nombre: '',
    pase: 1,
    tiro: 1,
    regate: 1,
    defensa: 1,
    arquero: 1,
    estadoFisico: 1,
    general: 0
  });
  const [equipos, setEquipos] = React.useState([]);
  const [jugadoresGuardados, setJugadoresGuardados] = React.useState([]);

  React.useEffect(() => {
    const jugadoresAlmacenados = localStorage.getItem('jugadores');
    if (jugadoresAlmacenados) {
      setJugadores(JSON.parse(jugadoresAlmacenados));
    }
    actualizarListaJugadoresGuardados();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    actualizarListaJugadoresGuardados();
  }, [jugadores]);

  const actualizarListaJugadoresGuardados = () => {
    const nombres = JSON.parse(localStorage.getItem('jugadores') || '[]').map(j => j.nombre);
    setJugadoresGuardados(nombres);
  };

  const manejarCambioInput = (nombre, valor) => {
    setNuevoJugador(prev => {
      const jugadorActualizado = { ...prev, [nombre]: nombre === 'nombre' ? valor : Math.round(Number(valor)) };
      const { pase, tiro, regate, defensa, arquero, estadoFisico } = jugadorActualizado;
      jugadorActualizado.general = Math.round(((pase + tiro + regate + defensa + arquero + estadoFisico) / 6) * 10);
      return jugadorActualizado;
    });
  };

  const agregarJugador = () => {
    if (
      nuevoJugador.nombre &&
      nuevoJugador.pase >= 1 && nuevoJugador.pase <= 10 &&
      nuevoJugador.tiro >= 1 && nuevoJugador.tiro <= 10 &&
      nuevoJugador.regate >= 1 && nuevoJugador.regate <= 10 &&
      nuevoJugador.defensa >= 1 && nuevoJugador.defensa <= 10 &&
      nuevoJugador.arquero >= 1 && nuevoJugador.arquero <= 10 &&
      nuevoJugador.estadoFisico >= 1 && nuevoJugador.estadoFisico <= 10
    ) {
      setJugadores(prev => {
        const index = prev.findIndex(j => j.nombre === nuevoJugador.nombre);
        if (index !== -1) {
          const nuevosJugadores = [...prev];
          nuevosJugadores[index] = nuevoJugador;
          return nuevosJugadores;
        } else {
          return [...prev, nuevoJugador];
        }
      });
      setNuevoJugador({
        nombre: '',
        pase: 1,
        tiro: 1,
        regate: 1,
        defensa: 1,
        arquero: 1,
        estadoFisico: 1,
        general: 0
      });
    } else {
      alert('Por favor, asegúrate de que todas las habilidades estén entre 1 y 10.');
    }
  };

  const cargarJugador = (nombre) => {
    const jugadorCargado = jugadores.find(j => j.nombre === nombre);
    if (jugadorCargado) {
      setNuevoJugador(jugadorCargado);
    }
  };

  const generarEquipos = () => {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => b.general - a.general);
    const equipo1 = [];
    const equipo2 = [];

    jugadoresOrdenados.forEach((jugador, index) => {
      const sumaEquipo1 = equipo1.reduce((sum, j) => sum + j.general, 0);
      const sumaEquipo2 = equipo2.reduce((sum, j) => sum + j.general, 0);

      if (index % 2 === 0) {
        if (sumaEquipo1 <= sumaEquipo2) {
          equipo1.push(jugador);
        } else {
          equipo2.push(jugador);
        }
      } else {
        if (sumaEquipo2 <= sumaEquipo1) {
          equipo2.push(jugador);
        } else {
          equipo1.push(jugador);
        }
      }
    });

    setEquipos([equipo1, equipo2]);
  };

  const calcularPromedioEquipo = (equipo) => {
    const suma = equipo.reduce((acc, jugador) => acc + jugador.general, 0);
    return equipo.length > 0 ? suma / equipo.length : 0;
  };

  return (
    <div className="container">
      <h1>Igor/Nico 2025</h1>
      
      <div className="card">
        <h2>Agregar o Editar Jugador</h2>
        <div className="grid">
          <div className="col-span-full">
            <label htmlFor="nombre">Nombre</label>
            <div className="flex">
              <input
                id="nombre"
                name="nombre"
                value={nuevoJugador.nombre}
                onChange={(e) => manejarCambioInput('nombre', e.target.value)}
                placeholder="Nombre del jugador"
              />
              <select onChange={(e) => cargarJugador(e.target.value)}>
                <option value="">Cargar jugador</option>
                {jugadoresGuardados.map((nombre) => (
                  <option key={nombre} value={nombre}>{nombre}</option>
                ))}
              </select>
            </div>
          </div>
          {habilidades.map(({ clave, etiqueta }) => (
            <div key={clave}>
              <label htmlFor={clave}>{etiqueta}</label>
              <input
                type="range"
                id={clave}
                min="1"
                max="10"
                value={nuevoJugador[clave]}
                onChange={(e) => manejarCambioInput(clave, e.target.value)}
              />
              <span>{nuevoJugador[clave]}</span>
            </div>
          ))}
          <div className="col-span-full">
            <button onClick={agregarJugador}>
              {jugadoresGuardados.includes(nuevoJugador.nombre) ? 'Actualizar Jugador' : 'Agregar Jugador'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Jugadores</h2>
          <div className="scroll-area">
            {jugadores.map((jugador, index) => (
              <div key={index} className="jugador-card">
                <h3>{jugador.nombre}</h3>
                <div className="grid">
                  {habilidades.map(({ clave, etiqueta }) => (
                    <span key={clave} className="badge">
                      {etiqueta}: {jugador[clave]}
                    </span>
                  ))}
                </div>
                <span className="badge general">
                  General: {jugador.general}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Equipos Generados</h2>
          <button onClick={generarEquipos}>Generar Equipos Equilibrados</button>
          {equipos.length > 0 && (
            <div className="grid">
              {equipos.map((equipo, index) => (
                <div key={index} className="card">
                  <h3>Equipo {index + 1}</h3>
                  <div className="scroll-area">
                    {equipo.map((jugador, jugadorIndex) => (
                      <div key={jugadorIndex} className="jugador-card">
                        <span className="nombre">{jugador.nombre}</span>
                        <div className="grid">
                          {habilidades.map(({ clave, etiqueta }) => (
                            <span key={clave} className="badge">
                              {etiqueta}: {jugador[clave]}
                            </span>
                          ))}
                          <span className="badge general">
                            General: {jugador.general}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="promedio">
                    Promedio del equipo: {calcularPromedioEquipo(equipo).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<CreadorEquiposFutbol />, document.getElementById('root'));


