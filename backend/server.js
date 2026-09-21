require('dotenv').config();

const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { profesores, materias, salones, estudiantes, horarios } = require('./data');
const { loadState, saveState, trackAnalytics, getTopAnalytics, getTotalAnalyticsToday, getAcademicState } = require('./persistence');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026';
const JWT_SECRET = process.env.JWT_SECRET || 'development-only-change-me';
const configuredOrigins = process.env.CLIENT_ORIGIN || [
  'http://localhost:5500',
  'https://elyon-yireh-app.vercel.app',
  'https://elyon-yireh-dczd449bo-diego-ortega1.vercel.app',
  'https://elyon-yireh-o4mdbt4on-diego-ortega1.vercel.app'
].join(',');
const allowedOrigins = new Set(configuredOrigins.split(',').map((origin) => origin.trim()).filter(Boolean));
const SCHEDULE_CACHE_TTL = 5 * 60 * 1000;
const scheduleCache = new Map();
let lastScheduleUpdate = new Date().toISOString();

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false }));
const loginRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, message: { success: false, message: 'Demasiados intentos de inicio de sesión' } });

function normalizeText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getMateriaById(id) {
  return materias.find((materia) => materia.id === id) || null;
}

function getProfesorById(id) {
  return profesores.find((profesor) => profesor.id === id) || null;
}

function getSalonById(id) {
  return salones.find((salon) => salon.id === id) || null;
}

function getUniquePrograms() {
  const programs = new Map();
  [...materias.map((materia) => materia.programa), ...horarios.map((horario) => horario.carrera)]
    .filter(Boolean)
    .forEach((program) => {
      const key = normalizeText(program);
      if (!programs.has(key)) programs.set(key, program);
    });
  return [...programs.values()].sort((first, second) => first.localeCompare(second, 'es'));
}

function clearScheduleCache() {
  scheduleCache.clear();
}

function touchScheduleUpdate() {
  lastScheduleUpdate = new Date().toISOString();
  clearScheduleCache();
}

function scheduleMatchesQuestion(item, question) {
  const haystack = normalizeText([
    item.carrera,
    item.materia?.nombre,
    item.materia?.programa,
    item.profesor?.nombre,
    item.salon?.nombre,
    item.dia,
    item.fecha,
    item.horaInicio,
    item.horaFin
  ].join(' '));
  return normalizeText(question).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean).some((term) => term.length > 2 && haystack.includes(term));
}

function formatChatSchedule(item) {
  return `${item.materia?.nombre || 'Materia'}: ${item.horaInicio} - ${item.horaFin}, ${item.salon?.nombre || 'aula por asignar'} (${item.carrera || item.materia?.programa || 'programa'})`;
}

function parseTimeToMinutes(value) {
  const match = String(value || '').trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === 'PM' && hour < 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function getGraphStatistics() {
  const professorPrograms = new Map();
  const dayDistribution = new Map();
  const teacherLoad = new Map();

  horarios.forEach((item) => {
    const professor = getProfesorById(item.profesorId);
    const subject = getMateriaById(item.materiaId);
    const program = item.carrera || subject?.programa || 'Sin programa';
    const day = item.dia || 'Sin día';
    professorPrograms.set(program, (professorPrograms.get(program) || new Set()));
    professorPrograms.get(program).add(professor?.id || item.profesorId || 'sin-docente');
    dayDistribution.set(day, (dayDistribution.get(day) || 0) + 1);
    const start = parseTimeToMinutes(item.horaInicio);
    const end = parseTimeToMinutes(item.horaFin);
    const duration = start !== null && end !== null && end >= start ? end - start : 0;
    const teacherName = professor?.nombre || 'Docente por asignar';
    teacherLoad.set(teacherName, (teacherLoad.get(teacherName) || 0) + duration / 60);
  });

  return {
    profesoresPorPrograma: [...professorPrograms.entries()]
      .map(([programa, ids]) => ({ programa, cantidad: ids.size }))
      .sort((a, b) => b.cantidad - a.cantidad),
    horariosPorDia: [...dayDistribution.entries()].map(([dia, cantidad]) => ({ dia, cantidad })),
    cargaPorDocente: [...teacherLoad.entries()]
      .map(([docente, horas]) => ({ docente, horas: Number(horas.toFixed(2)) }))
      .sort((a, b) => b.horas - a.horas)
      .slice(0, 10)
  };
}

function scheduleCacheMiddleware(req, res, next) {
  if (req.method !== 'GET') return next();

  const cached = scheduleCache.get(req.originalUrl);
  if (cached && cached.expiresAt > Date.now()) return res.json(cached.payload);
  if (cached) scheduleCache.delete(req.originalUrl);

  const originalJson = res.json.bind(res);
  res.json = (payload) => {
    scheduleCache.set(req.originalUrl, { payload, expiresAt: Date.now() + SCHEDULE_CACHE_TTL });
    return originalJson(payload);
  };
  return next();
}

function requireAdmin(req, res, next) {
  const authorization = String(req.headers.authorization || '');
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

  try {
    req.admin = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: 'Token de administrador inválido o expirado' });
  }

  return next();
}

