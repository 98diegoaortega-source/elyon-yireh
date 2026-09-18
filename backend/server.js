const express = require('express');
const path = require('path');
const cors = require('cors');
const { profesores, materias, salones, estudiantes, horarios } = require('./data');

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'Admin2026*';
const ADMIN_TOKEN = 'academic-pulse-admin-token';

app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

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

function requireAdmin(req, res, next) {
  const token = String(req.headers.authorization || '').replace('Bearer ', '');

  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, message: 'Se requiere una sesión de administrador' });
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

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'academic-schedule-api',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/v1/admin/login', (req, res) => {
  const { username, password } = req.body || {};

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
  }

  return res.json({ success: true, token: ADMIN_TOKEN, user: { username: ADMIN_USER, role: 'admin' } });
});

app.get('/api/v1/admin/horarios', requireAdmin, (req, res) => {
  return res.json({ success: true, data: horarios.map(hydrateSchedule) });
});

app.post('/api/v1/admin/horarios', requireAdmin, (req, res) => {
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
  return res.status(201).json({ success: true, data: hydrateSchedule(schedule) });
});

app.patch('/api/v1/admin/horarios/:id', requireAdmin, (req, res) => {
  const schedule = horarios.find((item) => item.id === req.params.id);

  if (!schedule) {
    return res.status(404).json({ success: false, message: 'Horario no encontrado' });
  }

  const allowedFields = ['horaInicio', 'horaFin', 'fecha', 'modalidad', 'semestre', 'carrera', 'materiaId', 'profesorId', 'salonId'];
  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) schedule[field] = req.body[field];
  });

  return res.json({ success: true, data: hydrateSchedule(schedule) });
});

app.delete('/api/v1/admin/horarios/:id', requireAdmin, (req, res) => {
  const scheduleIndex = horarios.findIndex((item) => item.id === req.params.id);

  if (scheduleIndex === -1) return res.status(404).json({ success: false, message: 'Horario no encontrado' });

  horarios.splice(scheduleIndex, 1);
  return res.json({ success: true, message: 'Horario eliminado' });
});

app.patch('/api/v1/admin/profesores/:id', requireAdmin, (req, res) => {
  const professor = getProfesorById(req.params.id);

  if (!professor) return res.status(404).json({ success: false, message: 'Profesor no encontrado' });

  ['nombre', 'email', 'telefono', 'departamento', 'oficina', 'horarioAtencion'].forEach((field) => {
    if (typeof req.body[field] === 'string') professor[field] = req.body[field].trim();
  });

  return res.json({ success: true, data: professor });
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

app.get('/api/v1/horarios', (req, res) => {
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
  const q = normalizeText(req.query.q || '');

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

app.listen(PORT, () => {
  console.log(`✅ API académica ejecutándose en http://localhost:${PORT}`);
});
