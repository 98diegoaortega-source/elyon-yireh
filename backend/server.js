require('dotenv').config();

const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { profesores, materias, salones, estudiantes, horarios, horariosCorte6 } = require('./data');
const { loadState, saveState, trackAnalytics, getTopAnalytics, getTotalAnalyticsToday, getAcademicState } = require('./persistence');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_USER = process.env.ADMIN_USER || process.env['USUARIO ADMINISTRADOR'] || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env['CONTRASEÑA_DE_ADMINISTRADOR'] || 'admin2026';
// Evita iniciar en producción con las credenciales predeterminadas o marcadores de ejemplo.
if (process.env.NODE_ENV === 'production') {
  const unsafeAdminValues = new Set(['admin', 'CAMBIAR_EN_PRODUCCION']);
  if (unsafeAdminValues.has(ADMIN_USER) || unsafeAdminValues.has(ADMIN_PASSWORD)) {
    throw new Error('Configura ADMIN_USER y ADMIN_PASSWORD con valores seguros antes de iniciar en producción.');
  }
  // Advierte sobre la contraseña débil sin impedir el arranque solicitado.
  if (ADMIN_PASSWORD === 'admin2026') {
    console.warn('ADVERTENCIA: contraseña admin débil detectada. Considera cambiarla.');
  }
}
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

function normalizeTime(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/a\s*\.\s*m\.?/g, 'am')
    .replace(/p\s*\.\s*m\.?/g, 'pm')
    .replace(/(\d{1,2})\.(\d{2})/g, '$1:$2')
    .replace(/\s*:\s*/g, ':')
    .replace(/\b(\d):(?=\d{2})/g, '0$1:')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesTimeQuery(query, schedule) {
  const normalizedQuery = normalizeTime(query).replace(/\s*(am|pm)\b/g, '');
  const normalizedSchedule = normalizeTime(schedule).replace(/\s*(am|pm)\b/g, '');
  const queryMatch = normalizedQuery.match(/^(\d{1,2})(?::(\d{2}))?$/);

  if (!queryMatch) return false;

  const hour = String(Number(queryMatch[1])).padStart(2, '0');
  if (!queryMatch[2]) return new RegExp(`(?:^|[^\\d])${hour}:\\d{2}(?:$|[^\\d])`).test(normalizedSchedule);

  return normalizedSchedule.includes(`${hour}:${queryMatch[2]}`);
}

function isTimeQuery(value) {
  return /^\d{1,2}(?::\d{2})?(?:\s*(?:am|pm))?$/i.test(normalizeTime(value).replace(/\s*(am|pm)\b/g, ''));
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
  const estudianteIds = [...new Set(Array.isArray(item.estudianteIds) ? item.estudianteIds : [])]
    .filter((id) => estudiantes.some((student) => student.id === id));
  return {
    ...item,
    estudianteIds,
    estudiantes: estudianteIds.length,
    materia: getMateriaById(item.materiaId),
    profesor: getProfesorById(item.profesorId),
    salon: getSalonById(item.salonId)
  };
}

async function safeSaveState(state) {
  try {
    await saveState(state);
  } catch (error) {
    console.error('No se pudo guardar en PostgreSQL:', error.code || 'SIN_CODIGO', error.message);
    throw error;
  }
}

// Restaura el estado en memoria y responde sin filtrar detalles de PostgreSQL.
async function persistAdminChange(res, state, rollback) {
  try {
    await safeSaveState(state);
    return null;
  } catch {
    rollback();
    return res.status(500).json({ success: false, message: 'No se pudo guardar el cambio. Intenta de nuevo.' });
  }
}

function nextAdminEntityId(prefix, collection) {
  const highest = collection.reduce((current, item) => {
    const match = String(item.id || '').match(new RegExp(`^${prefix}-(\\d+)$`));
    return Math.max(current, Number(match?.[1] || 0));
  }, 0);
  return `${prefix}-${String(highest + 1).padStart(3, '0')}`;
}

