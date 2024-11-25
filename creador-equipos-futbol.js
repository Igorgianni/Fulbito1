console.log("Script is running");

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
  console.log("Component is rendering");
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

  useEffect(() => {
    console.log("useEffect is running");
    const jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
      setJugadores(JSON.parse(jugadoresGuardados));
    }
  }, []);

  const manejarCambioInput = (nombre, valor) => {
    setNuevoJugador(prev => {
      const jugadorActualizado = { ...prev, [nombre]: nombre === 'nombre' ? valor : Math.round(Number(valor)) };
      const { pase, tiro, regate, defensa, arquero, estadoFisico } = jugadorActualizado;
      jugadorActualizado.general = Math.round(((pase + tiro + regate + defensa + arquero + estadoFisico) / 6) * 10);
      return jugadorActualizado;
    });
  };

  const agregarJugador = () => {
    if (nuevoJugador.nombre) {
      setJugadores(prev => [...prev, nuevoJugador]);
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
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Igor/Nico 2025</h1>
      
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Agregar Jugador</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              value={nuevoJugador.nombre}
              onChange={(e) => manejarCambioInput('nombre', e.target.value)}
              placeholder="Nombre del jugador"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
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
              Agregar Jugador
            </button>
          </div>
        </div>
      </div>

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
    </div>
  );
}

ReactDOM.render(<CreadorEquiposFutbol />, document.getElementById('root'));
console.log("Render attempt completed");

