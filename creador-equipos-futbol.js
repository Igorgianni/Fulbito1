const { useState, useEffect } = React;

const habilidades = [
  { clave: 'pase', etiqueta: 'Pase', icono: '🦶' },
  { clave: 'tiro', etiqueta: 'Tiro', icono: '🥅' },
  { clave: 'regate', etiqueta: 'Regate', icono: '⚽' },
  { clave: 'defensa', etiqueta: 'Defensa', icono: '🛡️' },
  { clave: 'arquero', etiqueta: 'Arquero', icono: '🧤' },
  { clave: 'estadoFisico', etiqueta: 'Estado Físico', icono: '🏃' }
];

const jugadoresLegendarios = [
  { nombre: 'Messi', imagen: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg' },
  { nombre: 'Maradona', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/640px-Maradona-Mundial_86_con_la_copa.JPG' },
  { nombre: 'Ronaldo', imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg' },
  { nombre: 'Pelé', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Pele_con_brasil_%28cropped%29.jpg/640px-Pele_con_brasil_%28cropped%29.jpg' },
  { nombre: 'Zidane', imagen: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg' },
  { nombre: 'Ronaldinho', imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Ronaldinho_in_2019.jpg' },
  { nombre: 'Beckham', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/David_Beckham_in_2019.jpg/640px-David_Beckham_in_2019.jpg' },
  { nombre: 'Cruyff', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Johan_Cruyff_1974c.jpg/640px-Johan_Cruyff_1974c.jpg' },
  { nombre: 'Iniesta', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9s_Iniesta.jpg/640px-Andr%C3%A9s_Iniesta.jpg' },
  { nombre: 'Xavi', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Xavi_Hernandez_2022.jpg/640px-Xavi_Hernandez_2022.jpg' }
];

const RenderEstrellas = ({ rating }) => {
  const estrellas = Math.round(rating * 2) / 2; // Redondear a 0.5 más cercano
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index} className="text-yellow-400 text-2xl">
            {estrellas >= starValue ? '★' : estrellas >= starValue - 0.5 ? '⯨' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

function CreadorEquiposFutbol() {
  const [jugadores, setJugadores] = useState([]);
  const [nuevoJugador, setNuevoJugador] = useState({
    nombre: '',
    pase: 5,
    tiro: 5,
    regate: 5,
    defensa: 5,
    arquero: 5,
    estadoFisico: 5,
  });
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
      setJugadores(JSON.parse(jugadoresGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
  }, [jugadores]);

  const manejarCambioInput = (nombre, valor) => {
    setNuevoJugador(prev => ({
      ...prev,
      [nombre]: nombre === 'nombre' ? valor : Math.round(Number(valor))
    }));
  };

  const agregarJugador = () => {
    if (nuevoJugador.nombre) {
      const jugadorConImagen = {
        ...nuevoJugador,
        imagen: jugadoresLegendarios[Math.floor(Math.random() * jugadoresLegendarios.length)].imagen
      };
      setJugadores(prev => [...prev, jugadorConImagen]);
      setNuevoJugador({
        nombre: '',
        pase: 5,
        tiro: 5,
        regate: 5,
        defensa: 5,
        arquero: 5,
        estadoFisico: 5,
      });
    }
  };

  const generarEquipos = () => {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => {
      const promedioA = (a.pase + a.tiro + a.regate + a.defensa + a.arquero + a.estadoFisico) / 6;
      const promedioB = (b.pase + b.tiro + b.regate + b.defensa + b.arquero + b.estadoFisico) / 6;
      return promedioB - promedioA;
    });
    const equipo1 = [];
    const equipo2 = [];

    jugadoresOrdenados.forEach((jugador, index) => {
      if (index % 2 === 0) {
        equipo1.push(jugador);
      } else {
        equipo2.push(jugador);
      }
    });

    setEquipos([equipo1, equipo2]);
  };

  const calcularPromedioEquipo = (equipo) => {
    if (equipo.length === 0) return 0;
    const suma = equipo.reduce((acc, jugador) => {
      return acc + (jugador.pase + jugador.tiro + jugador.regate + jugador.defensa + jugador.arquero + jugador.estadoFisico) / 6;
    }, 0);
    return (suma / equipo.length) / 2; // Dividimos por 2 para obtener un valor entre 0 y 5
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 p-4">
      <div className="container mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-800 flex items-center justify-center">
          <span className="mr-2">⚽</span> Igor/Nico 2025 <span className="ml-2">⚽</span>
        </h1>
        
        <div className="mb-8 bg-blue-100 rounded-lg shadow-md p-6 border-2 border-blue-300">
          <h2 className="text-3xl font-semibold mb-4 text-center text-blue-800">Agregar Jugador</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label htmlFor="nombre" className="block text-lg font-medium text-blue-700 mb-1">Nombre del Jugador</label>
              <input
                id="nombre"
                name="nombre"
                value={nuevoJugador.nombre}
                onChange={(e) => manejarCambioInput('nombre', e.target.value)}
                placeholder="Ingrese el nombre del jugador"
                className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg"
              />
            </div>
            {habilidades.map(({ clave, etiqueta, icono }) => (
              <div key={clave}>
                <label htmlFor={clave} className="block text-lg font-medium text-blue-700 mb-1">
                  {icono} {etiqueta}
                </label>
                <input
                  type="range"
                  id={clave}
                  min="1"
                  max="10"
                  value={nuevoJugador[clave]}
                  onChange={(e) => manejarCambioInput(clave, e.target.value)}
                  className="w-full"
                />
                <span className="text-lg text-blue-600 mt-1 block font-semibold">
                  {nuevoJugador[clave]}
                </span>
              </div>
            ))}
            <div className="col-span-full flex justify-center mt-4">
              <button
                onClick={agregarJugador}
                className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-xl font-bold shadow-lg"
              >
                Agregar Jugador
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-100 rounded-lg shadow-md p-6 mb-8 border-2 border-blue-300">
          <h2 className="text-3xl font-semibold mb-4 text-center text-blue-800">Jugadores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {jugadores.map((jugador, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center justify-center border-2 border-blue-200">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-4 border-yellow-400">
                  <img src={jugador.imagen} alt={jugador.nombre} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-center text-blue-800">{jugador.nombre}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={generarEquipos}
            className="px-10 py-4
bg-blue-600 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-2xl font-bold shadow-lg"
          >
            Generar Equipos
          </button>
        </div>

        {equipos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipos.map((equipo, equipoIndex) => (
              <div key={equipoIndex} className="bg-blue-100 rounded-lg shadow-md p-6 border-2 border-blue-300">
                <h2 className="text-3xl font-semibold mb-4 text-center text-blue-800">Equipo {equipoIndex + 1}</h2>
                <div className="mb-4 flex flex-col items-center">
                  <p className="text-lg font-semibold text-blue-800">Promedio del equipo:</p>
                  <RenderEstrellas rating={calcularPromedioEquipo(equipo)} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {equipo.map((jugador, jugadorIndex) => (
                    <div key={jugadorIndex} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center justify-center border-2 border-blue-200">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-yellow-400">
                        <img src={jugador.imagen} alt={jugador.nombre} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-sm text-center text-blue-800">{jugador.nombre}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<CreadorEquiposFutbol />, document.getElementById('root'));