function normalizeAdminEntity(body, fields) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const result = {};
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(body, field)) continue;
    const value = body[field];
    if (field === 'capacidad') {
      result[field] = value === '' || value == null ? null : Number(value);
    } else if (typeof value === 'string') {
      result[field] = value.trim();
    } else {
      return null;
    }
  }
  return result;
}

function registerAdminEntityRoutes(config) {
  const route = `/api/v1/admin/${config.path}`;
  const state = { profesores, materias, salones, estudiantes, horarios };
  const hasField = (object, field) => Object.prototype.hasOwnProperty.call(object, field);
  const serialize = (entity) => {
    const result = { ...entity };
    for (const [field, storageField] of Object.entries(config.aliases || {})) {
      result[field] = entity[field] ?? entity[storageField] ?? '';
    }
    return result;
  };
  const syncAliases = (entity, updates) => {
    for (const [field, storageField] of Object.entries(config.aliases || {})) {
      if (hasField(updates, field)) entity[storageField] = entity[field];
    }
  };
  const validate = (entity, updates, creating = false) => {
    for (const field of config.requiredFields) {
      if ((creating || hasField(updates, field)) && !entity[field]) {
        return `${config.label}: ${field} es obligatorio.`;
      }
    }
    if (entity.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entity.email)) {
      return 'El correo electrónico no es válido.';
    }
    if (entity.capacidad != null && (!Number.isInteger(entity.capacidad) || entity.capacidad < 1)) {
      return 'La capacidad debe ser un número entero mayor que cero.';
    }
    return null;
  };

  app.get(route, requireAdmin, (req, res) => {
    return res.json({ success: true, data: config.collection.map(serialize) });
  });

  app.post(route, requireAdmin, async (req, res) => {
    const updates = normalizeAdminEntity(req.body, config.fields);
    if (!updates) return res.status(400).json({ success: false, message: 'Envía datos válidos para el registro.' });
    const entity = { ...updates, id: nextAdminEntityId(config.prefix, config.collection) };
    const validationError = validate(entity, updates, true);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    syncAliases(entity, updates);
    config.collection.push(entity);
    const saveFailure = await persistAdminChange(res, state, () => {
      config.collection.splice(config.collection.indexOf(entity), 1);
    });
    if (saveFailure) return saveFailure;
    return res.status(201).json({ success: true, data: serialize(entity) });
  });

  app.patch(`${route}/:id`, requireAdmin, async (req, res) => {
    const entity = config.collection.find((item) => item.id === req.params.id);
    if (!entity) return res.status(404).json({ success: false, message: `${config.label} no encontrado.` });
    const updates = normalizeAdminEntity(req.body, config.fields);
    if (!updates || !Object.keys(updates).length) {
      return res.status(400).json({ success: false, message: 'Envía al menos un campo válido para actualizar.' });
    }
    const validationError = validate({ ...entity, ...updates }, updates);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    const previous = { ...entity };
    Object.assign(entity, updates);
    syncAliases(entity, updates);
    const saveFailure = await persistAdminChange(res, state, () => Object.assign(entity, previous));
    if (saveFailure) return saveFailure;
    return res.json({ success: true, data: serialize(entity) });
  });

  app.delete(`${route}/:id`, requireAdmin, async (req, res) => {
    const index = config.collection.findIndex((item) => item.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: `${config.label} no encontrado.` });
    const [entity] = config.collection.splice(index, 1);
    const linkedSchedules = config.scheduleField
      ? horarios.filter((item) => item[config.scheduleField] === entity.id)
      : [];
    if (linkedSchedules.length) {
      config.collection.splice(index, 0, entity);
      return res.status(409).json({
        success: false,
        message: `No se puede eliminar: está asociado a estos horarios: ${linkedSchedules.map((item) => item.id).join(', ')}.`
      });
    }
    const previousStudentLinks = config.path === 'estudiantes'
      ? horarios.filter((item) => Array.isArray(item.estudianteIds) && item.estudianteIds.includes(entity.id))
        .map((item) => ({ item, estudianteIds: item.estudianteIds }))
      : [];
    previousStudentLinks.forEach(({ item, estudianteIds }) => {
      item.estudianteIds = estudianteIds.filter((id) => id !== entity.id);
    });
    if (previousStudentLinks.length) touchScheduleUpdate();
    const saveFailure = await persistAdminChange(res, state, () => {
      config.collection.splice(index, 0, entity);
      previousStudentLinks.forEach(({ item, estudianteIds }) => { item.estudianteIds = estudianteIds; });
      if (previousStudentLinks.length) touchScheduleUpdate();
    });
    if (saveFailure) return saveFailure;
    return res.json({ success: true, message: `${config.label} eliminado correctamente.` });
  });
}

