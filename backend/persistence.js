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

module.exports = { loadState, saveState };