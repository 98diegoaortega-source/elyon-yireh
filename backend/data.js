const profesores = [
  { id: 'prof-1', nombre: 'Lucia Tereza Eljach', email: 'lucia.eljach@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Naviera-Logística-Comercio', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'LE', color: 'from-orange-500 to-amber-600' },
  { id: 'prof-2', nombre: 'Carmelo Lugo', email: 'carmelo.lugo@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Naviera-Logística-Comercio', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'CL', color: 'from-orange-500 to-amber-600' },
  { id: 'prof-3', nombre: 'Maria Teresa Vargas', email: 'maria.vargas@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Primera Infancia', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'MV', color: 'from-cyan-500 to-blue-600' },
  { id: 'prof-4', nombre: 'Ana Milena Fernandez Ballesteros', email: 'ana.ballesteros@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Primera Infancia', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'AB', color: 'from-cyan-500 to-blue-600' },
  { id: 'prof-5', nombre: 'Otilia Rivas Valdides', email: 'otilia.rivas@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Primera Infancia', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'OR', color: 'from-cyan-500 to-blue-600' },
  { id: 'prof-6', nombre: 'Laura Niño', email: 'laura.nino@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Hotelería-Recepción', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'LN', color: 'from-emerald-500 to-green-600' },
  { id: 'prof-7', nombre: 'Jeison Yepes', email: 'jeison.yepes@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Hotelería-Recepción', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'JY', color: 'from-emerald-500 to-green-600' },
  { id: 'prof-8', nombre: 'Nataly Guerrero', email: 'nataly.guerrero@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Hotelería-Recepción', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'NG', color: 'from-emerald-500 to-green-600' },
  { id: 'prof-9', nombre: 'Laura Arzuza', email: 'laura.arzuza@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Diseño y confección', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'LA', color: 'from-pink-500 to-rose-600' },
  { id: 'prof-10', nombre: 'Azalea Eljach', email: 'azalea.eljach@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Diseño y confección', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'AE', color: 'from-pink-500 to-rose-600' },
  { id: 'prof-11', nombre: 'Cristian Torres', email: 'cristian.torres@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Diseño gráfico', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'CT', color: 'from-violet-500 to-purple-600' },
  { id: 'prof-12', nombre: 'Richard Arnedo', email: 'richard.arnedo@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Sistemas-Software', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'RA', color: 'from-blue-500 to-indigo-600' },
  { id: 'prof-13', nombre: 'Xavier Egea', email: 'xavier.egea@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Sistemas-Software', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'XE', color: 'from-blue-500 to-indigo-600' },
  { id: 'prof-14', nombre: 'Ivan Sevilla Monterrosa', email: 'ivan.sevilla@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Refrigeración', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'IS', color: 'from-yellow-500 to-amber-600' },
  { id: 'prof-15', nombre: 'Xiomara Osorio Altamar', email: 'xiomara.osorio@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Soldadura', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'XO', color: 'from-red-500 to-orange-500' },
  { id: 'prof-16', nombre: 'Hortensia Herrera Villa', email: 'hortensia.herrera@instituto.edu.co', telefono: 'Contacto institucional', departamento: 'Cocina Nacional e Internacional', oficina: 'Coordinación académica', horarioAtencion: 'Consultar disponibilidad', foto: 'HH', color: 'from-emerald-500 to-teal-600' }
];