function hydrateSchedule(item) {
  return {
    ...item,
    materia: getMateriaById(item.materiaId),
    profesor: getProfesorById(item.profesorId),
    salon: getSalonById(item.salonId)
  };
}

async function safeSaveState(state) {
  try {
    await saveState(state);
  } catch (error) {
    console.warn('No se pudo guardar en PostgreSQL; se mantienen los datos en memoria:', error.message);
  }
}

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'academic-schedule-api' });
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'academic-schedule-api',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/v1/estadisticas', (req, res) => {
  return res.json({
    profesores: profesores.length,
    horarios: horarios.length,
    programas: getUniquePrograms().length,
    materias: materias.length
  });
});

app.post('/api/v1/analytics/track', async (req, res) => {
  const tipo = String(req.body?.tipo || '').trim().slice(0, 40);
  const valor = String(req.body?.valor || '').trim().slice(0, 160);
  if (!tipo) return res.status(400).json({ success: false, message: 'El tipo de analytics es obligatorio' });

  try {
    await trackAnalytics(tipo, valor, req.ip);
  } catch (error) {
    console.warn('No se pudo guardar analytics:', error.message);
  }
  return res.json({ success: true });
});

app.get('/api/v1/analytics/top-10', async (req, res) => {
  try {
    return res.json({ success: true, data: await getTopAnalytics(10) });
  } catch (error) {
    console.warn('No se pudo consultar top analytics:', error.message);
    return res.json({ success: true, data: [] });
  }
});

app.get('/api/v1/analytics/total-hoy', async (req, res) => {
  try {
    return res.json({ success: true, total: await getTotalAnalyticsToday() });
  } catch (error) {
    console.warn('No se pudo consultar total analytics:', error.message);
    return res.json({ success: true, total: 0 });
  }
});

app.get('/api/v1/programas', (req, res) => {
  return res.json(getUniquePrograms());
});

app.get('/api/v1/ultima-actualizacion', (req, res) => {
  return res.json({ timestamp: lastScheduleUpdate });
});

app.get('/api/v1/estadisticas-graficos', (req, res) => {
  return res.json(getGraphStatistics());
});

app.post('/api/v1/chat', (req, res) => {
  const pregunta = String(req.body?.pregunta || '').trim();
  if (!pregunta || pregunta.length > 160) {
    return res.status(400).json({ success: false, message: 'Escribe una pregunta breve para continuar.' });
  }

  const normalizedQuestion = normalizeText(pregunta);
  const isScheduleQuestion = /(hora|horario|clase|clases|ense|programa|aula|salon|dia|sabado|lunes|martes|miercoles|jueves|viernes|corte)/.test(normalizedQuestion);
  if (!isScheduleQuestion) {
    return res.json({ success: true, respuesta: "Lo siento, no entiendo la pregunta. Intenta con: '¿A qué hora enseña X?' o '¿Qué clases hay el sábado?'" });
  }

  const matches = horarios.map(hydrateSchedule).filter((item) => scheduleMatchesQuestion(item, pregunta));
  if (!matches.length) {
    return res.json({ success: true, respuesta: 'No encontré horarios relacionados con esa pregunta. Prueba con el nombre de un profesor, programa, aula o día.' });
  }

  const limitedMatches = matches.slice(0, 8);
  return res.json({
    success: true,
    respuesta: `Encontré ${matches.length} horario${matches.length === 1 ? '' : 's'} relacionado${matches.length === 1 ? '' : 's'}:`,
    horarios: limitedMatches.map(formatChatSchedule)
  });
});

app.post('/api/v1/admin/login', loginRateLimit, (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
  }

  const token = jwt.sign({ username: ADMIN_USER, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ success: true, token, user: { username: ADMIN_USER, role: 'admin' } });
});

app.get('/api/v1/admin/horarios', requireAdmin, (req, res) => {
  return res.json({ success: true, data: horarios.map(hydrateSchedule) });
});