registerAdminEntityRoutes({
  path: 'profesores', prefix: 'prof', label: 'Docente', collection: profesores,
  fields: ['nombre', 'email', 'telefono', 'departamento', 'oficina', 'horarioAtencion'],
  requiredFields: ['nombre'], scheduleField: 'profesorId'
});
registerAdminEntityRoutes({
  path: 'salones', prefix: 'salon', label: 'Salón', collection: salones,
  fields: ['nombre', 'capacidad', 'ubicacion'], requiredFields: ['nombre'],
  scheduleField: 'salonId', aliases: { ubicacion: 'edificio' }
});
registerAdminEntityRoutes({
  path: 'materias', prefix: 'mat', label: 'Materia', collection: materias,
  fields: ['nombre', 'codigo', 'programa', 'departamento'],
  requiredFields: ['nombre', 'codigo', 'programa', 'departamento'], scheduleField: 'materiaId'
});
registerAdminEntityRoutes({
  path: 'estudiantes', prefix: 'est', label: 'Estudiante', collection: estudiantes,
  fields: ['nombre', 'cedula', 'programa', 'semestre', 'email'],
  requiredFields: ['nombre', 'cedula', 'programa', 'semestre'],
  aliases: { programa: 'carrera' }
});

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
  const todosHorarios = [...horarios, ...(horariosCorte6 || [])];
  const docentesUnicos = [...new Set(
    todosHorarios.map(h => h.docente).filter(Boolean)
  )];
  const programasUnicos = [...new Set(
    todosHorarios.map(h => h.programa || h.carrera).filter(Boolean)
  )];
  return res.json({
    profesores: docentesUnicos.length,
    horarios: todosHorarios.length,
    programas: programasUnicos.length,
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
    console.error('No se pudo guardar analytics:', error.code || 'SIN_CODIGO', error.message);
    return res.status(500).json({ success: false, message: 'No se pudo guardar el cambio. Intenta de nuevo.' });
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
    estudianteIds: []
  };

  horarios.push(schedule);
  touchScheduleUpdate();
  const saveFailure = await persistAdminChange(res, { profesores, materias, salones, estudiantes, horarios }, () => {
    const index = horarios.findIndex((item) => item.id === schedule.id);
    if (index !== -1) horarios.splice(index, 1);
    touchScheduleUpdate();
  });
  if (saveFailure) return saveFailure;
  return res.status(201).json({ success: true, data: hydrateSchedule(schedule) });
});

app.patch('/api/v1/admin/horarios/:id', requireAdmin, async (req, res, next) => {
  const schedule = horarios.find((item) => item.id === req.params.id);

  if (!schedule) {
    return res.status(404).json({ success: false, message: 'Horario no encontrado' });
  }

  const previousSchedule = { ...schedule };
  const updates = req.body || {};
  if (Object.prototype.hasOwnProperty.call(updates, 'estudianteIds')) {
    if (!Array.isArray(updates.estudianteIds) || updates.estudianteIds.some((id) => typeof id !== 'string')) {
      return res.status(400).json({ success: false, message: 'La lista de alumnos no es válida.' });
    }
    const uniqueStudentIds = [...new Set(updates.estudianteIds)];
    if (uniqueStudentIds.some((id) => !estudiantes.some((student) => student.id === id))) {
      return res.status(400).json({ success: false, message: 'Uno o más alumnos seleccionados no existen.' });
    }
    updates.estudianteIds = uniqueStudentIds;
  }
  const referenceFields = [
    ['materiaId', getMateriaById, 'Materia'],
    ['profesorId', getProfesorById, 'Docente'],
    ['salonId', getSalonById, 'Salón']
  ];
  for (const [field, findById, label] of referenceFields) {
    if (Object.prototype.hasOwnProperty.call(updates, field) && !findById(updates[field])) {
      return res.status(400).json({ success: false, message: `${label} no válido` });
    }
  }
  const allowedFields = ['horaInicio', 'horaFin', 'fecha', 'modalidad', 'semestre', 'carrera', 'materiaId', 'profesorId', 'salonId', 'estudianteIds'];
  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(updates, field)) schedule[field] = updates[field];
  });

  touchScheduleUpdate();
  const saveFailure = await persistAdminChange(res, { profesores, materias, salones, estudiantes, horarios }, () => {
    Object.assign(schedule, previousSchedule);
    touchScheduleUpdate();
  });
  if (saveFailure) return saveFailure;
  return res.json({ success: true, data: hydrateSchedule(schedule) });
});