const materias = [
  { id: 'mat-1', nombre: 'E-GESTION ADUANERA I', codigo: 'MOD4-01', programa: 'Naviera-Logística-Comercio', creditos: 0, departamento: 'Naviera-Logística-Comercio', color: 'from-orange-500 to-amber-500' },
  { id: 'mat-2', nombre: 'E-NAVIAVIERA I / LOGÍSTICA DE SALIDA', codigo: 'MOD4-02', programa: 'Naviera-Logística-Comercio', creditos: 0, departamento: 'Naviera-Logística-Comercio', color: 'from-orange-500 to-amber-500' },
  { id: 'mat-3', nombre: 'E-NAVIAVIERA I / LOGÍSTICA DE SALIDA / LEGISLACIÓN NAVIERA', codigo: 'MOD4-03', programa: 'Naviera-Logística-Comercio', creditos: 0, departamento: 'Naviera-Logística-Comercio', color: 'from-orange-500 to-amber-500' },
  { id: 'mat-4', nombre: 'E-PREMATRE-MATEMÁTICA', codigo: 'MOD4-04', programa: 'Primera Infancia', creditos: 0, departamento: 'Primera Infancia', color: 'from-cyan-500 to-blue-500' },
  { id: 'mat-5', nombre: 'E-DESARROLLO DEL PENSAMIENTO', codigo: 'MOD4-05', programa: 'Primera Infancia', creditos: 0, departamento: 'Primera Infancia', color: 'from-cyan-500 to-blue-500' },
  { id: 'mat-6', nombre: 'E-METODOLOGÍA DE LA INVESTIGACIÓN', codigo: 'MOD4-06', programa: 'Primera Infancia', creditos: 0, departamento: 'Primera Infancia', color: 'from-cyan-500 to-blue-500' },
  { id: 'mat-7', nombre: 'E-SERVICIO AL CLIENTE', codigo: 'MOD4-07', programa: 'Hotelería-Recepción', creditos: 0, departamento: 'Hotelería-Recepción', color: 'from-emerald-500 to-green-500' },
  { id: 'mat-8', nombre: 'T-MANIPULACIÓN DE ALIMENTOS', codigo: 'MOD4-08', programa: 'Hotelería-Recepción', creditos: 0, departamento: 'Hotelería-Recepción', color: 'from-emerald-500 to-green-500' },
  { id: 'mat-9', nombre: 'E-ORGANIZACIÓN DE EVENTOS Y BANQUETES', codigo: 'MOD4-09', programa: 'Hotelería-Recepción', creditos: 0, departamento: 'Hotelería-Recepción', color: 'from-emerald-500 to-green-500' },
  { id: 'mat-10', nombre: 'E-COCINA INTERNACIONAL I', codigo: 'MOD4-10', programa: 'Cocina nac e inter', creditos: 0, departamento: 'Cocina nac e inter', color: 'from-green-500 to-emerald-600' },
  { id: 'mat-11', nombre: 'E-ABRASCEROSIOS', codigo: 'MOD4-11', programa: 'Diseño y confección', creditos: 0, departamento: 'Diseño y confección', color: 'from-pink-500 to-rose-500' },
  { id: 'mat-12', nombre: 'E-CONFECCIÓN I', codigo: 'MOD4-12', programa: 'Diseño y confección', creditos: 0, departamento: 'Diseño y confección', color: 'from-pink-500 to-rose-500' },
  { id: 'mat-13', nombre: 'E-TIPOGRAFÍA', codigo: 'MOD4-13', programa: 'Diseño gráfico', creditos: 0, departamento: 'Diseño gráfico', color: 'from-violet-500 to-purple-500' },
  { id: 'mat-14', nombre: 'E-INTRODUCCIÓN AL HTML', codigo: 'MOD4-14', programa: 'Sistemas-Software', creditos: 0, departamento: 'Sistemas-Software', color: 'from-blue-500 to-indigo-500' },
  { id: 'mat-15', nombre: 'E-DESARROLLO DE APLICACIONES WEB', codigo: 'MOD4-15', programa: 'Sistemas-Software', creditos: 0, departamento: 'Sistemas-Software', color: 'from-blue-500 to-indigo-500' },
  { id: 'mat-16', nombre: 'T-ELEMENTOS DE EXPANSIÓN', codigo: 'MOD4-16', programa: 'Refrigeración', creditos: 0, departamento: 'Refrigeración', color: 'from-yellow-500 to-amber-500' },
  { id: 'mat-17', nombre: 'T-POSICIÓN DE SOLDADURA 1F 2F 3F 4F', codigo: 'MOD4-17', programa: 'Soldadura', creditos: 0, departamento: 'Soldadura', color: 'from-red-500 to-orange-500' },
  { id: 'mat-18', nombre: 'T-DESDEFECTOS EXTERNOS EN SOLDADURA', codigo: 'MOD4-18', programa: 'Soldadura', creditos: 0, departamento: 'Soldadura', color: 'from-red-500 to-orange-500' }
];