app.post('/api/v1/admin/horarios', requireAdmin, async (req, res, next) => {
  const { carrera, semestre, salonId, profesorId, materiaId, fecha, horaInicio, horaFin, modalidad } = req.body || {};

  if (!carrera || !semestre || !salonId || !profesorId || !materiaId || !fecha || !horaInicio || !horaFin || !modalidad) {
    return res.status(400).json({ success: false, message: 'Completa todos los datos del nuevo horario' });
  }

  if (!getSalonById(salonId) || !getProfesorById(profesorId) || !getMateriaById(materiaId)) {
    return res.status(400).json({ success: false, message: 'Salón, docente o materia no válidos' });
  }

  const schedule = {
    id: `admin-schedule-${Date.now()}`,
    materiaId,
    profesorId,
    salonId,
    dia: 'Corte 5',
    fecha,
    horaInicio,
    horaFin,
    modalidad,
    corte: 'MOD#5',
    carrera,
    semestre,
    estudianteIds: ['real-student']
  };

  horarios.push(schedule);
  touchScheduleUpdate();
  await safeSaveState({ profesores, materias, salones, estudiantes, horarios });
  return res.status(201).json({ success: true, data: hydrateSchedule(schedule) });
});

app.patch('/api/v1/admin/horarios/:id', requireAdmin, async (req, res, next) => {
  const schedule = horarios.find((item) => item.id === req.params.id);

  if (!schedule) {
    return res.status(404).json({ success: false, message: 'Horario no encontrado' });
  }

  const allowedFields = ['horaInicio', 'horaFin', 'fecha', 'modalidad', 'semestre', 'carrera', 'materiaId', 'profesorId', 'salonId'];
  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) schedule[field] = req.body[field];
  });

  touchScheduleUpdate();
  await safeSaveState({ profesores, materias, salones, estudiantes, horarios });
  return res.json({ success: true, data: hydrateSchedule(schedule) });
});

app.delete('/api/v1/admin/horarios/:id', requireAdmin, async (req, res, next) => {
  const scheduleIndex = horarios.findIndex((item) => item.id === req.params.id);

  if (scheduleIndex === -1) return res.status(404).json({ success: false, message: 'Horario no encontrado' });

  horarios.splice(scheduleIndex, 1);
  touchScheduleUpdate();
  await safeSaveState({ profesores, materias, salones, estudiantes, horarios });
  return res.json({ success: true, message: 'Horario eliminado' });
});

app.patch('/api/v1/admin/profesores/:id', requireAdmin, async (req, res, next) => {
  const professor = getProfesorById(req.params.id);

  if (!professor) return res.status(404).json({ success: false, message: 'Profesor no encontrado' });

  ['nombre', 'email', 'telefono', 'departamento', 'oficina', 'horarioAtencion'].forEach((field) => {
    if (typeof req.body[field] === 'string') professor[field] = req.body[field].trim();
  });

  await safeSaveState({ profesores, materias, salones, estudiantes, horarios });
  return res.json({ success: true, data: professor });
});

app.patch('/api/v1/admin/materias/:id', requireAdmin, async (req, res, next) => {
  const subject = getMateriaById(req.params.id);
  if (!subject) return res.status(404).json({ success: false, message: 'Materia no encontrada' });

  ['nombre', 'codigo', 'programa', 'departamento'].forEach((field) => {
    if (typeof req.body[field] === 'string') subject[field] = req.body[field].trim();
  });

  await safeSaveState({ profesores, materias, salones, estudiantes, horarios });
  return res.json({ success: true, data: subject });
});

app.get('/api/v1/profesores', (req, res) => {
  res.json({ success: true, data: profesores });
});

app.get('/api/v1/profesores/:id', (req, res) => {
  const profesor = getProfesorById(req.params.id);

  if (!profesor) {
    return res.status(404).json({ success: false, message: 'Profesor no encontrado' });
  }

  return res.json({ success: true, data: profesor });
});

app.get('/api/v1/materias', (req, res) => {
  res.json({ success: true, data: materias });
});

app.get('/api/v1/salones', (req, res) => {
  res.json({ success: true, data: salones });
});

app.get('/api/v1/materias/:id', (req, res) => {
  const materia = getMateriaById(req.params.id);

  if (!materia) {
    return res.status(404).json({ success: false, message: 'Materia no encontrada' });
  }

  return res.json({ success: true, data: materia });
});

