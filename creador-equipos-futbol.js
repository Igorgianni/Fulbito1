import { Star, StarHalf } from 'lucide-react'
import React from 'react';
import ReactDOM from 'react-dom';

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
  { nombre: 'Cristiano Ronaldo', imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg' },
  { nombre: 'Pelé', imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Pele_1960.jpg' },
  { nombre: 'Zidane', imagen: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg' },
  { nombre: 'Ronaldinho', imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Ronaldinho_in_2019.jpg' },
  { nombre: 'Beckham', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/David_Beckham_in_2019.jpg/640px-David_Beckham_in_2019.jpg' },
  { nombre: 'Cruyff', imagen: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Johan_Cruyff_1974.jpg' },
  { nombre: 'Iniesta', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Andr%C3%A9s_Iniesta.jpg/640px-Andr%C3%A9s_Iniesta.jpg' },
  { nombre: 'Xavi', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Xavi_Hernandez_2022.jpg/640px-Xavi_Hernandez_2022.jpg' },
  { nombre: 'Neymar', imagen: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Bra-Cos_%281%29.jpg' },
  { nombre: 'Mbappé', imagen: 'https://upload.wikimedia.org/wikipedia/commons/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank–129_%28cropped%29.jpg' },
  { nombre: 'Lewandowski', imagen: 'https://upload.wikimedia.org/wikipedia/commons/2/26/2019147183358_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0400_-_B70I8753_%28cropped%29.jpg' },
  { nombre: 'Benzema', imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Karim_Benzema_2018.jpg' },
  { nombre: 'Modric', imagen: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/ISL-HRV_%287%29.jpg' },
  { nombre: 'Ramos', imagen: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Sergio_Ramos_2019.jpg' },
  { nombre: 'Casillas', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Iker_Casillas_2015.jpg/640px-Iker_Casillas_2015.jpg' },
  { nombre: 'Pirlo', imagen: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Andrea_Pirlo_Italy_vs_Chile_2013.jpg' },
  { nombre: 'Buffon', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Gianluigi_Buffon_%2831784615942%29.jpg/640px-Gianluigi_Buffon_%2831784615942%29.jpg' },
  { nombre: 'Kaka', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Kak%C3%A1_visited_Stadium_St._Petersburg.jpg/640px-Kak%C3%A1_visited_Stadium_St._Petersburg.jpg' }
];

function StarRating({ rating, maxRating = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />;
        } else {
          return <Star key={i} className="w-5 h-5 text-gray-300" />;
        }
      })}
    </div>
  );
}

function App() {
  const [jugadores, setJugadores] = React.useState([]);
  const [nuevoJugador, setNuevoJugador] = React.useState({
    nombre: '',
    pase: 5,
    tiro: 5,
    regate: 5,
    defensa: 5,
    arquero: 5,
    estadoFisico: 5,
  });
  const [equipos, setEquipos] = React.useState([]);

  React.useEffect(() => {
    const jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
      setJugadores(JSON.parse(jugadoresGuardados));
    } else {
      fetch('jugadores.json')
        .then(response => response.json())
        .then(data => {
          const jugadoresConImagen = data.jugadores.map(jugador => ({
            ...jugador,
            imagen: jugadoresLegendarios[Math.floor(Math.random() * jugadoresLegendarios.length)].imagen
          }));
          setJugadores(jugadoresConImagen);
          localStorage.setItem('jugadores', JSON.stringify(jugadoresConImagen));
        })
        .catch(error => console.error('Error al cargar los jugadores:', error));
    }
  }, []);

  React.useEffect(() => {
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

  const calcularPromedioJugador = (jugador) => {
    const habilidades = ['pase', 'tiro', 'regate', 'defensa', 'arquero', 'estadoFisico'];
    const suma = habilidades.reduce((acc, hab) => acc + jugador[hab], 0);
    return suma / habilidades.length;
  };

  const calcularPromedioEquipo = (equipo) => {
    const suma = equipo.reduce((acc, jugador) => acc + calcularPromedioJugador(jugador), 0);
    return equipo.length > 0 ? suma / equipo.length : 0;
  };

  const calcularProbabilidadGanar = (equipo, totalEquipos) => {
    const promedioEquipo = calcularPromedioEquipo(equipo);
    return (promedioEquipo / 10) * (100 / totalEquipos);
  };

  const generarEquipos = () => {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => calcularPromedioJugador(b) - calcularPromedioJugador(a));
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
                <div className="mt-2 text-sm text-gray-600">
                  {habilidades.map(({ clave, icono }) => (
                    <div key={clave}>
                      {icono} {jugador[clave]}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <StarRating rating={calcularPromedioJugador(jugador) / 2} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={generarEquipos}
            className="px-10 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-2xl font-bold shadow-lg"
          >
            Generar Equipos
          </button>
        </div>

        {equipos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipos.map((equipo, equipoIndex) => (
              <div key={equipoIndex} className="bg-blue-100 rounded-lg shadow-md p-6 border-2 border-blue-300">
                <h2 className="text-3xl font-semibold mb-4 text-center text-blue-800">Equipo {equipoIndex + 1}</h2>
                <div className="mb-4">
                  <p className="text-lg font-semibold text-blue-800">Promedio del equipo:</p>
                  <StarRating rating={calcularPromedioEquipo(equipo) / 2} />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold text-blue-800">Probabilidad de ganar:</p>
                  <StarRating rating={calcularProbabilidadGanar(equipo, equipos.length) / 20} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {equipo.map((jugador, jugadorIndex) => (
                    <div key={jugadorIndex} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center justify-center border-2 border-blue-200">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-yellow-400">
                        <img src={jugador.imagen} alt={jugador.nombre} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-sm text-center text-blue-800">{jugador.nombre}</h3>
                      <div className="mt-2">
                        <StarRating rating={calcularPromedioJugador(jugador) / 2} />
                      </div>
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

ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(<CreadorEquiposFutbol />, document.getElementById('root'));
