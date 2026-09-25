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

const MAPA_FECHAS = {
  C5P: '07 de septiembre de 2026B',
  C5I: '15 al 24 de septiembre de 2026B',
  C5S: '15 al 24 de septiembre de 2026B',
  C5I2: 'del 25 de septiembre al 06 de octubre de 2026B',
  C6P: 'del 23 de septiembre al 08 de octubre de 2026B'
};

const MAPA_MODALIDAD = {
  C5P: 'Presencial',
  C5I: 'Intensiva',
  C5S: 'Semipresencial',
  C5I2: 'Intensiva',
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

const DATA_LINEAS = [
  'C5P|06:30|08:45|501B|Enfermería|2 SEM|MOD#5|E-CONIUE|CONTROLAR LAS INFECCIONES EN LOS USUARIOS Y SU ENTORNO|Katia Valencia',
  'C5P|06:30|08:45|604|Enfermería|4 SEM|MOD#5||CUIDAR INTEGRALMENTE A LA PAREJA EN EL EMBARAZO Y EL PARTO|Ariel Puello',
  'C5P|06:30|08:45|3B|Farmacia|2 SEM|MOD#5|E-BIOSEG|BIOSEGURIDAD|Mónica Rodríguez Rodríguez',
  'C5P|06:30|08:45|3A|Farmacia|3 SEM|MOD#5|E-PRIAUX|PRIMEROS AUXILIOS|Liliana Manrique',
  'C5P|06:30|08:45|4A|Cosmetología|2 SEM|MOD#5|E-DEPI|DEPILACIÓN I|Ketty Campos',
  'C5P|06:30|08:45|501A|Naviera-Logística-Comercio|2 SEM|MOD#5|E-RECDEME|RECEPCIÓN Y DESPACHO DE LAS MERCANCÍAS|Castor Ramírez',
  'C5P|06:30|08:45|602|Naviera-Logística-Comercio|1 SEM|MOD#5|E-LEGADU|LEGISLACIÓN ADUANERA|Lucía Eljach',
  'C5P|06:30|08:45|106|Primera Infancia|2 SEM|MOD#5|E-PSIEVO|PSICOLOGÍA EVOLUTIVA|María Teresa Vargas',
  'C5P|06:30|08:45|601B|Aux Vuelo|2 SEM|MOD#5|T-MAL|MANIPULACIÓN DE ALIMENTOS|Jeison Yepes',
  'C5P|06:30|08:45|2E|Cocina Nac e Inter|2 SEM|MOD#5|E-COCCAI|COCINA CALIENTE II|Nicolaza Medina',
  'C5P|06:30|08:45|2D|Cocina Nac e Inter|3 SEM|MOD#5|E-COCINTII|COCINA INTERNACIONAL II|Víctor Alcázar',
  'C5P|06:30|08:45|Diseño Gráfico|Diseño Gráfico|2 SEM|MOD#5|E-COMGRA|COMPOSICIÓN GRÁFICA|Adriana Gaviria',
  'C5P|06:30|08:45|Sistemas 1|Sistemas-Software|2 SEM|MOD#5|E-CPW|CONSTRUCCIÓN Y MANTENIMIENTO DE PÁGINAS WEB|Julio Maturana',
  'C5P|06:30|08:45|Mecánica Diésel|Mecánica Diésel|2 SEM|MOD#5|E-RSII|REPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL II|Hernando Luis Guzmán Ortega',
  'C5P|06:30|08:45|Mecánica Diésel|Mecánica Diésel|3 SEM|MOD#5|E-RSII|REPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL II|Hernando Luis Guzmán Ortega',
  'C5P|06:30|08:45|Montacarga|Montacarga|2 SEM|MOD#5|E-PROCOM3|PROCEDIMIENTOS OPERACIONALES DE MONTACARGA 3|Eladio Blanquicett Ramírez',
  'C5P|06:30|08:45|6B|Lengua Inglesa|2 SEM|MOD#5|NIVEL 11|NIVEL 11|José Tara',
  'C5P|09:00|11:15|3A|Enfermería|1 SEM|MOD#5|E-OUNOS|ORIENTAR AL USUARIO EN LAS NORMAS DE SALUD|Katia Valencia',
  'C5P|09:00|11:15|104|Enfermería|2 SEM|MOD#5|E-CONIUE|CONTROLAR LAS INFECCIONES EN LOS USUARIOS Y SU ENTORNO|Marlly López',
  'C5P|09:00|11:15|601A|Enfermería|4 SEM|MOD#5||CUIDAR INTEGRALMENTE A LA PAREJA EN EL EMBARAZO Y EL PARTO|Ariel Puello',
  'C5P|09:00|11:15|502A|Clínica Veterinaria|3 SEM|MOD#5|E-SERVCLI|SERVICIO AL CLIENTE|Cristian Aroca',
  'C5P|09:00|11:15|602|Naviera-Logística-Comercio|2 SEM|MOD#5|E-RECDEME|RECEPCIÓN Y DESPACHO DE LAS MERCANCÍAS|Lucía Teresa Eljach Mosquera',
  'C5P|09:00|11:15|702|Naviera-Logística-Comercio|3 SEM|MOD#5|E-ZONFRA|ZONA FRANCA|Castor Ramírez',
  'C5P|09:00|11:15|501B|Aux Vuelo|1 SEM|MOD#5|E-AGEVIA|AGENCIA DE VIAJES I|Jeison Yepes',
  'C5P|09:00|11:15|2D|Cocina Nac e Inter|1 SEM|MOD#5|E-COCFRA|COCINA FRÍA I|Hortensia Herrera',
  'C5P|11:30|13:30|604|Clínica Veterinaria|2 SEM|MOD#5|E-PARACI|PARACITOLOGIA|Jennifer Del Valle Randial',
  'C5P|13:45|16:00|604|Clínica Veterinaria|1 SEM|MOD#5|E-AFAN|PRIMEROS AUXILIOS VETERINARIOS|Jennifer Del Valle Randial',
  'C5I|09:00|11:15|104|Enfermería|4SEM INT|MOD#3||CUIDAR INTEGRALMENTE AL NIÑO Y A LA NIÑA MENOR DE 10 AÑOS|Carmen Lora',
  'C5I|09:00|11:15|502A|Clínica Veterinaria|3 SEM|MOD#5|E-SERVCLI|SERVICIO AL CLIENTE|Cristian Aroca',
  'C5I|09:00|11:15|Cosmetología|Cosmetología|2SEM INT|MOD#5|E-MAQSOC|MAQUILLAJE SOCIAL|Luz Angely Quintero',
  'C5I|09:00|11:15|106|Primera Infancia|2SEM INT|MOD#5|E-ETCN|ESTIMULACIÓN TEMPRANA Y CUIDADO DEL NIÑO|María Tereza Vargas',
  'C5I|09:00|11:15|2B|Mesa y Bar|1SEM INT|MOD#5|T-MAL|MANIPULACIÓN DE ALIMENTOS|Víctor Alcázar',
  'C5I|09:00|11:15|601B|Hotelería-Recepción|3SEM INT|MOD#5|E-RECRESI|RECEPCIÓN Y RESERVAS I|Nataly Valle',
  'C5I|09:00|11:15|2E|Cocina Nac e Inter|2SEM INT|MOD#5|E-COSTOS|COSTOS|Pedro Baldovino',
  'C5I|09:00|11:15|Mecánica Diésel|Mecánica Diésel|1SEM INT|MOD#7|E-MDII|REPARACIÓN MOTORES DIÉSEL III|Hernando Luis Guzmán Ortega',
  'C5I|09:00|11:15|703|Seguridad Ocupacional|3SEM INT|MOD#5|E-SISINGE|SISTEMAS INTEGRADOS DE GESTIÓN (CALIDAD)|Gloria Amador',
  'C5I|09:00|11:15|6D|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2|Abrahan Villalba',
  'C5I|09:00|11:15|6C|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2|Danna Vanessa Arenas Yi',
  'C5I|11:30|13:30|104|Enfermería|1SEM INT|MOD#7|T-ING|METODOLOGÍA DE LA INVESTIGACIÓN TÉCNICA|Marlly López',
  'C5I|11:30|13:30|103|Enfermería|2SEM INT|MOD#5|E-APNSCI|APLICAR NORMAS DE SEGURIDAD Y COMODIDAD I|Ariel Puello',
  'C5I|11:30|13:30|3A|Farmacia|1SEM INT|MOD#7|E-QUIBAS|QUÍMICA BÁSICA|Liliana Manrique',
  'C5I|11:30|13:30|3B|Farmacia|2SEM INT|MOD#5|E-FAR2|FARMACOLOGÍA II|Yesenia Bravo',
  'C5I|11:30|13:30|1A|Salud Oral|2SEM INT|MOD#5|E-ATEADU|ATENCIÓN Y ADMISIÓN AL USUARIO|Indira Espinoza Duarte',
  'C5I|11:30|13:30|1A|Mecánica Dental|1SEM INT|MOD#7|E-ADMLAB|ADMINISTRACIÓN DEL LABORATORIO|Indira Espinoza Duarte',
  'C5I|11:30|13:30|1A|Mecánica Dental|2SEM INT|MOD#5|E-ADMLAB|ADMINISTRACIÓN DEL LABORATORIO|Indira Espinoza Duarte',
  'C5I|11:30|13:30|503|Clínica Veterinaria|2 SEM|MOD#5|E-PARACI|PARACITOLOGIA|Jennifer Del Valle Randial',
  'C5I|11:30|13:30|Cosmetología|Cosmetología|1SEM INT|MOD#7|E-TECFAC|TÉCNICAS FACIALES I|Luz Anyeli Quintero Rodríguez',
  'C5I|11:30|13:30|7A|Recreación y Deporte|1SEM INT|MOD#7|E-PED|PEDAGOGÍA DEPORTIVA|Rodrigo Montes',
  'C5I|11:30|13:30|1B|Admon de Empresas-RRHH-Salud|1SEM INT|MOD#7|E-CFINCI|CONTABILIDAD FINANCIERA II|Cristian Aroca',
  'C5I|11:30|13:30|803|Admon de Empresas-RRHH-Salud|2SEM INT|MOD#5|E-SACAUSU|SERVICIO AL CLIENTE Y ATENCIÓN AL USUARIO II LEY 100-93|Alexander García',
  'C5I|11:30|13:30|1B|Admos Salud|1SEM INT|MOD#7|E-CFINCI|CONTABILIDAD FINANCIERA II|Cristian Aroca',
  'C5I|11:30|13:30|803|Admos Salud|2SEM INT|MOD#5|E-SACAUSU|SERVICIO AL CLIENTE Y ATENCIÓN AL USUARIO II LEY 100-93|Alexander García',
  'C5I|11:30|13:30|6F|Admos Salud|3SEM INT|MOD#5|E-ADSA|ADMINISTRACIÓN EN SALUD II|Beltis Lora',
  'C5I|11:30|13:30|4B|Aux Contable|1SEM INT|MOD#7|E-CRECO|CONTABILIDAD DE RESULTADOS|Mario Correa',
  'C5I|11:30|13:30|801|Naviera-Logística-Comercio|1SEM INT|MOD#7|E-OPPREXI|OPERACIÓN DE LOS PROCESOS DE EXPORTACIONES I|Castor Ramírez',
  'C5I|11:30|13:30|602|Naviera-Logística-Comercio|2SEM INT|MOD#5|E-REGCAM|REGIMEN CAMBIARIO|Lucía Teresa Eljach Mosquera',
  'C5I|11:30|13:30|106|Primera Infancia|1SEM INT|MOD#7|E-AYUDIDII|AYUDAS DIDÁCTICA II|Maria Tereza Vargas',
  'C5I|11:30|13:30|2B|Hotelería-Recepción|1SEM INT|MOD#7|E-SAI|ALIMENTOS Y BEBIDAS I (SERVICIO A LA MESA I)|Jeison Yepes',
  'C5I|11:30|13:30|2B|Hotelería-Recepción|2SEM INT|MOD#5|E-SAI|ALIMENTOS Y BEBIDAS I (SERVICIO A LA MESA I)|Jeison Yepes',
  'C5I|11:30|13:30|2D|Cocina Nac e Inter|1SEM INT|MOD#7|E-COCFRII|COCINA FRÍA II|Hortensia Herrera',
  'C5I|11:30|13:30|2E|Cocina Nac e Inter|3SEM INT|MOD#5|E-COCINTII|COCINA INTERNACIONAL II|Víctor Alcázar',
  'C5I|11:30|13:30|Sistemas 1|Sistemas-Software|1SEM INT|MOD#7|E-LGM|LÓGICA COMPUTACIONAL|Julio Maturana',
  'C5I|11:30|13:30|Sistemas 2|Sistemas-Sofware|2SEM INT|MOD#5|E-IAR|INTRODUCCIÓN A LAS REDES Y SERVICIOS DE INTERNET|Richard Arnedo',
  'C5I|11:30|13:30|Sistemas 2|Sistemas-Sofware|3SEM INT|MOD#5|E-IAR|INTRODUCCIÓN A LAS REDES Y SERVICIOS DE INTERNET|Richard Arnedo',
  'C5I|11:30|13:30|Refrigeración|Refrigeración|1SEM INT|MOD#7|T-EVAP|EVAPORADORES|Iván Sevilla Monterrosa',
  'C5I|11:30|13:30|Soldadura|Soldadura|1SEM INT|MOD#7||CONOCIMIENTOS DE LOS ELECTRODOS RUTÍLICOS Y CELULÓSICOS DE BAJO HIDRÓGENO|Xiomara Osorio Altamar',
  'C5I|11:30|13:30|Soldadura|Soldadura|2SEM INT|MOD#5||RECONOCIMIENTO DE MÁQUINAS Y HERRAMIENTAS PARA LOS PROCESOS DE SOLDADURA|Xiomara Osorio Altamar',
  'C5I|11:30|13:30|6E|Mecánica Diésel|2SEM INT|MOD#5|E-AVHA|ACONDICIONAR VEHÍCULOS (SISTEMAS DE TRANSMISIÓN II)|Hernando Luis Guzmán Ortega',
  'C5I|11:30|13:30|505|Seguridad Ocupacional|1SEM INT|MOD#7|E-HIGIND|HIGIENE INDUSTRIAL|Yesith Daniel Carvajalino',
  'C5I|11:30|13:30|703|Seguridad Ocupacional|2SEM INT|MOD#5|E-TRAALRI|TRABAJOS DE ALTO RIESGO|Gloria Amador',
  'C5I|11:30|13:30|6A|Montacarga|1SEM INT|MOD#7|E-SISALM2|SISTEMA DE ALMACENAMIENTO 2|Rafael Bautista',
  'C5I|11:30|13:30|Montacargas|Montacarga|2SEM INT|MOD#5|E-PROCOM4|PROCEDIMIENTOS OPERACIONALES DE MONTACARGA 4|Eladio Blanquicett Ramírez',
  'C5I|11:30|13:30|405|Inv Judicial y Criminalística|1SEM INT|MOD#7|E-PRO|PROBATORIO|Cynthia Xibellys Cancio Gómez',
  'C5I|11:30|13:30|6D|Lengua Inglesa|1SEM INT|MOD#7|NIVEL 5|NIVEL 5|Abrahan Villalba',
  'C5I|11:30|13:30|6C|Lengua Inglesa|2SEM INT|MOD#5|NIVEL 12|NIVEL 12|Danna Vanessa Arenas Yi',
  'C5I|11:30|13:30|6B|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2|Carlos Salas',
  'C5I|13:45|16:00|104|Enfermería|3SEM INT|MOD#5|E-PAMED|PREPARACIÓN Y ADMINISTRACIÓN DE MEDICAMENTOS I|Ariel Puello',
  'C5I|13:45|16:00|3B|Farmacia|3SEM INT|MOD#5|E-PRIAUX|PRIMEROS AUXILIOS|Marlly López',
  'C5I|13:45|16:00|1A|Salud Oral|3SEM INT|MOD#5|E-PREAMASE|PREPARACIÓN DE AMALGAMAS Y SELLANTES|Indira Espinoza Duarte',
  'C5I|13:45|16:00|503|Clínica Veterinaria|1 SEM|MOD#5|E-AFAN|PRIMEROS AUXILIOS VETERINARIOS|Jennifer Del Valle Randial',
  'C5I|13:45|16:00|801|Cosmetología|3SEM INT|MOD#5|E-TECFAC|TÉCNICAS FACIALES III|Luz Anyeli Quintero',
  'C5I|13:45|16:00|1B|Recreación y Deporte|2SEM INT|MOD#5|E-EAV|MOTROCIDAD GENERAL|Rodrigo Montes',
  'C5I|13:45|16:00|1B|Recreación y Deporte|3SEM INT|MOD#5|E-EAV|MOTROCIDAD GENERAL|Rodrigo Montes',
  'C5I|13:45|16:00|4E|Admon de Empresas-RRHH-Salud|3SEM INT|MOD#5|E-SELPER|SELECCIÓN DE PERSONAL|Alexander García',
  'C5I|13:45|16:00|4B|Aux Contable|3SEM INT|MOD#5|E-ANLFI|ANÁLISIS FINANCIERO I|Mario Correa',
  'C5I|13:45|16:00|602|Naviera Logística-Comercio|3SEM INT|MOD#5|E-ZONFRA|ZONA FRANCA|Lucía Teresa Eljach Mosquera',
  'C5I|13:45|16:00|106|Primera Infancia|3SEM INT|MOD#5|E-LEGEDU|LEGISLACIÓN EDUCATIVA|Otilia Rivas',
  'C5I|13:45|16:00|2E|Hotelería-Recepción|3SEM INT|MOD#5|E-RECRESI|RECEPCIÓN Y RESERVAS I|Jeison Yepes',
  'C5I|13:45|16:00|2D|Cocina Nac e Inter|3SEM INT|MOD#5|E-COCINTII|COCINA INTERNACIONAL II|Víctor Alcázar',
  'C5I|13:45|16:00|Sistemas 1|Sistemas-Software|3SEM INT|MOD#5|E-IAR|INTRODUCCIÓN A LAS REDES Y SERVICIOS DE INTERNET|Julio Maturana Franco',
  'C5I|13:45|16:00|Refrigeración|Refrigeración|2SEM INT|MOD#5|T-ANAL|ANÁLISIS DE FALLAS|Iván Sevilla Monterrosa',
  'C5I|13:45|16:00|Refrigeración|Refrigeración|3SEM INT|MOD#5|T-ANAL|ANÁLISIS DE FALLAS|Iván Sevilla Monterrosa',
  'C5I|13:45|16:00|Mecánica Diésel|Mecánica Diésel|3SEM INT|MOD#5|E-RSII|REPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL II|Hernando Luis Guzmán Ortega',
  'C5I|13:45|16:00|703|Seguridad Ocupacional|3SEM INT|MOD#5|E-SISINGE|SISTEMAS INTEGRADOS DE GESTIÓN (CALIDAD)|Gloria Amador',
  'C5I|13:45|16:00|405|Inv Judicial y Criminalística|3SEM INT|MOD#5|INVES-QUIM|QUÍMICA FORENSE|Cynthia Xibellys Cancio Gómez',
  'C5I|13:45|16:00|6D|Lengua Inglesa|3SEM INT|MOD#5|NIVEL 20|NIVEL 20|Abrahan Villalba',
  'C5I|13:45|16:00|6C|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2|Danna Arenas',
  'C5I|16:15|18:30|2D|Enfermería|3SEM INT|MOD#5|E-PAMED|PREPARACIÓN Y ADMINISTRACIÓN DE MEDICAMENTOS I|Yira Fajardo',
  'C5I|16:15|18:30|Cosmetología|Cosmetología|3SEM INT|MOD#5|E-TECFAC|TÉCNICAS FACIALES III|Luz Anyeli Quintero Rodríguez',
  'C5I|16:15|18:30|602|Naviera-Logística-Comercio|3SEM INT|MOD#5|E-ZONFRA|ZONA FRANCA|Castor Ramírez',
  'C5I|16:15|18:30|Inglés Técnico Niveles|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2 (VIRTUAL)|Danna Arenas',
  'C5I|16:15|18:30|Inglés Técnico Niveles|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2 (VIRTUAL)|Yeison Yepes',
  'C5S|19:00|21:00|3A|Farmacia|3SEM INT|MOD#5|E-PRIAUX|PRIMEROS AUXILIOS|(Sin docente)',
  'C5S|19:00|21:00|Sistemas 2|Admon de Empresas-RRHH-Salud|4SEM INT|MOD#3|E-SOADMA|SOFTWARE ADMINISTRATIVO I|Cristian Aroca',
  'C5S|19:00|21:00|Inglés Técnico Niveles|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2 (VIRTUAL)|José Tara',
  'C5S|19:00|21:00|Inglés Técnico Niveles|Inglés Técnico Niveles|COMBI SEM|MOD#1|NIVEL 2|NIVEL 2 (VIRTUAL)|Yeison Yepes',
  'C6P|06:30|08:45|501B|Enfermería|2 SEM|MOD#7|E-APNTAV|APLICAR NORMAS Y TÉCNICAS DEL AMBIENTE VITAL|Katia Valencia',
  'C6P|06:30|08:45|604|Enfermería|4 SEM|MOD#7|E-CIMPRN|CUIDAR INTEGRALMENTE A LA MUJER EN EL POSTPARTO Y AL RECIÉN NACIDO|Ariel Puello',
  'C6P|06:30|08:45|3B|Farmacia|2 SEM|MOD#7|E-FAR2|FARMACOLOGÍA II (USO RACIONAL DE MEDICAMENTOS)|Mónica Rodríguez Rodríguez',
  'C6P|06:30|08:45|4A|Cosmetología|2 SEM|MOD#7|E-NUTDIE|NUTRICIÓN Y DIETÉTICA|Ketty Campos',
  'C6P|06:30|08:45|602|Naviera-Logística-Comercio|1 SEM|MOD#5|E-OPPREXI|OPERACIÓN DE LOS PROCESOS DE IMPORTACIONES I|Lucía Eljach',
  'C6P|06:30|08:45|501A|Naviera-Logística-Comercio|2 SEM|MOD#7|E-REGCAM|REGIMEN CAMBIARIO|Vilma Torres Chávez',
  'C6P|06:30|08:45|106|Primera Infancia|2 SEM|MOD#7|E-ETCN|ESTIMULACIÓN TEMPRANA Y CUIDADO DEL NIÑO|María Tereza Vargas',
  'C6P|06:30|08:45|601B|Aux Vuelo|2 SEM|MOD#7|E-SAI|ALIMENTOS Y BEBIDAS I (SERVICIO A LA MESA I)|Yeison Yepes',
  'C6P|06:30|08:45|2E|Cocina Nac e Inter|2 SEM|MOD#7|E-COSTOS|COSTOS|Cristian Aroca',
  'C6P|06:30|08:45|2D|Cocina Nac e Inter|3 SEM|MOD#7|E-NUTDIE|NUTRICIÓN Y DIETÉTICA|Hortensia Herrera Villa',
  'C6P|06:30|08:45|Diseño Gráfico|Diseño Gráfico|2 SEM|MOD#7|E-COMUGRA|COMUNICACIÓN GRÁFICA|Adriana Gaviria',
  'C6P|06:30|08:45|Sistemas 1|Sistemas-Software|2 SEM|MOD#7|E-IBD|INTRODUCCIÓN A LAS BASE DATOS|Antony Baiz Tejedor',
  'C6P|06:30|08:45|Mecánica Diésel|Mecánica Diésel|2 SEM|MOD#7|E-RSD|REPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL III|Hernando Luis Guzmán Ortega',
  'C6P|06:30|08:45|Mecánica Diésel|Mecánica Diésel|3 SEM|MOD#7|E-RSD|REPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL III|Hernando Luis Guzmán Ortega',
  'C6P|06:30|08:45|Montacarga|Montacarga|2 SEM|MOD#7|E-PROCOM4|PROCEDIMIENTOS OPERACIONALES DE MONTACARGA 4|Eladio Blanquicett Ramírez',
  'C6P|09:00|11:15|3A|Enfermería|1 SEM|MOD#7|E-GENHSA|GENERAR HÁBITOS SALUDABLES EN LOS AMBIENTES DE TRABAJO|Marlly López',
  'C6P|09:00|11:15|104|Enfermería|2 SEM|MOD#7|E-APNTAV|APLICAR NORMAS Y TÉCNICAS DEL AMBIENTE VITAL|Katia Valencia',
  'C6P|09:00|11:15|601A|Enfermería|4 SEM|MOD#7|E-CIMPRN|CUIDAR INTEGRALMENTE A LA MUJER EN EL POSTPARTO Y AL RECIÉN NACIDO|Ariel Puello',
  'C6P|09:00|11:15|3A|Farmacia|3 SEM|MOD#7|E-NPS|NEGOCIACIÓN DE PRODUCTOS Y SERVICIOS I|Liliana Manrique',
  'C6P|09:00|11:15|602|Naviera-Logística-Comercio|2 SEM|MOD#7|E-REGCAM|REGIMEN CAMBIARIO|Lucía Teresa Eljach Mosquera',
  'C6P|09:00|11:15|702|Naviera-Logística-Comercio|3 SEM|MOD#7|E-ARANIA|ARANCEL I|Vilma Torres',
  'C6P|09:00|11:15|501B|Aux Vuelo|1 SEM|MOD#7|E-DESTUR|DESTINO TURÍSTICO|Yeison Yepes',
  'C6P|09:00|11:15|2D|Cocina Nac e Inter|1 SEM|MOD#7|E-COCFRIA|COCINA FRÍA I|Hortensia Herrera',
  'C6P|09:00|11:15|103|Inglés Técnico Niveles|COMBI SEM|MOD#7|NIVEL 12|NIVEL 12|José Tara',
  'C6P|11:30|13:30|6F|Clínica Veterinaria|2 SEM|MOD#7|E-ENFERIN|ENFERMEDADES INFECCIOSAS|Jennifer Del Valle Randial',
  'C6P|13:45|16:00|6F|Clínica Veterinaria|1 SEM|MOD#7|E-IYTMIN|INYECTOLOGIA Y TOMA DE MUESTRAS|Jennifer Del Valle Randial',
  // === NUEVOS REGISTROS DE LAS IMAGENES ADICIONALES ===
  'C5I2|13:45|16:00|2D|Cocina nac e inter|3SEM INT|MOD#6|E-NUTDIE|NUTRICION Y DIETETICA|Victor Alcazar',
  // REVISAR: el texto del modulo aparece compuesto por dos descripciones en la captura.
  'C5I2|13:45|16:00|Sistemas 2|Sistemas-Software|3SEM INT|MOD#6|E-IR|INSTALACION Y MANTENIMIENTO DE REDES INFORMATICAS / INSTALACION Y SOPORTE DE REDES INFORMATICAS|Julio Maturana',
  'C5I2|13:45|16:00|Refrigeracion|Refrigeracion|2SEM INT|MOD#6|E-ELECIII|ELECTRICIDAD III (SISTEMA DE POTENCIA)|Ivan Sevilla Monterrosa',
  'C5I2|13:45|16:00|Refrigeracion|Refrigeracion|2SEM INT|MOD#6|E-ELECIII|ELECTRICIDAD III (SISTEMA DE POTENCIA)|Ivan Sevilla Monterrosa',
  'C5I2|13:45|16:00|Mecanica Diesel|Mecanica Diesel|3SEM INT|MOD#6|E-RSD|REPARACION DE LOS SISTEMAS DE COMBUSTIBLES DIESEL III|Hernando Luis Guzman',
  'C5I2|13:45|16:00|703|Seguridad Ocupacional|3SEM INT|MOD#6|E-SISINGE|SISTEMAS INTEGRADOS DE GESTION II (AMBIENTAL)|Gloria Amador',
  'C5I2|13:45|16:00|405|Inv Judicial y Criminalistica|3SEM INT|MOD#6|E-FOTPLAN|FOTOGRAFIA Y PLANIMETRIA FORENSE|Cynthia Xibellys Cancio Gomez',
  'C5I2|13:45|16:00|6D|Lengua Inglesa|2SEM INT|MOD#6|NIVEL 21|NIVEL 21|Abraham Villalba',
  'C5I2|09:00|11:15|103|Ingles Tecnico Niveles|COMBI SEM|MOD#1|NIVEL 3|NIVEL 3|Danna Arenas',
  'C5I2|13:45|16:00|103|Enfermeria|3SEM INT|MOD#6|E-PAMED|PREPARACION Y ADMINISTRACION DE MEDICAMENTOS II|Ariel Puello',
  'C5I2|13:45|16:00|3B|Farmacia|3SEM INT|MOD#6|E-INSPSI|INSPECCION DE PRODUCTOS Y SERVICIOS I|Yesenia Bravo',
  'C5I2|13:45|16:00|1A|Salud Oral|3SEM INT|MOD#6|E-PROMPS|PROMOCION Y PREVENCION DE LA SALUD PUBLICA BUCAL I|Indira Espinoza',
  'C5I2|13:45|16:00|Cosmetologia|Cosmetologia|3SEM INT|MOD#6|E-TECFAC|TECNICAS FACIALES IV|Luz Anyeli Quintero',
  'C5I2|13:45|16:00|1B|Recreacion y Deporte|2SEM INT|MOD#6|E-EDUFUN|FUNDAMENTO DEL ENTRENAMIENTO PERSONALIZADO|Rodrigo Montes',
  'C5I2|13:45|16:00|1B|Recreacion y Deporte|3SEM INT|MOD#6|E-EDUFUN|FUNDAMENTO DEL ENTRENAMIENTO PERSONALIZADO|Rodrigo Montes',
  'C5I2|13:45|16:00|4E|Admon de Empresas-RRHH-Salud|3SEM INT|MOD#6|E-CONPER|CONTRATACION DE PERSONAL|Cristian Aroca',
  'C5I2|13:45|16:00|4B|Aux Contable|3SEM INT|MOD#6|E-ANLFI|ANALISIS FINANCIERO II|Mario Correa',
  'C5I2|13:45|16:00|602|Naviera-Logistica-Comercio|3SEM INT|MOD#6|E-ARANII|ARANCEL II|Lucia Teresa Eljach Mosquera',
  'C5I2|13:45|16:00|Sistemas 1|Primera Infancia|3SEM INT|MOD#6|E-PROEDU|PROYECTO EDUCATIVO INSTITUCIONAL|Otilia Rivas',
  'C5I2|13:45|16:00|2E|Hoteleria-Recepcion|3SEM INT|MOD#6|E-RECRESII|RECEPCION Y RESERVAS II|Yeison Yepes',
  'C5I2|11:30|13:30|6A|Montacarga|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Daniel Rico',
  'C5I2|11:30|13:30|6E|Montacarga|2SEM INT|MOD#6|E-PROCOM5|PROCEDIMIENTOS OPERACIONALES DE MONTACARGA 5|Rafael Bautista',
  'C5I2|11:30|13:30|405|Inv Judicial y Criminalistica|1SEM INT|MOD#8|E-MORFFAC|MORFOLOGIA FACIAL FORENSE|Cynthia Xibellys Cancio',
  'C5I2|11:30|13:30|6C|Lengua Inglesa|2SEM INT|MOD#6|NIVEL 13|NIVEL 13|Abraham Villalba',
  'C5I2|11:30|13:30|6D|Lengua Inglesa|1SEM INT|MOD#6|NIVEL 6|NIVEL 6|Danna Yi',
  'C5I2|09:00|11:15|103|Ingles Tecnico Niveles|COMBI SEM||NIVEL 4|NIVEL 4|Carlos Salas',
  'C5I2|11:30|13:30|802|Naviera-Logistica-Comercio|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Danna Arenas',
  'C5I2|11:30|13:30|602|Naviera-Logistica-Comercio|2SEM INT|MOD#6|E-GESTADII|GESTION ADUANERA II|Lucia Teresa Eljach Mosquera',
  'C5I2|11:30|13:30|601A|Primera Infancia|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Luz Anyeli Quintero Rodriguez',
  'C5I2|11:30|13:30|505|Hoteleria-Recepcion|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Yeison Yepes',
  'C5I2|11:30|13:30|503|Hoteleria-Recepcion|2SEM INT|MOD#6|E-RECRESII|RECEPCION Y RESERVAS II|Nataly Guerrero',
  'C5I2|11:30|13:30|2D|Cocina nac e inter|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Doris Escorcia',
  'C5I2|11:30|13:30|2B|Cocina nac e inter|3SEM INT|MOD#6|E-NUTDIE|NUTRICION Y DIETETICA|Victor Alcazar',
  'C5I2|11:30|13:30|Sistemas 1|Sistemas-Software|1SEM INT|MOD#8|E-ALGOR|ALGORITMO|Julio Maturana',
  // REVISAR: abreviatura/codigo del modulo de instalacion no se distingue completamente.
  'C5I2|11:30|13:30|Sistemas 1|Sistemas-Software|2SEM INT|MOD#6|E-IR|INSTALACION Y MANTENIMIENTO DE REDES INFORMATICAS / INSTALACION Y SOPORTE DE REDES INFORMATICAS|Richard Arnedo',
  // REVISAR: abreviatura/codigo del modulo de instalacion no se distingue completamente.
  'C5I2|11:30|13:30|Sistemas 1|Sistemas-Software|3SEM INT|MOD#6|E-IR|INSTALACION Y MANTENIMIENTO DE REDES INFORMATICAS / INSTALACION Y SOPORTE DE REDES INFORMATICAS|Richard Arnedo',
  'C5I2|11:30|13:30|6A|Refrigeracion|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Daniel Rico',
  'C5I2|11:30|13:30|6A|Refrigeracion|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Daniel Rico',
  // REVISAR: aula/semestre/codigo parcialmente cortados en la captura.
  'C5I2|11:30|13:30|Soldadura|Soldadura|2SEM INT|MOD#6||PROCEDIMIENTOS DE MATERIALES PARA LOS PROCESOS DE SOLDADURA|Xiomara Osorio',
  'C5I2|11:30|13:30|Mecanica Diesel|Mecanica Diesel|2SEM INT|MOD#6|E-AVHA|ACONDICIONAR VEHICULOS (SISTEMAS DE TRANSMISION II)|Hernando Luis Guzman Ortega',
  'C5I2|11:30|13:30|703|Seguridad Ocupacional|1SEM INT|MOD#8||SANEAMIENTO BASICO|Yesith Carvajalino',
  'C5I2|11:30|13:30|703|Seguridad Ocupacional|2SEM INT|MOD#6|E-PLANEME|PLAN DE EMERGENCIA|Gloria Amador',
  'C5I2|17:00|21:00|3A|Farmacia|3SEM INT|MOD#6|E-NPS|NEGOCIACION DE PRODUCTOS Y SERVICIOS I|Alejandro Rodelo',
  'C5I2|17:00|21:00|Sistemas 1|Admon de Empresas-RRHH-Salud|4SEM INT|MOD#3|E-SOADMA|SOFTWARE ADMINISTRATIVO I|Cristian Aroca',
  'C5I2|09:00|11:15|103|Ingles Tecnico Niveles|COMBI SEM|MOD#2|NIVEL 3|NIVEL 3 (VIRTUAL)|Yeison Jimenez',
  'C5I2|09:00|11:15|103|Ingles Tecnico Niveles|COMBI SEM|MOD#2|NIVEL 3|NIVEL 3 (VIRTUAL)|Jose Taras',
  'C5I2|16:15|18:30|2D|Enfermeria|3SEM INT|MOD#6|E-PAMED|PREPARACION Y ADMINISTRACION DE MEDICAMENTOS II|Katia Valencia',
  'C5I2|16:15|18:30|Sistemas 1|Cosmetologia|3SEM INT|MOD#6|E-TECFAC|TECNICAS FACIALES IV|Luz Anyeli Quintero',
  'C5I2|16:15|18:30|503|Naviera-Logistica-Comercio|3SEM INT|MOD#6|E-ARANII|ARANCEL I|Castor Ramirez',
  'C5I2|09:00|11:15|103|Ingles Tecnico Niveles|COMBI SEM|MOD#2|NIVEL 3|NIVEL 3 (VIRTUAL)|Yeison Jimenez',
  'C5I2|09:00|11:15|103|Ingles Tecnico Niveles|COMBI SEM|MOD#2|NIVEL 3|NIVEL 3 (VIRTUAL)|Danna Arenas',
  'C5I2|09:00|11:15|103|Enfermeria|4SEM INT|MOD#4||VACUNACION|Yira Fajardo',
  'C5I2|09:00|11:15|Cosmetologia|Cosmetologia|2SEM INT|MOD#6|E-TECCOR|TECNICAS CORPORALES I|Luz Anyeli Quintero',
  'C5I2|09:00|11:15|703|Naviera-Logistica-Comercio|1SEM INT|MOD#2|E-INCEX|INTRODUCCION AL COMERCIO EXTERIOR E INTERNACIONAL|Castor Ramirez',
  'C5I2|09:00|11:15|106|Primera Infancia|2SEM INT|MOD#6|E-PRODAP|PROBLEMA Y DIFICULTAD DEL APRENDIZAJE|Maria Tereza Vargas',
  'C5I2|09:00|11:15|2B|Mesa y Bar|1SEM INT|MOD#6|E-SAI|ALIMENTOS Y BEBIDAS I (SERVICIO A LA MESA I)|Victor Alcazar',
  'C5I2|09:00|11:15|601B|Hoteleria-Recepcion|3SEM INT|MOD#6|E-RECRESII|RECEPCION Y RESERVAS II|Nataly Guerrero',
  'C5I2|09:00|11:15|2E|Cocina nac e inter|2SEM INT|MOD#6|E-COCNAC|COCINA NACIONAL I|Nicolaza Molina',
  'C5I2|09:00|11:15|Mecanica Diesel|Mecanica Diesel|1SEM INT|MOD#8|E-RMDIV|REPARAR MOTORES DIESEL IV|Hernando Guzman',
  'C5I2|09:00|11:15|502B|Seguridad Ocupacional|3SEM INT|MOD#6|E-SISINGE|SISTEMAS INTEGRADOS DE GESTION II (AMBIENTAL)|Gloria Amador',
  'C5I2|09:00|11:15|6C|Ingles Tecnico Niveles|COMBI SEM|MOD#2|NIVEL 3|NIVEL 3|Abraham Villalba',
  'C5I2|09:00|11:15|6D|Ingles Tecnico Niveles|COMBI SEM|MOD#2|NIVEL 3|NIVEL 3|Danna Vanessa Arenas Yi',
  'C5I2|06:30|08:45|1A|Mecanica Dental|1SEM INT|MOD#6|E-PRPR|PRACTICAS DE PROTESIS REMOVIBLE|Augusto Contreras Mendoza',
  'C5I2|06:30|08:45|601A|Admon de Empresas-RRHH-Salud|3SEM INT|MOD#6|E-CONPER|CONTRATACION DE PERSONAL|Liria Colmenares',
  'C5I2|06:30|08:45|4B|Aux Contable|3SEM INT|MOD#6|E-ANLFI|ANALISIS FINANCIERO II|Pedro Baldovino',
  'C5I2|06:30|08:45|702|Naviera-Logistica-Comercio|3SEM INT|MOD#6|E-ARANII|ARANCEL II|Carmelo Lugo',
  'C5I2|06:30|08:45|104|Hoteleria-Recepcion|3SEM INT|MOD#6|E-RECRESII|RECEPCION Y RESERVAS II|Nataly Guerrero',
  'C5I2|06:30|08:45|703|Seguridad Ocupacional|3SEM INT|MOD#6|E-SISINGE|SISTEMAS INTEGRADOS DE GESTION II (AMBIENTAL)|Gloria Amador',
  'C5I2|11:30|13:30|104|Enfermeria|1SEM INT|MOD#8|E-EVCFEE|EVALUACION DE LAS CONDICIONES FISICAS Y EMOCIONALES I|Marlly Lopez',
  'C5I2|11:30|13:30|103|Enfermeria|2SEM INT|MOD#6|E-APNSCII|APLICAR NORMAS DE SEGURIDAD Y COMODIDAD II|Ariel Puello',
  'C5I2|11:30|13:30|3A|Farmacia|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Liliana Manrique',
  'C5I2|11:30|13:30|3B|Farmacia|2SEM INT|MOD#6|E-DISPMED|DISPENSACION DE MEDICAMENTOS|Yesenia Bravo',
  'C5I2|11:30|13:30|1A|Salud Oral|2SEM INT|MOD#6|E-INSODO|INSTRUMENTALES ODONTOLOGICOS|Indira Espinoza Duarte',
  'C5I2|11:30|13:30|1A|Mecanica Dental|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Indira Espinoza Duarte',
  'C5I2|11:30|13:30|1A|Mecanica Dental|2SEM INT|MOD#6|E-INSODO|INSTRUMENTALES ODONTOLOGICOS|Indira Espinoza Duarte',
  'C5I2|11:30|13:30|601A|Cosmetologia|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Luz Anyeli Quintero Rodriguez',
  'C5I2|11:30|13:30|3A|Recreacion y Deporte|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Liliana Manrique',
  'C5I2|11:30|13:30|801|Admon de Empresas-RRHH-Salud|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Yira Karina Redondo Garcia',
  'C5I2|11:30|13:30|4B|Admon de Empresas-RRHH-Salud|2SEM INT|MOD#6|E-GCAP|GESTION DE LA CALIDAD APLICADA|Alexander Garcia',
  'C5I2|11:30|13:30|801|Admos Salud|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Yira Karina Redondo Garcia',
  'C5I2|11:30|13:30|4B|Admos Salud|2SEM INT|MOD#6|E-GCAP|GESTION DE LA CALIDAD APLICADA|Alexander Garcia',
  'C5I2|11:30|13:30|1B|Admos Salud|3SEM INT|MOD#6|E-SSF|FACTURACION EN LOS SERVICIOS DE LA SALUD I|Beltis Lora',
  'C5I2|11:30|13:30|801|Aux Contable|1SEM INT|MOD#8|T-ETV|ETICA Y VALORES|Yira Karina Redondo Garcia'
];

const todosLosHorarios = DATA_LINEAS.map((linea, index) => parseLineaHorario(linea, index));
const horarios = todosLosHorarios.filter((horario) => !horario.id.startsWith('c6'));
const horariosCorte6 = todosLosHorarios.filter((horario) => horario.id.startsWith('c6'));

module.exports = {
  profesores,
  materias,
  salones,
  estudiantes,
  horarios,
  horariosCorte6
};