const salones = [
  { id: 'salon-1', nombre: '602', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-2', nombre: '501A', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-3', nombre: '302B', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-4', nombre: '303', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-5', nombre: '106', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-6', nombre: '502A', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-7', nombre: '2B', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-8', nombre: '7B', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-9', nombre: '402B', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-10', nombre: '2D', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-11', nombre: '302A', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-12', nombre: 'MODA', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-13', nombre: 'SISTEMAS 1', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-14', nombre: 'REFRIGERACIÓN', edificio: 'Sede principal', tipo: 'Aula' },
  { id: 'salon-15', nombre: 'SOLDADURA', edificio: 'Sede principal', tipo: 'Aula' }
];

const estudiantes = [
  { id: 'est-001', nombre: 'Estudiante demo', carrera: 'Todos los programas', semestre: 'Corte 4' }
];

const MESES = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11
};

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function parseRangoFechas(texto) {
  const textoNormalizado = String(texto || '').trim();
  const meses = Object.keys(MESES).join('|');
  const rango = textoNormalizado.match(new RegExp(`^(\\d{1,2})\\s+al\\s+(\\d{1,2})\\s+de\\s+(${meses})\\s+de\\s+(\\d{4})\\s*([A-Za-z])?$`, 'i'));
  const fechaConBloque = textoNormalizado.match(new RegExp(`^(\\d{1,2})\\s+de\\s+(${meses})\\s+de\\s+(\\d{4})\\s*([A-Za-z])$`, 'i'));
  const rangoEntreMeses = textoNormalizado.match(new RegExp(`^(?:del\\s+)?(\\d{1,2})\\s+de\\s+(${meses})\\s+al\\s+(\\d{1,2})\\s+de\\s+(${meses})\\s+(?:de\\s+)?(\\d{4})\\s*([A-Za-z])?$`, 'i'));

  let diaInicio;
  let diaFin;
  let mesInicio;
  let mesFin;
  let anio;
  let anioFin;
  let bloque = null;

  if (rango) {
    diaInicio = Number(rango[1]);
    diaFin = Number(rango[2]);
    mesInicio = MESES[rango[3].toLowerCase()];
    mesFin = mesInicio;
    anio = Number(rango[4]);
    bloque = rango[5] ? rango[5].toUpperCase() : null;
  } else if (fechaConBloque) {
    diaInicio = Number(fechaConBloque[1]);
    diaFin = diaInicio;
    mesInicio = MESES[fechaConBloque[2].toLowerCase()];
    mesFin = mesInicio;
    anio = Number(fechaConBloque[3]);
    anioFin = anio;
    bloque = fechaConBloque[4].toUpperCase();
  } else if (rangoEntreMeses) {
    diaInicio = Number(rangoEntreMeses[1]);
    mesInicio = MESES[rangoEntreMeses[2].toLowerCase()];
    diaFin = Number(rangoEntreMeses[3]);
    mesFin = MESES[rangoEntreMeses[4].toLowerCase()];
    anio = Number(rangoEntreMeses[5]);
    anioFin = mesFin < mesInicio ? anio + 1 : anio;
    bloque = rangoEntreMeses[6] ? rangoEntreMeses[6].toUpperCase() : null;
  } else {
    return { fechas: [], bloque: null };
  }

  if (anioFin === undefined) anioFin = anio;

  const fechaInicio = new Date(anio, mesInicio, diaInicio);
  const fechaFin = new Date(anioFin, mesFin, diaFin);
  if (
    fechaInicio.getFullYear() !== anio ||
    fechaInicio.getMonth() !== mesInicio ||
    fechaInicio.getDate() !== diaInicio ||
    fechaFin.getFullYear() !== anioFin ||
    fechaFin.getMonth() !== mesFin ||
    fechaFin.getDate() !== diaFin ||
    fechaFin < fechaInicio
  ) {
    return { fechas: [], bloque: null };
  }

  const fechas = [];
  for (let fecha = fechaInicio; fecha <= fechaFin; fecha.setDate(fecha.getDate() + 1)) {
    fechas.push({
      fecha: `${String(fecha.getDate()).padStart(2, '0')}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${fecha.getFullYear()}`,
      dia: DIAS_SEMANA[fecha.getDay()]
    });
  }

  return { fechas, bloque };
}

const fs = require('fs');
const path = require('path');

const MAPA_FECHAS = {
  C5P: '07 de septiembre de 2026B',
  C5I: '15 al 24 de septiembre de 2026B',
  C5S: '15 al 24 de septiembre de 2026B',
  C6P: 'del 23 de septiembre al 08 de octubre de 2026B'
};

const MAPA_MODALIDAD = {
  C5P: 'Presencial',
  C5I: 'Intensiva',
  C5S: 'Semipresencial',
  C6P: 'Presencial'
};

let contadorC5 = 0;
let contadorC6 = 0;

function parseLineaHorario(linea, index) {
  const [marca, horaInicio, horaFin, aula, programa, semestre, corte, codigo, modulo, docente] = linea.split('|');
  const fecha = MAPA_FECHAS[marca];
  const { fechas, bloque } = parseRangoFechas(fecha);
  const prefijo = marca.startsWith('C6') ? 'c6' : 'c5';
  const numero = prefijo === 'c6' ? ++contadorC6 : ++contadorC5;
  return {
    id: `${prefijo}-${String(numero).padStart(3, '0')}`,
    aula, horaInicio, horaFin,
    modalidad: MAPA_MODALIDAD[marca],
    programa, semestre, corte, codigo, modulo, docente,
    estudiantes: 0,
    fecha, bloque, fechas
  };
}

const rutasData = [
  path.join(__dirname, 'data-corregida.txt'),
  path.join(__dirname, '..', 'data-corregida.txt')
];
const rutaData = rutasData.find((ruta) => fs.existsSync(ruta)) || rutasData[0];
let todasLasLineas = [];
try {
  todasLasLineas = fs.readFileSync(rutaData, 'utf8')
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter(Boolean);
} catch (error) {
  console.warn('No se pudo leer data-corregida.txt:', error.message);
}

const todosLosHorarios = todasLasLineas.map((linea, index) => parseLineaHorario(linea, index));
const horarios = todosLosHorarios.filter((horario) => horario.id.startsWith('c5'));
const horariosCorte6 = todosLosHorarios.filter((horario) => horario.id.startsWith('c6'));

module.exports = {
  profesores,
  materias,
  salones,
  estudiantes,
  horarios,
  horariosCorte6
};
