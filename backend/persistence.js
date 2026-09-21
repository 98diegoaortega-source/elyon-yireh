const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false })
  : null;

async function loadState(state) {
  if (!pool) return;
  await pool.query(`CREATE TABLE IF NOT EXISTS academic_state (
    id integer PRIMARY KEY,
    profesores jsonb NOT NULL,
    materias jsonb NOT NULL,
    salones jsonb NOT NULL,
    estudiantes jsonb NOT NULL,
    horarios jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    tipo TEXT NOT NULL,
    valor TEXT,
    ip TEXT,
    fecha TIMESTAMPTZ DEFAULT NOW()
  )`);
  const { rows } = await pool.query('SELECT profesores, materias, salones, estudiantes, horarios FROM academic_state WHERE id = 1');
  if (!rows[0]) {
    await saveState(state);
    return;
  }
  Object.keys(state).forEach((key) => {
    state[key].splice(0, state[key].length, ...rows[0][key]);
  });
}

async function saveState(state) {
  if (!pool) return;
  await pool.query(`INSERT INTO academic_state (id, profesores, materias, salones, estudiantes, horarios)
    VALUES (1, $1::jsonb, $2::jsonb, $3::jsonb, $4::jsonb, $5::jsonb)
    ON CONFLICT (id) DO UPDATE SET profesores = EXCLUDED.profesores, materias = EXCLUDED.materias,
      salones = EXCLUDED.salones, estudiantes = EXCLUDED.estudiantes, horarios = EXCLUDED.horarios, updated_at = now()`,
  [state.profesores, state.materias, state.salones, state.estudiantes, state.horarios]);
}

async function trackAnalytics(tipo, valor, ip) {
  if (!pool) return false;
  await pool.query('INSERT INTO analytics (tipo, valor, ip) VALUES ($1, $2, $3)', [tipo, valor || null, ip || null]);
  return true;
}

async function getTopAnalytics(limit = 10) {
  if (!pool) return [];
  const { rows } = await pool.query(`SELECT valor, COUNT(*)::int AS total
    FROM analytics WHERE tipo = 'busqueda' AND valor IS NOT NULL
    GROUP BY valor ORDER BY total DESC, valor ASC LIMIT $1`, [limit]);
  return rows;
}

async function getTotalAnalyticsToday() {
  if (!pool) return 0;
  const { rows } = await pool.query("SELECT COUNT(*)::int AS total FROM analytics WHERE tipo = 'busqueda' AND fecha >= CURRENT_DATE");
  return rows[0]?.total || 0;
}

async function getAcademicState() {
  if (!pool) return null;
  const { rows } = await pool.query('SELECT * FROM academic_state WHERE id = 1');
  return rows[0] || null;
}

module.exports = { loadState, saveState, trackAnalytics, getTopAnalytics, getTotalAnalyticsToday, getAcademicState };