app.get('/api/v1/horarios', scheduleCacheMiddleware, (req, res) => {
  const { dia, salon, profesor, materia } = req.query;
  let filtered = [...horarios];

  if (dia) {
    filtered = filtered.filter((item) => normalizeText(item.dia) === normalizeText(dia));
  }

  if (salon) {
    filtered = filtered.filter((item) => normalizeText(getSalonById(item.salonId)?.nombre || '') === normalizeText(salon));
  }

  if (profesor) {
    filtered = filtered.filter((item) => normalizeText(getProfesorById(item.profesorId)?.nombre || '') === normalizeText(profesor));
  }

  if (materia) {
    filtered = filtered.filter((item) => normalizeText(getMateriaById(item.materiaId)?.nombre || '') === normalizeText(materia));
  }

  const response = filtered.map((item) => {
    const materiaInfo = getMateriaById(item.materiaId);
    const profesorInfo = getProfesorById(item.profesorId);
    const salonInfo = getSalonById(item.salonId);

    return {
      ...item,
      materia: materiaInfo,
      profesor: profesorInfo,
      salon: salonInfo
    };
  });

  return res.json({ success: true, data: response });
});

app.get('/api/v1/buscar', (req, res) => {
  const rawQuery = String(req.query.q || '').trim();
  if (rawQuery.length > 80 || !/^[\p{L}\p{N}\s._-]*$/u.test(rawQuery)) {
    return res.status(400).json({ success: false, message: 'La búsqueda contiene caracteres no permitidos' });
  }
  const q = normalizeText(rawQuery);

  if (!q) {
    return res.json({ success: true, data: [] });
  }

  const results = horarios
    .map((item) => {
      const materiaInfo = getMateriaById(item.materiaId);
      const profesorInfo = getProfesorById(item.profesorId);
      const salonInfo = getSalonById(item.salonId);

      const hayCoincidencia =
        normalizeText(materiaInfo?.nombre).includes(q) ||
        normalizeText(materiaInfo?.programa).includes(q) ||
        normalizeText(profesorInfo?.nombre).includes(q) ||
        normalizeText(salonInfo?.nombre).includes(q) ||
        normalizeText(item.carrera).includes(q) ||
        normalizeText(item.semestre).includes(q) ||
        normalizeText(item.modalidad).includes(q) ||
        normalizeText(item.fecha).includes(q) ||
        normalizeText(item.dia).includes(q) ||
        normalizeText(item.horaInicio).includes(q) ||
        normalizeText(item.horaFin).includes(q);

      if (!hayCoincidencia) return null;

      return {
        ...item,
        materia: materiaInfo,
        profesor: profesorInfo,
        salon: salonInfo
      };
    })
    .filter(Boolean);

  return res.json({ success: true, data: results });
});

app.get('/api/v1/estudiante/:id/horario', (req, res) => {
  const estudiante = estudiantes.find((item) => item.id === req.params.id);

  if (!estudiante) {
    return res.status(404).json({ success: false, message: 'Estudiante no encontrado' });
  }

  const horarioPersonal = horarios
    .filter((item) => item.estudianteIds.includes(estudiante.id))
    .map((item) => {
      const materiaInfo = getMateriaById(item.materiaId);
      const profesorInfo = getProfesorById(item.profesorId);
      const salonInfo = getSalonById(item.salonId);

      return {
        ...item,
        estudiante,
        materia: materiaInfo,
        profesor: profesorInfo,
        salon: salonInfo
      };
    });

  return res.json({ success: true, data: { estudiante, horario: horarioPersonal } });
});

async function start() {
  try {
    await loadState({ profesores, materias, salones, estudiantes, horarios });
  } catch (error) {
    console.warn('No se pudo cargar PostgreSQL; se usarán los datos en memoria:', error.message);
  }
  app.listen(PORT, () => console.log(`API académica ejecutándose en http://localhost:${PORT}`));
  setInterval(() => runBackup().catch((error) => console.warn('Backup automático fallido:', error.message)), 24 * 60 * 60 * 1000);
  setTimeout(() => runBackup().catch((error) => console.warn('Backup inicial fallido:', error.message)), 60 * 1000);
}

async function runBackup() {
  try {
    const state = await getAcademicState();
    if (!state) return null;
    const backupsDirectory = path.join(__dirname, 'backups');
    await fs.mkdir(backupsDirectory, { recursive: true });
    const now = new Date();
    const stamp = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}-${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}`;
    const filePath = path.join(backupsDirectory, `backup-${stamp}.json`);
    await fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf8');
    return filePath;
  } catch (error) {
    console.warn('No se pudo crear el backup; PostgreSQL no está disponible:', error.message);
    return null;
  }
}

if (require.main === module) {
  start().catch((error) => {
    console.error('No se pudo iniciar la API:', error);
    process.exit(1);
  });
}

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error(error);
  return res.status(error.status || 500).json({ success: false, message: 'Error interno del servidor' });
});

module.exports = { app, runBackup };
