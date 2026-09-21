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

const horarios = [
  { id: 'hor-1', materiaId: 'mat-1', profesorId: 'prof-1', salonId: 'salon-1', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Naviera-Logística-Comercio', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-2', materiaId: 'mat-2', profesorId: 'prof-2', salonId: 'salon-2', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Naviera-Logística-Comercio', semestre: '3 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-3', materiaId: 'mat-3', profesorId: 'prof-2', salonId: 'salon-2', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Naviera-Logística-Comercio', semestre: '4 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-4', materiaId: 'mat-4', profesorId: 'prof-3', salonId: 'salon-3', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Primera Infancia', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-5', materiaId: 'mat-5', profesorId: 'prof-4', salonId: 'salon-4', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Primera Infancia', semestre: '3 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-6', materiaId: 'mat-6', profesorId: 'prof-5', salonId: 'salon-5', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Primera Infancia', semestre: '4 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-7', materiaId: 'mat-7', profesorId: 'prof-6', salonId: 'salon-6', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Hotelería-Recepción', semestre: '1 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-8', materiaId: 'mat-8', profesorId: 'prof-7', salonId: 'salon-7', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Hotelería-Recepción', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-9', materiaId: 'mat-9', profesorId: 'prof-8', salonId: 'salon-8', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Hotelería-Recepción', semestre: '3 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-10', materiaId: 'mat-9', profesorId: 'prof-8', salonId: 'salon-8', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Hotelería-Recepción', semestre: '4 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-11', materiaId: 'mat-7', profesorId: 'prof-6', salonId: 'salon-6', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Aux vuelo', semestre: '1 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-12', materiaId: 'mat-8', profesorId: 'prof-7', salonId: 'salon-7', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Aux vuelo', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-13', materiaId: 'mat-8', profesorId: 'prof-7', salonId: 'salon-9', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Aux vuelo', semestre: '3 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-14', materiaId: 'mat-10', profesorId: 'prof-16', salonId: 'salon-10', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Cocina nac e inter', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-15', materiaId: 'mat-10', profesorId: 'prof-16', salonId: 'salon-10', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Cocina nac e inter', semestre: '3 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-16', materiaId: 'mat-10', profesorId: 'prof-16', salonId: 'salon-10', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Cocina nac e inter', semestre: '4 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-17', materiaId: 'mat-11', profesorId: 'prof-9', salonId: 'salon-11', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Diseño y confección', semestre: '1 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-18', materiaId: 'mat-12', profesorId: 'prof-10', salonId: 'salon-12', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Diseño y confección', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-19', materiaId: 'mat-13', profesorId: 'prof-11', salonId: 'salon-13', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Diseño gráfico', semestre: '1 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-20', materiaId: 'mat-13', profesorId: 'prof-11', salonId: 'salon-13', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Diseño gráfico', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-21', materiaId: 'mat-14', profesorId: 'prof-12', salonId: 'salon-13', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Sistemas-Software', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-22', materiaId: 'mat-15', profesorId: 'prof-13', salonId: 'salon-13', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Sistemas-Software', semestre: '4 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-23', materiaId: 'mat-16', profesorId: 'prof-14', salonId: 'salon-14', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Refrigeración', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-24', materiaId: 'mat-17', profesorId: 'prof-15', salonId: 'salon-15', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Soldadura', semestre: '2 SEM', estudianteIds: ['est-001'] },
  { id: 'hor-25', materiaId: 'mat-18', profesorId: 'prof-15', salonId: 'salon-15', dia: 'Corte 4', fecha: '05 al 19 de septiembre de 2026', horaInicio: '06:45', horaFin: '12:15', modalidad: 'Semipresencial', corte: 'MOD#4', carrera: 'Soldadura', semestre: '3 SEM', estudianteIds: ['est-001'] }
];

const profesoresImagen = [
  'MILLER ARZUZA',
  'HERNANDO LUIS GUZMAN ORTEGA',
  'RICHARD WILCHES',
  'YESITH DANIEL CARVAJALINO',
  'GLORIA AMADOR',
  'RAFAEL BAUTISTA',
  'ELADIO BLANQUETT RAMIREZ',
  'ADOLFO ACUNA',
  'JARO GOMEZ',
  'BELTIS LORA',
  'MERCEDES OSORIO',
  'JOSE TARA'
].map((nombre, index) => ({
  id: `img-prof-${index + 1}`,
  nombre,
  email: `${nombre.toLowerCase().replace(/[^a-z]+/g, '.').replace(/^\.|\.$/g, '')}@instituto.edu.co`,
  telefono: 'Contacto institucional',
  departamento: 'Modulo 4',
  oficina: 'Coordinacion academica',
  horarioAtencion: 'Consultar disponibilidad',
  foto: nombre.split(' ').map((part) => part[0]).join('').slice(0, 2),
  color: 'from-blue-500 to-indigo-600'
}));

const materiasImagen = [
  ['OBRAS CIVILES', 'MILLER ARZUZA'],
  ['REPARACION DE LOS SISTEMAS DE COMBUSTIBLES DIESEL I', 'HERNANDO LUIS GUZMAN ORTEGA'],
  ['METROLOGIA INDUSTRIAL', 'RICHARD WILCHES'],
  ['SISOISISO I', 'YESITH DANIEL CARVAJALINO'],
  ['PRIMEROS AUXILIOS', 'GLORIA AMADOR'],
  ['DOCUMENTACION', 'RAFAEL BAUTISTA'],
  ['PROCEDIMIENTOS OPERACIONALES DE MONTACARGA I', 'ELADIO BLANQUETT RAMIREZ'],
  ['PROCEDIMIENTOS OPERACIONALES DE RETROESCABADORA PAJARITA 2', 'ELADIO BLANQUETT RAMIREZ'],
  ['ANIMACION DE TELEVISION', 'ADOLFO ACUNA'],
  ['APRECIACION MUSICAL', 'JARO GOMEZ'],
  ['ARCHIVO Y CORRESPONDENCIA', 'BELTIS LORA'],
  ['GEOPROYECCION DE PROYECTOS', 'MERCEDES OSORIO'],
  ['PLANEACION Y POLITICA PUBLICA Y SOCIAL', 'MERCEDES OSORIO'],
  ['NIVEL 10', 'JOSE TARA']
].map(([nombre], index) => ({
  id: `img-mat-${index + 1}`,
  nombre,
  codigo: `MOD4-${String(index + 1).padStart(2, '0')}`,
  programa: 'Modulo 4',
  creditos: 0,
  departamento: 'Modulo 4',
  color: 'from-blue-500 to-indigo-500'
}));

const salonesImagen = ['405', 'MECANICA DIESEL', '6D', '702', '703', '501B', 'MAQUINARIA PESADA', '701B', '701A', '301A', '402A', '6E']
  .map((nombre, index) => ({ id: `img-salon-${index + 1}`, nombre, edificio: 'Sede principal', tipo: 'Aula' }));

const estudiantesImagen = [{ id: 'est-001', nombre: 'Estudiante demo', carrera: 'Todos los programas', semestre: 'Corte 4' }];

const filasImagen = [
  ['405', 'OBRAS CIVILES', '1 SEM', 1, 'MILLER ARZUZA'],
  ['405', 'OBRAS CIVILES', '2 SEM', 1, 'MILLER ARZUZA'],
  ['405', 'OBRAS CIVILES', '3 SEM', 1, 'MILLER ARZUZA'],
  ['405', 'OBRAS CIVILES', '4 SEM', 1, 'MILLER ARZUZA'],
  ['MECANICA DIESEL', 'REPARACION DE LOS SISTEMAS DE COMBUSTIBLES DIESEL I', '2 SEM', 2, 'HERNANDO LUIS GUZMAN ORTEGA'],
  ['MECANICA DIESEL', 'REPARACION DE LOS SISTEMAS DE COMBUSTIBLES DIESEL I', '3 SEM', 2, 'HERNANDO LUIS GUZMAN ORTEGA'],
  ['6D', 'METROLOGIA INDUSTRIAL', '2 SEM', 3, 'RICHARD WILCHES'],
  ['6D', 'METROLOGIA INDUSTRIAL', '3 SEM', 3, 'RICHARD WILCHES'],
  ['6D', 'METROLOGIA INDUSTRIAL', '4 SEM', 3, 'RICHARD WILCHES'],
  ['702', 'SISOISISO I', '1 SEM', 4, 'YESITH DANIEL CARVAJALINO'],
  ['703', 'PRIMEROS AUXILIOS', '3 SEM', 5, 'GLORIA AMADOR'],
  ['703', 'PRIMEROS AUXILIOS', '4 SEM', 5, 'GLORIA AMADOR'],
  ['501B', 'DOCUMENTACION', '2 SEM', 6, 'RAFAEL BAUTISTA'],
  ['501B', 'DOCUMENTACION', '3 SEM', 6, 'RAFAEL BAUTISTA'],
  ['MAQUINARIA PESADA', 'PROCEDIMIENTOS OPERACIONALES DE MONTACARGA I', '1 SEM', 7, 'ELADIO BLANQUETT RAMIREZ'],
  ['MAQUINARIA PESADA', 'PROCEDIMIENTOS OPERACIONALES DE RETROESCABADORA PAJARITA 2', '2 SEM', 8, 'ELADIO BLANQUETT RAMIREZ'],
  ['701B', 'ANIMACION DE TELEVISION', '1 SEM', 9, 'ADOLFO ACUNA'],
  ['701B', 'ANIMACION DE TELEVISION', '2 SEM', 9, 'ADOLFO ACUNA'],
  ['701B', 'ANIMACION DE TELEVISION', '3 SEM', 9, 'ADOLFO ACUNA'],
  ['701B', 'ANIMACION DE TELEVISION', '4 SEM', 9, 'ADOLFO ACUNA'],
  ['701A', 'APRECIACION MUSICAL', '1 SEM', 10, 'JARO GOMEZ'],
  ['701A', 'APRECIACION MUSICAL', '2 SEM', 10, 'JARO GOMEZ'],
  ['301A', 'ARCHIVO Y CORRESPONDENCIA', '1 SEM', 11, 'BELTIS LORA'],
  ['301A', 'ARCHIVO Y CORRESPONDENCIA', '2 SEM', 11, 'BELTIS LORA'],
  ['301A', 'ARCHIVO Y CORRESPONDENCIA', '3 SEM', 11, 'BELTIS LORA'],
  ['402A', 'GEOPROYECCION DE PROYECTOS', '1 SEM', 12, 'MERCEDES OSORIO'],
  ['402A', 'PLANEACION Y POLITICA PUBLICA Y SOCIAL', '2 SEM', 13, 'MERCEDES OSORIO'],
  ['6E', 'NIVEL 10', '2 SEM', 14, 'JOSE TARA']
];

const horariosImagen = filasImagen.map(([salon, materia, semestre, materiaNumero, profesor], index) => ({
  id: `img-hor-${index + 1}`,
  materiaId: `img-mat-${materiasImagen.findIndex((item) => item.nombre === materia) + 1}`,
  profesorId: `img-prof-${profesoresImagen.findIndex((item) => item.nombre === profesor) + 1}`,
  salonId: `img-salon-${salonesImagen.findIndex((item) => item.nombre === salon) + 1}`,
  dia: 'Corte 4',
  fecha: '05 al 19 de septiembre de 2026',
  horaInicio: '06:45',
  horaFin: '12:15',
  modalidad: 'Semipresencial',
  corte: 'MOD#4',
  carrera: salon === '405' ? 'Obras Civiles' : salon === 'MECANICA DIESEL' ? 'Mecanica Diesel' : salon === '6D' ? 'Mecanica Industrial' : salon === '702' || salon === '703' ? 'Seguridad Ocupacional' : salon === '501B' || salon === 'MAQUINARIA PESADA' ? 'Montacarga' : salon === '701B' ? 'Locucion Radio y TV' : salon === '701A' ? 'Audio Digital' : salon === '301A' ? 'Aux de Tribunales' : salon === '402A' ? 'Trabajo Social' : 'Lengua Inglesa',
  semestre,
  estudianteIds: ['est-001']
}));

const filasNuevas = [
  ['301A', 'Enfermeria', 'ATENCION INTEGRAL A LA FAMILIA Y SU CONTEXTO', '1 SEM', 'YURANNY ORTIZ'],
  ['4D', 'Enfermeria', 'EVALUACION DE LAS CONDICIONES FISICAS Y EMOCIONALES DE LAS PERSONAS II', '2 SEM', 'CAMILA MONTANO'],
  ['502B', 'Enfermeria', 'EDUCAR A LA PAREJA EN SALUD SEXUAL Y REPRODUCTIVA', '4 SEM', 'CARMEN LORA'],
  ['301B', 'Farmacia', 'BIOLOGIA I', '1 SEM', 'MARLENE MONTES CIFUENTES'],
  ['3B', 'Farmacia', 'GRUPOS TERAPEUTICOS III', '2 SEM', 'ALEJANDRO RODELO'],
  ['3A', 'Farmacia', 'DOSIS UNITARIAS', '3 SEM', 'MONICA RODRIGUEZ RODRIGUEZ'],
  ['302B', 'Farmacia', 'SISTEMA DE GESTION Y CALIDAD EN LAS FARMACIAS', '4 SEM', 'VERONICA DAZA'],
  ['1A', 'Salud Oral', 'ANATOMIA DENTAL I', '1 SEM', 'INDIRA ESPINOZA DUARTE'],
  ['1A', 'Mecanica Dental', 'ANATOMIA DENTAL I', '1 SEM', 'INDIRA ESPINOZA DUARTE'],
  ['COSMETOLOGIA', 'Cosmetologia', 'BIOSEGURIDAD', '1 SEM', 'LUZ ANYELI QUINTERO RODRIGUEZ'],
  ['4A', 'Cosmetologia', 'TECNICAS CORPORALES II', '2 SEM', 'KELLYS LAGARES'],
  ['4A', 'Cosmetologia', 'TECNICAS CORPORALES II', '4 SEM', 'KELLYS LAGARES'],
  ['401A', 'Clinica Veterinaria', 'ANATOMIA Y FISIOLOGIA ANIMAL', '1 SEM', 'JENNIFER DEL VALLE RANDIAL'],
  ['303', 'Admon de Empresas-RRHH-Salud', 'ADMINISTRACION GENERAL', '1 SEM', 'JEISON JIMENEZ'],
  ['502A', 'Admon de Empresas-RRHH-Salud', 'GESTION DEL TALENTO HUMANO II', '3 SEM', 'LIBIA COLMENARES QUINTANA'],
  ['401B', 'Admon de Empresas-RRHH-Salud', 'SOFTWARE ADMINISTRATIVO I', '4 SEM', 'PEDRO BALDOVINO MARTINEZ'],
  ['303', 'Admos Salud', 'ADMINISTRACION GENERAL', '1 SEM', 'JEISON JIMENEZ'],
  ['2E', 'Admos Salud', 'PRIMEROS AUXILIOS', '4 SEM', 'BELTIS LORA'],
  ['4E', 'Aux Contable', 'CONTABILIDAD DE ACTIVO', '1 SEM', 'CRISTIAN AROCA'],
  ['4E', 'Aux Contable', 'CONTABILIDAD DE ACTIVO', '3 SEM', 'CRISTIAN AROCA'],
  ['602', 'Naviera-Logistica-Comercio', 'INTRODUCCION Y ACUERDOS COMERCIALES', '1 SEM', 'CASTOR RAMIREZ'],
  ['501A', 'Mercadeo y Ventas', 'MERCHANDISING', '1 SEM', 'LAURA LINDO'],
  ['501A', 'Mercadeo y Ventas', 'MERCHANDISING', '2 SEM', 'LAURA LINDO'],
  ['106', 'Primera Infancia', 'FUNDAMENTOS DE LA EDUCACION', '1 SEM', 'OTILIA RIVAS VALDIES'],
  ['402B', 'Aux Vuelo', 'HIGIENE Y SEGURIDAD', '4 SEM', 'HORTENSIA HERRERA VILLA'],
  ['2D', 'Cocina Nac e Inter', 'HIGIENE Y SEGURIDAD', '1 SEM', 'HORTENSIA HERRERA VILLA'],
  ['2D', 'Cocina Nac e Inter', 'PROXIMO MODULO', '4 SEM', 'DOCENTE POR ASIGNAR'],
  ['302A', 'Diseño y Corte de Modas', 'ABRASCERIOS', '1 SEM', 'LAURA ARZUZA'],
  ['MODA', 'Diseño y Corte de Modas', 'CONFECCION I', '4 SEM', 'AZALEA ELJACH'],
  ['SISTEMAS 2', 'Sistemas-Software', 'INTRODUCCION A LOS COMPUTADORES', '1 SEM', 'JULIO MATURANA'],
  ['SISTEMAS 1', 'Sistemas-Software', 'BASE DE DATOS NOSQL', '3 SEM', 'RICHARD ARNEDO'],
  ['ELECTRONICA 1', 'Electronica', 'RESISTENCIAS Y CONDENSADORES', '1 SEM', 'XAVIER EGEA'],
  ['ELECTRONICA 1', 'Electronica', 'REDES HFC', '3 SEM', 'XAVIER EGEA'],
  ['ELECTRONICA 1', 'Electronica', 'REDES HFC', '4 SEM', 'XAVIER EGEA'],
  ['402A', 'Electricidad', 'MATERIALES Y HERRAMIENTAS ELECTRICAS', '1 SEM', 'MILLER ARZUZA'],
  ['402A', 'Electricidad', 'MATERIALES Y HERRAMIENTAS ELECTRICAS', '2 SEM', 'MILLER ARZUZA'],
  ['501B', 'Electricidad', 'APLICACION E INSTALACION DE ENERGIA SOLAR FOTOVOLTAICA', '1 SEM', 'CARLOS ALBERTO NIEVES'],
  ['REFRIGERACION', 'Refrigeracion', 'ELECTRICIDAD I', '1 SEM', 'IVAN SEVILLA MONTERROSA'],
  ['SOLDADURA', 'Soldadura', 'NORMATIVIDAD UTILIZADA PARA LA PROTECCION EN LOS PROCESOS DE SOLDADURA', '1 SEM', 'XIOMARA OSORIO ALTAMAR'],
  ['MECANICA DIESEL', 'Mecanica Diesel', 'REPARAR MOTORES DIESEL I', '1 SEM', 'HERNANDO LUIS GUZMAN ORTEGA'],
  ['103', 'Mecanica Diesel', 'DIAGNOSTICO DE MOTORES DIESEL VI', '4 SEM', 'JUAN CONDE'],
  ['6D', 'Mecanica Industrial', 'MANTENIMIENTO INDUSTRIAL Y SUS TIPOS', '1 SEM', 'RICHARD WILCHES'],
  ['702', 'Seguridad Ocupacional', 'SISOISISO I', '1 SEM', 'YESITH DANIEL CARVAJALINO'],
  ['703', 'Seguridad Ocupacional', 'PRIMEROS AUXILIOS', '2 SEM', 'GLORIA AMADOR'],
  ['703', 'Seguridad Ocupacional', 'PRIMEROS AUXILIOS', '4 SEM', 'GLORIA AMADOR'],
  ['6A', 'Montacarga', 'MANIPULACION MANUAL DE CARGA', '1 SEM', 'RAFAEL BAUTISTA'],
  ['MAQUINARIA PESADA', 'Maquinaria Pesada', 'PROCEDIMIENTOS OPERACIONALES DE MONTACARGA I', '1 SEM', 'ELADIO BLANQUETT RAMIREZ'],
  ['MAQUINARIA PESADA', 'Maquinaria Pesada', 'PROCEDIMIENTOS OPERACIONALES DE RETROESCABADORA PAJARITA 2', '2 SEM', 'ELADIO BLANQUETT RAMIREZ'],
  ['6B', 'Lengua Inglesa', 'NIVEL 2', '1 SEM', 'JOSE TARA'],
  ['6C', 'Ingles Tecnico Niveles', 'NIVEL 4', 'COMBI SEM', 'DANA VANESSA ARENAS YI'],
  ['104', 'Ingles Tecnico Niveles', 'NIVEL 1', 'COMBI SEM', 'JEISON YEPES']
];

const filasCorte5 = [
  ['604', 'CLINICA VETERINARIA', 'E-AFANPRIMEROS AUXILIOS VETERINARIOS', '1 SEM', 'JENNIFER DEL VALLE RANDIAL', '1:45 PM', '4:00 PM'],
  ['604', 'CLINICA VETERINARIA', 'E-PARACIPARACITOLOGIA', '2 SEM', 'JENNIFER DEL VALLE RANDIAL', '11:30 AM', '1:30 PM'],
  ['3A', 'ENFERMERIA', 'E-OUNOSORIENTAR AL USUARIO EN LAS NORMAS DE SALUD', '1 SEM', '', '9:00 AM', '11:15 AM'],
  ['104', 'ENFERMERIA', 'E-CONIUECONTROLAR LAS INFECCIONES EN LOS USUARIOS Y SU ENTORNO', '2 SEM', 'MARLLY LOPEZ', '9:00 AM', '11:15 AM'],
  ['601A', 'ENFERMERIA', 'CUIDAR INTEGRALMENTE A LA PAREJA EN EL EMBARAZO Y EL PARTO', '4 SEM', 'ARIEL PUELLO', '9:00 AM', '11:15 AM'],
  ['502A', 'SALUD ORAL', 'PASA A LOS SABADOS AM', '3 SEM', '', '9:00 AM', '11:15 AM'],
  ['502A', 'CLINICA VETERINARIA', 'E-SERVCLIESERVICIO AL CLIENTE', '3 SEM', 'CRISTIAN AROCA', '9:00 AM', '11:15 AM'],
  ['602', 'NAVIERA-LOGISTICA-COMERCIO', 'PASA PARA LAS 6:30 AM', '1 SEM', '', '9:00 AM', '11:15 AM'],
  ['702', 'NAVIERA-LOGISTICA-COMERCIO', 'E-RECDEMERECEPCIÓN Y DESPACHO DE LAS MERCANCÍAS', '2 SEM', 'LUCIA TERESA ELJACH MOSQUERA', '9:00 AM', '11:15 AM'],
  ['501B', 'NAVIERA-LOGISTICA-COMERCIO', 'E-ZONFRAZONA FRANCA', '3 SEM', 'CASTOR RAMIREZ', '9:00 AM', '11:15 AM'],
  ['2D', 'AUX VUELO', 'E-AGEVIAAGENCIA DE VIAJES I', '1 SEM', 'JEISON YEPES', '9:00 AM', '11:15 AM'],
  ['2E', 'COCINA NAC E INTER', 'E-COCFRIACOCINA FRÍA I', '1 SEM', 'HORTENSIA HERRERA', '9:00 AM', '11:15 AM'],
  ['501B', 'ENFERMERIA', 'E-CONIUECONTROLAR LAS INFECCIONES EN LOS USUARIOS Y SU ENTORNO', '2 SEM', 'KATIA VALENCIA', '6:30 AM', '8:45 AM'],
  ['604', 'ENFERMERIA', 'CUIDAR INTEGRALMENTE A LA PAREJA EN EL EMBARAZO Y EL PARTO', '4 SEM', 'ARIEL PUELLO', '6:30 AM', '8:45 AM'],
  ['3B', 'FARMACIA', 'E-BIOSEGBIOSEGURIDAD', '2 SEM', 'MONICA RODRIGUEZ RODRIGUEZ', '6:30 AM', '8:45 AM'],
  ['3A', 'FARMACIA', 'E-PRIAUXPRIMEROS AUXILIOS', '3 SEM', 'LILIANA MANRIQUE', '6:30 AM', '8:45 AM'],
  ['4A', 'COSMETOLOGIA', 'E-DEPIDEPILACIÓN I', '2 SEM', 'KETTY CAMPOS', '6:30 AM', '8:45 AM'],
  ['601A', 'CLINICA VETERINARIA', 'PASA A SABADO PM', '3 SEM', '', '6:30 AM', '8:45 AM'],
  ['602', 'NAVIERA-LOGISTICA-COMERCIO', 'E-RECDEMERECEPCIÓN Y DESPACHO DE LAS MERCANCÍAS', '2 SEM', 'CASTOR RAMIREZ', '6:30 AM', '8:45 AM'],
  ['106', 'PRIMERA INFANCIA', 'E-LEGADULEGISLACIÓN ADUANERA', '2 SEM', 'LUCIA ELJACH', '6:30 AM', '8:45 AM'],
  ['601B', 'AUX VUELO', 'E-PSIEVOPSICOLOGÍA EVOLUTIVA', '2 SEM', 'MARIA TERESA VARGAS', '6:30 AM', '8:45 AM'],
  ['2E', 'COCINA NAC E INTER', 'T-MALMANIPULACIÓN DE ALIMENTOS', '2 SEM', 'JEISON YEPES', '6:30 AM', '8:45 AM'],
  ['2D', 'COCINA NAC E INTER', 'E-COCCAICOCINA CALIENTE III', '3 SEM', 'NICOLAZA MEDINA', '6:30 AM', '8:45 AM'],
  ['2D', 'COCINA NAC E INTER', 'E-COCINTICOCINA INTERNACIONAL II', '3 SEM', 'VICTOR ALCAZAR', '6:30 AM', '8:45 AM'],
  ['SISTEMAS 1', 'DISEÑO GRAFICO', 'E-COMGRACOMPOSICIÓN GRÁFICA', '2 SEM', 'ADRIANA GAVIRIA', '6:30 AM', '8:45 AM'],
  ['SISTEMAS 1', 'SISTEMAS-SOFTWARE', 'E-CPWCONSTRUCCIÓN Y MANTENIMIENTO DE PÁGINAS WEB', '2 SEM', 'JULIO MATURANA', '6:30 AM', '8:45 AM'],
  ['MECANICA DIESEL', 'MECANICA DIESEL', 'E-RSIREPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL II', '2 SEM', 'HERNANDO LUIS GUZMAN ORTEGA', '6:30 AM', '8:45 AM'],
  ['MECANICA DIESEL', 'MECANICA DIESEL', 'E-RSIREPARACIÓN DE LOS SISTEMAS DE COMBUSTIBLES DIÉSEL II', '3 SEM', 'HERNANDO LUIS GUZMAN ORTEGA', '6:30 AM', '8:45 AM'],
  ['MONTACARGA', 'MONTACARGA', 'E-PROCOM3PROCEDIMIENTOS OPERACIONALES DE MONTACARGA 3', '2 SEM', 'ELADIO BLANQUICETT RAMIREZ', '6:30 AM', '8:45 AM'],
  ['6B', 'LENGUA INGLESA', 'NIVEL 11', '2 SEM', 'JOSE TARA', '6:30 AM', '8:45 AM']
];

function findOrAdd(items, name, createItem) {
  const found = items.find((item) => item.nombre === name);
  if (found) return found;
  const item = createItem(items.length + 1);
  items.push(item);
  return item;
}

filasNuevas.forEach(([salon, carrera, materia, semestre, profesor], index) => {
  const teacher = findOrAdd(profesoresImagen, profesor, (id) => ({
    id: `img-prof-${id}`,
    nombre: profesor,
    email: 'Contacto institucional',
    telefono: 'Contacto institucional',
    departamento: carrera,
    oficina: 'Coordinacion academica',
    horarioAtencion: 'Consultar disponibilidad',
    foto: profesor.split(' ').map((part) => part[0]).join('').slice(0, 2),
    color: 'from-blue-500 to-indigo-600'
  }));
  const subject = findOrAdd(materiasImagen, materia, (id) => ({
    id: `img-mat-${id}`,
    nombre: materia,
    codigo: `MOD4-${String(id).padStart(2, '0')}`,
    programa: carrera,
    creditos: 0,
    departamento: carrera,
    color: 'from-blue-500 to-indigo-500'
  }));
  const room = findOrAdd(salonesImagen, salon, (id) => ({ id: `img-salon-${id}`, nombre: salon, edificio: 'Sede principal', tipo: 'Aula' }));

  horariosImagen.push({
    id: `img-extra-hor-${index + 1}`,
    materiaId: subject.id,
    profesorId: teacher.id,
    salonId: room.id,
    dia: 'Corte 4',
    fecha: '05 al 19 de septiembre de 2026',
    horaInicio: '12:45',
    horaFin: '18:15',
    modalidad: 'Semipresencial',
    corte: 'MOD#4',
    carrera,
    semestre,
    estudianteIds: ['est-001']
  });
});

filasCorte5.forEach(([salon, carrera, materia, semestre, profesor, horaInicio, horaFin], index) => {
  const teacher = profesor ? findOrAdd(profesoresImagen, profesor, (id) => ({
    id: `img-prof-${id}`,
    nombre: profesor,
    email: 'Contacto institucional',
    telefono: 'Contacto institucional',
    departamento: carrera,
    oficina: 'Coordinacion academica',
    horarioAtencion: 'Consultar disponibilidad',
    foto: profesor.split(' ').map((part) => part[0]).join('').slice(0, 2),
    color: 'from-blue-500 to-indigo-600'
  })) : null;
  const subject = findOrAdd(materiasImagen, materia, (id) => ({
    id: `img-mat-${id}`,
    nombre: materia,
    codigo: `MOD5-${String(id).padStart(2, '0')}`,
    programa: carrera,
    creditos: 0,
    departamento: carrera,
    color: 'from-blue-500 to-indigo-500'
  }));
  const room = findOrAdd(salonesImagen, salon, (id) => ({ id: `img-salon-${id}`, nombre: salon, edificio: 'Sede principal', tipo: 'Aula' }));

  horariosImagen.push({
    id: `img-corte5-hor-${index + 1}`,
    materiaId: subject.id,
    profesorId: teacher?.id || null,
    salonId: room.id,
    dia: 'Corte 5',
    fecha: '07 de septiembre de 2026B',
    horaInicio,
    horaFin,
    modalidad: 'Presencial',
    corte: 'MOD#5',
    carrera,
    semestre,
    estudianteIds: ['est-001']
  });
});

module.exports = {
  profesores: profesoresImagen,
  materias: materiasImagen,
  salones: salonesImagen,
  estudiantes: estudiantesImagen,
  horarios: horariosImagen
};
