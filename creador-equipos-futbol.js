const { useState, useEffect } = React;

const habilidades = [
  { clave: 'pase', etiqueta: 'Pase' },
  { clave: 'tiro', etiqueta: 'Tiro' },
  { clave: 'regate', etiqueta: 'Regate' },
  { clave: 'defensa', etiqueta: 'Defensa' },
  { clave: 'arquero', etiqueta: 'Arquero' },
  { clave: 'estadoFisico', etiqueta: 'Estado Físico' }
];

function CreadorEquiposFutbol() {
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: '',
    pase: 1,
    tiro: 1,
    regate: 1,
    defensa: 1,
    arquero: 1,
    estadoFisico: 1,
    general: 0
  });
  const [equipos, setEquipos] = useState([]);
  const [jugadoresGuardados, setJugadoresGuardados] = useState([]);

  useEffect(() => {
    const jugadoresAlmacenados = localStorage.getItem('jugadores');
    if (jugadoresAlmacenados) {
      setJugadores(JSON.parse(jugadoresAlmacenados));
    }
    actualizarListaJugadoresGuardados();
  }, []);

  useEffect(() => {
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
    <div className="container mx-auto p-4 bg-gradient-to-b from-green-100 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
        Igor/Nico 2025
      </h1>
      
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Agregar o Editar Jugador</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <div className="flex gap-2">
              <input
                id="nombre"
                name="nombre"
                value={nuevoJugador.nombre}
                onChange={(e) => manejarCambioInput('nombre', e.target.value)}
                placeholder="Nombre del jugador"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <select
                onChange={(e) => cargarJugador(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Cargar jugador</option>
                {jugadoresGuardados.map((nombre) => (
                  <option key={nombre} value={nombre}>{nombre}</option>
                ))}
              </select>
            </div>
          </div>
          {habilidades.map(({ clave, etiqueta }) => (
            <div key={clave}>
              <label htmlFor={clave} className="block text-sm font-medium text-gray-700 mb-1">{etiqueta}</label>
              <input
                type="range"
                id={clave}
                min="1"
                max="10"
                value={nuevoJugador[clave]}
                onChange={(e) => manejarCambioInput(clave, e.target.value)}
                className="w-full"
              />
              <span className="text-sm text-gray-500 mt-1 block">
                {nuevoJugador[clave]}
              </span>
            </div>
          ))}
          <div className="col-span-full flex justify-center mt-4">
            <button
              onClick={agregarJugador}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {jugadoresGuardados.includes(nuevoJugador.nombre) ? 'Actualizar Jugador' : 'Agregar Jugador'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Jugadores</h2>
          <div className="overflow-y-auto h-64 border border-gray-200 rounded-md p-4">
            {jugadores.map((jugador, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">{jugador.nombre}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {habilidades.map(({ clave, etiqueta }) => (
                    <span key={clave} className="text-sm bg-gray-200 rounded px-2 py-1">
                      {etiqueta}: {jugador[clave]}
                    </span>
                  ))}
                </div>
                <span className="mt-2 inline-block bg-blue-500 text-white rounded px-2 py-1 text-sm">
                  General: {jugador.general}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Equipos Generados</h2>
          <button
            onClick={generarEquipos}
            className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Generar Equipos Equilibrados
          </button>
          {equipos.length > 0 && (
            <div className="grid gap-4">
              {equipos.map((equipo, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-semibold text-lg mb-2">Equipo {index + 1}</h3>
                  <div className="overflow-y-auto h-48 border-t border-gray-200 pt-2">
                    {equipo.map((jugador, jugadorIndex) => (
                      <div key={jugadorIndex} className="mb-2 p-2 bg-gray-50 rounded">
                        <span className="font-semibold">{jugador.nombre}</span>
                        <div className="mt-1 grid grid-cols-2 gap-1">
                          {habilidades.map(({ clave, etiqueta }) => (
                            <span key={clave} className="text-xs bg-gray-200 rounded px-1">
                              {etiqueta}: {jugador[clave]}
                            </span>
                          ))}
                          <span className="col-span-2 text-sm bg-blue-500 text-white rounded px-1">
                            General: {jugador.general}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 font-bold text-center">
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