app.delete('/api/v1/admin/horarios/:id', requireAdmin, async (req, res, next) => {
  const scheduleIndex = horarios.findIndex((item) => item.id === req.params.id);

  if (scheduleIndex === -1) return res.status(404).json({ success: false, message: 'Horario no encontrado' });

  const [deletedSchedule] = horarios.splice(scheduleIndex, 1);
  touchScheduleUpdate();
  const saveFailure = await persistAdminChange(res, { profesores, materias, salones, estudiantes, horarios }, () => {
    horarios.splice(scheduleIndex, 0, deletedSchedule);
    touchScheduleUpdate();
  });
  if (saveFailure) return saveFailure;
  return res.json({ success: true, message: 'Horario eliminado' });
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

  const response = filtered.map(hydrateSchedule);

  return res.json({ success: true, ok: true, data: response });
});

app.get('/api/v1/horarios-corte6', (req, res) => {
  try {
    if (String(req.query.expandir || '') === '1') {
      const data = horariosCorte6.flatMap((horario) => horario.fechas.map(({ fecha, dia }) => {
        const { fechas, ...resto } = horario;
        return hydrateSchedule({ ...resto, fecha, dia });
      }));
      return res.json({ success: true, ok: true, data });
    }

    return res.json({ success: true, ok: true, data: horariosCorte6.map(hydrateSchedule) });
  } catch (error) {
    return res.status(500).json({ success: false, ok: false, error: error.message });
  }
});

app.get('/api/v1/buscar', (req, res) => {
  const rawQuery = String(req.query.q || '').trim();
  if (rawQuery.length > 80 || !/^[\p{L}\p{N}\s:._-]*$/u.test(rawQuery)) {
    return res.status(400).json({ success: false, message: 'La búsqueda contiene caracteres no permitidos' });
  }
  const q = normalizeText(rawQuery);
  const timeQuery = isTimeQuery(rawQuery);

  if (!q) {
    return res.json({ success: true, data: [] });
  }

  const results = horarios
    .map((item) => {
      const materiaInfo = getMateriaById(item.materiaId);
      const profesorInfo = getProfesorById(item.profesorId);
      const salonInfo = getSalonById(item.salonId);

      const hayCoincidencia = timeQuery
        ? matchesTimeQuery(rawQuery, `${item.horaInicio} ${item.horaFin}`)
        : (
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
        normalizeText(item.horaFin).includes(q)
      );

      if (!hayCoincidencia) return null;

      return hydrateSchedule(item);
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
    .filter((item) => Array.isArray(item.estudianteIds) && item.estudianteIds.includes(estudiante.id))
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
    if (!state) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('No hay estado académico persistido para generar el backup.');
      }
      return null;
    }
    const backupsDirectory = path.join(__dirname, 'backups');
    await fs.mkdir(backupsDirectory, { recursive: true });
    const now = new Date();
    const stamp = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}-${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}`;
    const filePath = path.join(backupsDirectory, `backup-${stamp}.json`);
    await fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf8');
    return filePath;
  } catch (error) {
    console.warn('No se pudo crear el backup:', error.code || 'SIN_CODIGO', error.message);
    if (process.env.NODE_ENV === 'production') throw error;
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
