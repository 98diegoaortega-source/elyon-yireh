const API_BASE_URL = window.ELYON_API_BASE_URL;

const state = {
  allSchedule: [],
  allTeachers: [],
  selectedView: 'tarjetas',
  studentId: 'est-001',
  members: []
};

const MEMBER_STORAGE_KEY = 'elyon_yireh_members';

let horariosCorte6 = [];
let verTodos = true;
let franjaSeleccionada = 'todas';

const searchInput = document.getElementById('searchInput');
const dayFilter = document.getElementById('dayFilter');
const semesterFilter = document.getElementById('semesterFilter');
const careerFilter = document.getElementById('careerFilter');
const roomFilter = document.getElementById('roomFilter');
const cardsContainer = document.getElementById('cardsContainer');
const teachersContainer = document.getElementById('teachersContainer');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const myScheduleBtn = document.getElementById('myScheduleBtn');
const adminButton = document.getElementById('adminButton');
const adminPanel = document.getElementById('adminPanel');
const closeAdmin = document.getElementById('closeAdmin');
const adminLogin = document.getElementById('adminLogin');
const adminEditor = document.getElementById('adminEditor');
const adminRows = document.getElementById('adminRows');
const adminLoginMessage = document.getElementById('adminLoginMessage');
const createScheduleButton = document.getElementById('createScheduleButton');
const openMemberFormButton = document.getElementById('openMemberFormButton');
const memberForm = document.getElementById('memberForm');
const memberTable = document.getElementById('memberTable');
const createScheduleForm = document.getElementById('createScheduleForm');
const createScheduleMessage = document.getElementById('createScheduleMessage');
const excelImportInput = document.getElementById('excelImportInput');
const importStatus = document.getElementById('importStatus');
const adminTabButtons = document.querySelectorAll('.admin-tab-btn');
const adminTabPanels = document.querySelectorAll('.admin-tab-panel');
const searchButton = document.getElementById('searchButton');
const programSearch = document.getElementById('programSearch');
const timeSearch = document.getElementById('timeSearch');
const dateSearch = document.getElementById('dateSearch');
const clearSearch = document.getElementById('clearSearch');
const resultCount = document.getElementById('resultCount');
const forceRefreshButton = document.getElementById('forceRefreshButton');
const searchHistory = document.getElementById('searchHistory');
const statistics = document.getElementById('statistics');
const pwaSplash = document.getElementById('pwaSplash');
const chatButton = document.getElementById('chatButton');
const chatPanel = document.getElementById('chatPanel');
const closeChatButton = document.getElementById('closeChatButton');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const notificationButton = document.getElementById('notificationButton');
const installButton = document.getElementById('installButton');
const favoritesSection = document.getElementById('favoritesSection');
const favoritesContainer = document.getElementById('favoritesContainer');
const clearFavorites = document.getElementById('clearFavorites');
const languageToggle = document.getElementById('languageToggle');
const aboutButton = document.getElementById('aboutButton');
const aboutModal = document.getElementById('aboutModal');
const closeAboutButton = document.getElementById('closeAboutButton');
const closeAboutFooter = document.getElementById('closeAboutFooter');
let deferredInstallPrompt;
const HISTORY_KEY = 'elyon-yireh-search-history';
const FAVORITES_KEY = 'elyon_favorites';
const LANGUAGE_KEY = 'elyon_lang';
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'es';
const translations = {
  es: { favorites: 'Mis favoritos', clearFavorites: 'Limpiar favoritos', searcher: 'Buscador', clear: 'Limpiar', teacherOrQuery: 'Profesor o consulta', program: 'Programa', schedule: 'Horario', date: 'Fecha o periodo', search: 'Buscar', results: 'Resultados', details: 'Ver detalles', share: 'Compartir' },
  en: { favorites: 'My favorites', clearFavorites: 'Clear favorites', searcher: 'Search', clear: 'Clear', teacherOrQuery: 'Teacher or query', program: 'Program', schedule: 'Schedule', date: 'Date or period', search: 'Search', results: 'Results', details: 'View details', share: 'Share' }
};

const revisarStyles = document.createElement('style');
revisarStyles.textContent = `
  .revisar { background: #fff3cd; }
  .franja-btn {
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    background: #fff;
    border: 1px solid #e2e8f0;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s;
  }
  .franja-btn:hover { background: #f1f5f9; }
  .franja-btn.active {
    background: #15803d;
    color: #fff;
    border-color: #15803d;
  }
  .franja-titulo {
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 24px 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
  }
  .franja-titulo span { font-weight: 400; color: #94a3b8; }
`;
document.head.appendChild(revisarStyles);
let adminToken = sessionStorage.getItem('academic_admin_token') || '';
let searchDebounce;
let isLoading = false;

async function fetchJson(url, options = {}) {
  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), options.signal ? 30000 : 30000);
    const response = await fetch(url, { ...options, signal: controller.signal });
    const contentType = response.headers.get('content-type') || '';
    const result = contentType.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      const apiError = new Error(result?.message || result?.error || `Error HTTP ${response.status}`);
      apiError.name = 'ApiError';
      throw apiError;
    }

    if (!contentType.includes('application/json')) {
      throw new Error('El servidor no devolvi� una respuesta JSON v�lida');
    }

    return result;
  } catch (error) {
    console.error(`Error consultando ${url}:`, error);
    // Conserva el mensaje real enviado por la API para que la interfaz pueda mostrarlo.
    if (error.name === 'ApiError') throw error;
    const friendlyError = new Error(error.name === 'AbortError'
      ? 'No se pudo conectar con el servidor. Verifica tu conexi�n a internet.'
      : 'No se pudo conectar con el servidor. Verifica tu conexi�n a internet.');
    friendlyError.cause = error;
    throw friendlyError;
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}

async function loadData() {
  setLoading(true);
  const slowMessage = setTimeout(() => {
    cardsContainer.innerHTML = '<div class="loading-state"><span class="spinner" aria-hidden="true"></span><span>Cargando datos por primera vez, esto puede tardar unos segundos...</span></div>';
  }, 5000);

  try {
    const [scheduleRes, teachersRes, statisticsRes] = await Promise.all([
      fetchJson(`${API_BASE_URL}/api/v1/horarios`),
      fetchJson(`${API_BASE_URL}/api/v1/profesores`),
      fetchJson(`${API_BASE_URL}/api/v1/estadisticas`)
    ]);

    state.allSchedule = scheduleRes.data || [];
    state.allTeachers = teachersRes.data || [];
    renderStatistics(statisticsRes);
    renderFavorites();
    render();
  } finally {
    clearTimeout(slowMessage);
    setLoading(false);
  }
}

async function cargarCorte6() {
  try {
    const result = await fetchJson(`${API_BASE_URL}/api/v1/horarios-corte6`);
    if (result.ok !== true || !Array.isArray(result.data)) {
      throw new Error('La respuesta de horarios del Corte 6 no tiene el formato esperado');
    }
    horariosCorte6 = result.data;
    renderFavorites();
    render();
  } catch (error) {
    console.error('Error cargando horarios del Corte 6:', error);
    cardsContainer.innerHTML = '<div class="glass rounded-3xl p-6 text-rose-600">No se pudieron cargar los horarios del Corte 6.</div>';
  }
}

function setLoading(value) {
  isLoading = value;
  if (value) {
    cardsContainer.innerHTML = '<div class="loading-state"><span class="spinner" aria-hidden="true"></span><span>Cargando horarios...</span></div>';
  }
}

function renderStatistics(data) {
  if (!data || !statistics) return;
  statistics.textContent = `${data.profesores} profesores � ${data.horarios} horarios � ${data.programas} programas`;
}

function getStoredMembers() {
  try {
    const values = JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY) || '[]');
    return Array.isArray(values) ? values : [];
  } catch (error) {
    console.warn('No se pudieron leer los miembros guardados:', error);
    return [];
  }
}

function saveStoredMembers(members) {
  localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(members));
  state.members = members;
}

function renderMemberTable() {
  if (!memberTable) return;
  const members = getStoredMembers();
  memberTable.innerHTML = members.map((member) => `
    <div class="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 md:flex-row md:items-center md:justify-between">
      <div>
        <div class="text-sm font-semibold text-slate-900">${member.nombre || 'Sin nombre'}</div>
        <div class="text-xs text-slate-500">${member.rol || 'Sin rol'} � ${member.departamento || 'Sin departamento'}</div>
      </div>
      <div class="text-xs text-slate-500">
        <div>${member.email || 'Sin email'}</div>
        <div>${member.telefono || 'Sin tel�fono'}</div>
      </div>
      <div class="flex gap-2">
        <button type="button" class="rounded-xl border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700" data-member-edit="${member.id}">Editar</button>
        <button type="button" class="rounded-xl border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-600" data-member-delete="${member.id}">Eliminar</button>
      </div>
    </div>
  `).join('');

  memberTable.querySelectorAll('[data-member-edit]').forEach((button) => {
    button.addEventListener('click', () => {
      const member = getStoredMembers().find((item) => item.id === button.dataset.memberEdit);
      if (!member) return;
      document.getElementById('memberName').value = member.nombre || '';
      document.getElementById('memberRole').value = member.rol || '';
      document.getElementById('memberEmail').value = member.email || '';
      document.getElementById('memberPhone').value = member.telefono || '';
      document.getElementById('memberDepartment').value = member.departamento || '';
      memberForm.dataset.memberId = member.id;
      memberForm.querySelector('button[type="submit"]').textContent = 'Actualizar miembro';
      document.querySelector('[data-admin-tab="members"]').click();
      document.getElementById('memberName').focus();
    });
  });

  memberTable.querySelectorAll('[data-member-delete]').forEach((button) => {
    button.addEventListener('click', () => {
      const members = getStoredMembers().filter((member) => member.id !== button.dataset.memberDelete);
      saveStoredMembers(members);
      renderMemberTable();
      importStatus.textContent = 'Miembro eliminado correctamente.';
    });
  });
}

function exportWorkbook(rows, sheetName, fileName) {
  const wb = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, sheet, sheetName);
  XLSX.writeFile(wb, fileName);
}

async function exportAdminExcel(type = 'horarios') {
  try {
    if (type === 'miembros') {
      const rows = getStoredMembers().map((member) => ({
        nombre: member.nombre,
        rol: member.rol,
        email: member.email,
        telefono: member.telefono,
        departamento: member.departamento
      }));
      exportWorkbook(rows, 'Miembros', `elyon-miembros-${Date.now()}.xlsx`);
      importStatus.textContent = 'Exportaci�n de miembros lista.';
      return;
    }

    const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/horarios`, { headers: adminHeaders() });
    const rows = (result.data || []).map((item) => ({
      programa: item.carrera || item.materia?.programa || '',
      semestre: item.semestre || '',
      fecha: item.fecha || '',
      horaInicio: item.horaInicio || '',
      horaFin: item.horaFin || '',
      modalidad: item.modalidad || '',
      salon: item.salon?.nombre || item.salonId || '',
      docente: item.profesor?.nombre || item.profesorId || '',
      materia: item.materia?.nombre || item.materiaId || ''
    }));
    exportWorkbook(rows, 'Horarios', `elyon-horarios-${Date.now()}.xlsx`);
    importStatus.textContent = 'Exportaci�n de horarios lista.';
  } catch (error) {
    importStatus.textContent = error.message || 'No se pudo exportar el archivo Excel.';
  }
}

function mapImportedRowsToMembers(rows) {
  return rows
    .map((row, index) => ({
      rowNumber: index + 1,
      id: `member-${Date.now()}-${index}`,
      nombre: getImportedValue(row, 'nombre'),
      rol: getImportedValue(row, 'rol') || 'Miembro',
      email: getImportedValue(row, 'email'),
      telefono: getImportedValue(row, 'telefono'),
      departamento: getImportedValue(row, 'departamento')
    }))
    .filter((member) => member.nombre || member.email || getImportedValue(rows[member.rowNumber - 1], 'rol'));
}

// Lee encabezados ignorando mayúsculas, espacios y tildes para aceptar variantes del Excel.
function getImportedValue(row, ...keys) {
  const normalizedKeys = new Set(keys.map((key) => normalize(key).replace(/[^\p{L}\p{N}]/gu, '')));
  const entry = Object.entries(row).find(([key, value]) =>
    normalizedKeys.has(normalize(key).replace(/[^\p{L}\p{N}]/gu, '')) && String(value).trim()
  );
  return entry ? String(entry[1]).trim() : '';
}

function resolveImportedId(value, records, label, searchableFields) {
  const normalizedValue = normalize(value);
  if (!normalizedValue) throw new Error(`Falta ${label}.`);

  const matches = records.filter((record) => searchableFields.some((field) =>
    record[field] && normalize(record[field]) === normalizedValue
  ));
  const uniqueMatches = [...new Map(matches.map((record) => [record.id, record])).values()];
  if (!uniqueMatches.length) throw new Error(`${label} «${value}» no existe en el catálogo.`);
  if (uniqueMatches.length > 1) throw new Error(`${label} «${value}» coincide con varios registros; usa su ID.`);
  return uniqueMatches[0].id;
}

function mapImportedRowToSchedule(row, catalogs) {
  const materia = getImportedValue(row, 'materiaId', 'materia', 'asignatura');
  const profesor = getImportedValue(row, 'profesorId', 'docente', 'profesor');
  const salon = getImportedValue(row, 'salonId', 'salon', 'aula');
  const carrera = getImportedValue(row, 'carrera', 'programa');
  const semestre = getImportedValue(row, 'semestre');
  const fecha = getImportedValue(row, 'fecha');
  const horaInicio = getImportedValue(row, 'horaInicio', 'inicio');
  const horaFin = getImportedValue(row, 'horaFin', 'fin');
  const modalidad = getImportedValue(row, 'modalidad');

  const required = { carrera, semestre, fecha, horaInicio, horaFin, modalidad };
  const missing = Object.entries(required).filter(([, value]) => !value).map(([field]) => field);
  if (missing.length) throw new Error(`Faltan campos obligatorios: ${missing.join(', ')}.`);

  return {
    carrera,
    semestre,
    fecha,
    horaInicio,
    horaFin,
    modalidad,
    materiaId: resolveImportedId(materia, catalogs.materias, 'Materia', ['id', 'nombre', 'codigo']),
    profesorId: resolveImportedId(profesor, catalogs.profesores, 'Docente', ['id', 'nombre']),
    salonId: resolveImportedId(salon, catalogs.salones, 'Salón', ['id', 'nombre'])
  };
}

function isScheduleImportRow(row) {
  return ['programa', 'carrera', 'semestre', 'fecha', 'horainicio', 'inicio', 'horafin', 'fin',
    'docente', 'profesor', 'profesorid', 'salon', 'salonid', 'aula', 'materia', 'materiaid', 'asignatura']
    .some((key) => getImportedValue(row, key));
}

function renderImportResults(results) {
  // Usa nodos de texto para que los valores del Excel no se interpreten como HTML.
  document.getElementById('importRowResults')?.remove();
  const list = document.createElement('ul');
  list.id = 'importRowResults';
  list.className = 'mt-2 space-y-1 text-xs';
  results.forEach(({ rowNumber, ok, message }) => {
    const item = document.createElement('li');
    item.className = ok ? 'text-green-700' : 'text-rose-600';
    item.textContent = `Fila ${rowNumber}: ${ok ? 'Éxito' : 'Error'} — ${message}`;
    list.appendChild(item);
  });
  importStatus.insertAdjacentElement('afterend', list);
  const imported = results.filter((result) => result.ok).length;
  const failed = results.length - imported;
  importStatus.textContent = `${imported} importados, ${failed} fallidos.`;
}

async function importExcelFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    if (!rows.length) throw new Error('El archivo no tiene filas útiles para importar.');

    const results = [];
    const members = mapImportedRowsToMembers(rows);
    if (members.length) {
      const persistedMembers = members.map(({ rowNumber, ...member }) => member);
      saveStoredMembers([...getStoredMembers(), ...persistedMembers]);
      renderMemberTable();
      members.forEach((member) => results.push({ rowNumber: member.rowNumber, ok: true, message: 'Miembro guardado localmente.' }));
    }

    const scheduleEntries = rows
      .map((row, index) => ({ row, rowNumber: index + 1 }))
      .filter(({ row }) => isScheduleImportRow(row));
    let importedSchedules = 0;
    if (scheduleEntries.length) {
      const [profesoresRes, materiasRes, salonesRes] = await Promise.all([
        fetchJson(`${API_BASE_URL}/api/v1/profesores`),
        fetchJson(`${API_BASE_URL}/api/v1/materias`),
        fetchJson(`${API_BASE_URL}/api/v1/salones`)
      ]);
      const catalogs = {
        profesores: profesoresRes.data || [],
        materias: materiasRes.data || [],
        salones: salonesRes.data || []
      };

      for (const { row, rowNumber } of scheduleEntries) {
        try {
          const schedule = mapImportedRowToSchedule(row, catalogs);
          await fetchJson(`${API_BASE_URL}/api/v1/admin/horarios`, {
            method: 'POST',
            headers: adminHeaders(),
            body: JSON.stringify(schedule)
          });
          importedSchedules += 1;
          results.push({ rowNumber, ok: true, message: 'Horario importado.' });
        } catch (error) {
          results.push({ rowNumber, ok: false, message: error.message || 'No se pudo importar el horario.' });
        }
      }
    }

    rows.forEach((row, index) => {
      if (!isScheduleImportRow(row) && !members.some((member) => member.rowNumber === index + 1)) {
        results.push({ rowNumber: index + 1, ok: false, message: 'La fila no contiene datos reconocibles de miembro ni de horario.' });
      }
    });
    renderImportResults(results);
    if (importedSchedules) {
      await loadAdminEditor();
      await loadData();
    }
  } catch (error) {
    importStatus.textContent = error.message || 'No se pudo importar el archivo Excel.';
  } finally {
    event.target.value = '';
  }
}

function getFavorites() {
  try {
    const values = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(values) ? values : [];
  } catch {
    return [];
  }
}

function getAllSchedule() {
  return [...new Map(
    [...state.allSchedule, ...horariosCorte6].map((item) => [item.id, item])
  ).values()];
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id) ? favorites.filter((favorite) => favorite !== id) : [...favorites, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  renderFavorites();
  render();
}

function renderFavorites() {
  const schedule = getAllSchedule();
  const items = getFavorites().map((id) => schedule.find((item) => item.id === id)).filter(Boolean);
  favoritesSection.classList.toggle('hidden', !items.length);
  favoritesContainer.innerHTML = items.map((item) => `<article class="favorite-card"><strong>${item.materia?.nombre || item.carrera || 'Clase'}</strong><span>${item.profesor?.nombre || item.docente || 'Docente'} � ${item.horaInicio} - ${item.horaFin}</span><button type="button" data-favorite-remove="${item.id}" aria-label="Quitar de favoritos" title="Quitar de favoritos"><i class="ph-fill ph-star" aria-hidden="true"></i></button></article>`).join('');
  favoritesContainer.querySelectorAll('[data-favorite-remove]').forEach((button) => button.addEventListener('click', () => toggleFavorite(button.dataset.favoriteRemove)));
}

function applyLanguage() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) element.textContent = translations[currentLanguage][key];
  });
  languageToggle.textContent = currentLanguage === 'es' ? 'ES | EN' : 'EN | ES';
  renderFavorites();
  render();
}

function switchLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyLanguage();
}

async function openAbout() {
  aboutModal.classList.remove('hidden');
}

function closeAbout() {
  aboutModal.classList.add('hidden');
}

function getSearchHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(value) {
  const query = value.trim();
  if (!query) return;
  const history = [query, ...getSearchHistory().filter((item) => item !== query)].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function trackSearch(value) {
  const query = value.trim();
  if (!query) return;
  fetch(`${API_BASE_URL}/api/v1/analytics/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo: 'busqueda', valor: query })
  }).catch(() => {});
}

function renderSearchHistory() {
  const history = getSearchHistory();
  searchHistory.innerHTML = history.map((item) => `<button type="button" class="search-history-item" data-history="${item.replace(/"/g, '&quot;')}">${item}</button>`).join('');
  searchHistory.classList.toggle('hidden', !history.length);
  searchHistory.querySelectorAll('[data-history]').forEach((button) => {
    button.addEventListener('click', () => {
      searchInput.value = button.dataset.history;
      searchHistory.classList.add('hidden');
      runSearch();
    });
  });
}

function runSearch() {
  saveSearchHistory(searchInput.value);
  trackSearch([searchInput.value, programSearch.value, timeSearch.value, dateSearch.value].filter(Boolean).join(' '));
  searchHistory.classList.add('hidden');
  render();
}

function scheduleSearch() {
  clearTimeout(searchDebounce);
  cardsContainer.innerHTML = '<div class="loading-state"><span class="spinner" aria-hidden="true"></span><span>Buscando horarios...</span></div>';
  searchDebounce = setTimeout(runSearch, 400);
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
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

function limpiarFecha(fecha) {
  if (!fecha) return '';
  return String(fecha).replace(/\s*[A-Z]\s*$/, '').trim();
}


function normalizeTexto(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}function coincideConBusqueda(item, termino) {
  if (!termino) return true;
  const t = normalizeTexto(termino);
  const campos = [
    item.docente,
    item.profesor?.nombre,
    item.modulo,
    item.nombreModulo,
    item.programa,
    item.carrera,
    item.aula,
    item.salon?.nombre,
    item.codigo,
    item.codigoModulo,
    item.semestre,
    item.corte,
    item.modalidad
  ];
  return campos.some(c => c && normalizeTexto(c).includes(t));
}

function formatHora(hhmm) {
  if (!hhmm) return '';
  const [hour, minute] = hhmm.split(':').map(Number);
  const ampm = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${ampm}`;
}

function getFilteredSchedule() {
  const search = searchInput.value.trim();
  const program = programSearch.value;
  const time = timeSearch.value;
  const date = dateSearch.value.trim();
  const semester = semesterFilter?.value || '';
  const career = careerFilter?.value || '';
  const room = roomFilter?.value || '';

  const source = verTodos ? getAllSchedule() : horariosCorte6;

  let lista = source.filter((item) => {
    const matchesSemester = !semester || item.semestre === semester;
    const matchesCareer = !career || item.carrera === career;
    const matchesRoom = !room || item.salon?.nombre === room || item.aula === room;
    const matchesSearchValue = coincideConBusqueda(item, search);
    const matchesProgram = !program || normalize(item.carrera || item.programa || item.materia?.programa).includes(normalize(program));
    const matchesTime = !time || matchesTimeQuery(time, `${item.horaInicio} ${item.horaFin}`);
    const matchesDate = !date || normalize(item.fecha).includes(normalize(date));

    return matchesSemester && matchesCareer && matchesRoom && matchesSearchValue && matchesProgram && matchesTime && matchesDate;
  });

  if (franjaSeleccionada !== 'todas') {
    const [inicio, fin] = franjaSeleccionada.split('-');
    lista = lista.filter((item) => item.horaInicio === inicio && item.horaFin === fin);
  }

  return lista;
}

// Escapa texto dinámico antes de insertarlo en el marcado HTML.
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function renderCards(items, agrupar = false) {
  const query = escapeHTML(searchInput.value.trim());

  const tabs = `
    <div class="glass col-span-full mb-4 flex items-center gap-3 rounded-2xl p-4">
      <input type="checkbox" id="verTodosCheck" class="h-5 w-5 cursor-pointer accent-green-700" ${verTodos ? 'checked' : ''}>
      <label for="verTodosCheck" class="cursor-pointer text-sm font-medium text-slate-700">Ver todos los horarios</label>
      <span id="contadorHorarios" class="ml-auto text-xs text-slate-500"></span>
    </div>
    <div id="franjaFiltros" class="mb-4 flex flex-wrap gap-2">
      <button type="button" class="franja-btn ${franjaSeleccionada === 'todas' ? 'active' : ''}" data-franja="todas">Todas</button>
      <button type="button" class="franja-btn ${franjaSeleccionada === '06:30-08:45' ? 'active' : ''}" data-franja="06:30-08:45">6:30-8:45</button>
      <button type="button" class="franja-btn ${franjaSeleccionada === '09:00-11:15' ? 'active' : ''}" data-franja="09:00-11:15">9:00-11:15</button>
      <button type="button" class="franja-btn ${franjaSeleccionada === '11:30-13:30' ? 'active' : ''}" data-franja="11:30-13:30">11:30-13:30</button>
      <button type="button" class="franja-btn ${franjaSeleccionada === '13:45-16:00' ? 'active' : ''}" data-franja="13:45-16:00">1:45-4:00</button>
    </div>`;

  resultCount.textContent = `${items.length} resultado${items.length === 1 ? '' : 's'}`;
  if (!items.length) {
    cardsContainer.innerHTML = `${tabs}
      <p class="text-center text-slate-500 py-8">No se encontraron resultados para "${query}"</p>
    `;
    const counter = document.getElementById('contadorHorarios');
    if (counter) counter.textContent = `${items.length} horarios`;
    return;
  }

  const groups = agrupar
    ? [...items.reduce((grouped, item) => {
      const key = `${item.horaInicio} - ${item.horaFin}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(item);
      return grouped;
    }, new Map())].sort(([first], [second]) => minutesFromTime(first.split(' - ')[0]) - minutesFromTime(second.split(' - ')[0]))
    : [['', items]];

  const cardsMarkup = groups.map(([franja, groupItems]) => `
    ${agrupar ? `<h3 class="franja-titulo col-span-full">${escapeHTML(formatHora(groupItems[0].horaInicio))} - ${escapeHTML(formatHora(groupItems[0].horaFin))} <span>(${groupItems.length} m�dulos)</span></h3>` : ''}
    ${groupItems
    .map((item) => {
      const program = escapeHTML(item.programa || item.carrera || item.materia?.programa || 'Sin programa');
      const module = item.modulo || item.materia?.nombre || 'Sin m�dulo';
      const safeModule = escapeHTML(module);
      const teacher = escapeHTML(item.docente || item.profesor?.nombre || 'Sin docente');
      const classroom = escapeHTML(item.aula || item.salon?.nombre || 'Sin asignar');
      const studentCount = Array.isArray(item.estudianteIds) ? item.estudianteIds.length : Number(item.estudiantes) || 0;
      const teacherInitials = escapeHTML(item.profesor?.foto || teacher.split(' ').map((part) => part[0]).join('').slice(0, 2));
      const itemId = escapeHTML(item.id);
      return `
        <article class="glass result-card rounded-3xl p-5">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div class="card-actions"><button class="favorite-star ${isFavorite(item.id) ? 'is-favorite' : ''}" type="button" data-favorite="${itemId}" aria-label="${isFavorite(item.id) ? 'Quitar favorito' : 'Agregar favorito'}" aria-pressed="${isFavorite(item.id)}"><i class="${isFavorite(item.id) ? 'ph-fill ph-star' : 'ph ph-star'}" aria-hidden="true"></i></button></div>
          </div>

          <p class="mb-2 text-sm text-slate-400">${program} � ${escapeHTML(item.semestre || 'Semestre')}</p>
          <h3 class="mb-4 text-xl font-semibold text-slate-900">${safeModule}</h3>

          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${escapeHTML(item.profesor?.color || 'from-cyan-500 to-indigo-500')} text-sm font-bold text-white">
              ${teacherInitials}
            </div>
            <div>
              <p class="font-medium text-slate-900">${teacher}</p>
            </div>
          </div>

          <div class="space-y-2 text-sm text-slate-300">
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">AULA#</span>
              <strong class="text-right text-slate-900">${classroom}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">HORARIO</span>
              <strong class="text-right text-slate-900">${escapeHTML(item.horaInicio)} - ${escapeHTML(item.horaFin)}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">PROGRAMA</span>
              <strong class="text-right text-slate-900">${program}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">SEMESTRE</span>
              <strong class="text-right text-slate-900">${escapeHTML(item.semestre || '')}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">ALUMNOS</span>
              <strong class="text-right text-slate-900">${studentCount}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">CORTE#4</span>
              <strong class="text-right text-slate-900">${escapeHTML(item.corte || '')}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">NOMBRE DE MODULO 4</span>
              <strong class="text-right text-slate-900">${safeModule}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">DOCENTE</span>
              <strong class="text-right text-slate-900">${teacher}</strong>
            </div>
          </div>

          <button type="button" class="share-whatsapp mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-700" data-share="${itemId}">
            <i class="ph ph-whatsapp-logo"></i> ${translations[currentLanguage].share}
          </button>
        </article>
      `;
    })
    .join('')}
  `).join('');

  cardsContainer.innerHTML = `${tabs}
    ${query ? `<div class="col-span-full mb-1 text-sm text-slate-500"><strong class="text-slate-900">${items.length}</strong> resultado(s) para <strong class="text-blue-600">${query}</strong></div>` : ''}
    ${cardsMarkup}
  `;
  const counter = document.getElementById('contadorHorarios');
  if (counter) counter.textContent = `${items.length} horarios`;

  cardsContainer.querySelectorAll('[data-open]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.open));
  });
  cardsContainer.querySelectorAll('[data-share]').forEach((button) => {
    button.addEventListener('click', () => shareSchedule(button.dataset.share));
  });
  cardsContainer.querySelectorAll('[data-favorite]').forEach((button) => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.favorite));
  });
}

function shareSchedule(itemId) {
  const item = getAllSchedule().find((entry) => entry.id === itemId);
  if (!item) return;
  const detail = `${item.profesor?.nombre || 'Docente'} - ${item.materia?.nombre || 'Materia'} - ${item.horaInicio} - ${item.horaFin}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(`Consulta en ELYON YIREH: ${detail}`)}`, '_blank', 'noopener,noreferrer');
}

function minutesFromTime(value) {
  const match = String(value || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return 0;
  let hour = Number(match[1]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === 'PM' && hour < 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  return hour * 60 + Number(match[2]);
}

function addChatMessage(text, role) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble chat-bubble-${role}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function askChatbot(question) {
  addChatMessage(question, 'user');
  chatInput.value = '';
  try {
    const result = await fetchJson(`${API_BASE_URL}/api/v1/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pregunta: question }) });
    addChatMessage([result.respuesta, ...(result.horarios || [])].filter(Boolean).join('\n'), 'assistant');
  } catch {
    addChatMessage('No pude consultar el asistente. Intenta nuevamente.', 'assistant');
  }
}

async function enableNotifications() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    localStorage.setItem('elyon-yireh-notifications', 'enabled');
    notificationButton.classList.add('hidden');
    checkScheduleUpdates();
  }
}

async function checkScheduleUpdates() {
  if (localStorage.getItem('elyon-yireh-notifications') !== 'enabled') return;
  try {
    const result = await fetchJson(`${API_BASE_URL}/api/v1/ultima-actualizacion`);
    const previous = localStorage.getItem('elyon-yireh-last-update');
    if (previous && previous !== result.timestamp) new Notification('ELYON YIREH', { body: 'Hay cambios nuevos en los horarios.' });
    localStorage.setItem('elyon-yireh-last-update', result.timestamp);
  } catch (error) {
    console.warn('No se pudo comprobar la actualizaci�n de horarios:', error.message);
  }
}

function renderTeachers() {
  teachersContainer.innerHTML = state.allTeachers
    .map((teacher) => `
      <article class="glass rounded-3xl p-5">
        <div class="mb-4 flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${teacher.color || 'from-cyan-500 to-indigo-500'} text-sm font-bold text-white">
            ${teacher.foto}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">${teacher.nombre}</h3>
            <p class="text-sm text-slate-400">${teacher.departamento}</p>
          </div>
        </div>
        <div class="space-y-2 text-sm text-slate-300">
          <div><span class="text-slate-400">Email:</span> <a href="mailto:${teacher.email}" class="text-cyan-300">${teacher.email}</a></div>
          <div><span class="text-slate-400">Tel:</span> <a href="tel:${teacher.telefono}" class="text-cyan-300">${teacher.telefono}</a></div>
          <div><span class="text-slate-400">Oficina:</span> <span class="text-white">${teacher.oficina}</span></div>
        </div>
      </article>
    `)
    .join('');
}

function render() {
  renderCards(getFilteredSchedule(), franjaSeleccionada === 'todas');
  renderTeachers();
}

function buildModalContent(item) {
  return `
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="mb-4 flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.profesor?.color || 'from-cyan-500 to-indigo-500'} font-bold text-white">
          ${item.profesor?.foto || 'PR'}
        </div>
        <div>
          <div class="text-sm text-slate-400">${item.carrera || item.materia?.programa || 'Programa acad�mico'}</div>
          <div class="text-lg font-semibold text-slate-900">${item.profesor?.nombre}</div>
        </div>
      </div>

      <div class="mb-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-sm text-cyan-100">
        <div class="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Programa</div>
        <div class="mt-1 font-semibold">${item.carrera || item.materia?.programa || 'Por definir'} � ${item.semestre || 'Semestre por definir'}</div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div class="text-[10px] uppercase tracking-[0.18em] text-slate-400">Sal�n</div>
          <div class="mt-2 font-semibold text-slate-900">${item.salon?.nombre} � ${item.salon?.edificio}</div>
        </div>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <a href="mailto:${item.profesor?.email}" class="flex items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-50 px-4 py-3 font-medium text-cyan-700 hover:bg-cyan-100">
        <i class="ph ph-envelope"></i> Enviar email
      </a>
      <a href="tel:${item.profesor?.telefono}" class="flex items-center justify-center gap-2 rounded-2xl border border-indigo-500/30 bg-indigo-50 px-4 py-3 font-medium text-indigo-700 hover:bg-indigo-100">
        <i class="ph ph-phone"></i> Llamar
      </a>
      <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/${encodeURIComponent(item.salon?.nombre + ' ' + item.salon?.edificio)}" class="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-3 font-medium text-slate-700 hover:border-slate-500 md:col-span-2">
        <i class="ph ph-map-pin"></i> Ver en mapa
      </a>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
      <div class="mb-2 flex items-center justify-between"><span class="text-slate-500">Email</span><strong class="text-slate-900">${item.profesor?.email}</strong></div>
      <div class="mb-2 flex items-center justify-between"><span class="text-slate-500">Tel�fono</span><strong class="text-slate-900">${item.profesor?.telefono}</strong></div>
      <div class="mb-2 flex items-center justify-between"><span class="text-slate-500">Oficina</span><strong class="text-slate-900">${item.profesor?.oficina}</strong></div>
      <div class="flex items-center justify-between"><span class="text-slate-500">Atenci�n</span><strong class="text-slate-900">${item.profesor?.horarioAtencion}</strong></div>
    </div>
  `;
}

function openModal(itemId) {
  const item = state.allSchedule.find((entry) => entry.id === itemId);

  if (!item) return;

  modalTitle.textContent = `${item.carrera || item.materia?.programa || 'Programa acad�mico'} � ${item.semestre || 'Semestre'}`;
  modalContent.innerHTML = buildModalContent(item);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModalView() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

async function openAdmin() {
  adminPanel.classList.remove('hidden');
  if (adminToken) {
    try {
      await loadAdminEditor();
    } catch (error) {
      adminLoginMessage.textContent = error.message;
    }
  }
}

function adminHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken}`;
  }

  return headers;
}
async function adminLoginRequest() {
  const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: document.getElementById('adminUsername').value, password: document.getElementById('adminPassword').value })
  });
  adminToken = result.token;
  sessionStorage.setItem('academic_admin_token', adminToken);
  await loadAdminEditor();
}

async function loadAdminEditor() {
  const [scheduleRes, teachersRes, roomsRes, subjectsRes, studentsRes] = await Promise.all([
    fetchJson(`${API_BASE_URL}/api/v1/admin/horarios`, { headers: adminHeaders() }),
    fetchJson(`${API_BASE_URL}/api/v1/admin/profesores`, { headers: adminHeaders() }),
    fetchJson(`${API_BASE_URL}/api/v1/admin/salones`, { headers: adminHeaders() }),
    fetchJson(`${API_BASE_URL}/api/v1/admin/materias`, { headers: adminHeaders() }),
    fetchJson(`${API_BASE_URL}/api/v1/admin/estudiantes`, { headers: adminHeaders() })
  ]);

  if (!scheduleRes.success) throw new Error(scheduleRes.message || 'No se pudo cargar el panel');
  adminLogin.classList.add('hidden');
  adminEditor.classList.remove('hidden');
  state.members = getStoredMembers();
  renderAdminRows(scheduleRes.data, teachersRes.data, roomsRes.data, subjectsRes.data, studentsRes.data || []);
  renderMemberTable();
  window.renderAdminEntities({
    profesores: teachersRes.data || [],
    salones: roomsRes.data || [],
    materias: subjectsRes.data || [],
    estudiantes: studentsRes.data || []
  });
}

function renderAdminRows(schedule, teachers, rooms, subjects, students) {
  document.getElementById('newTeacher').value = '';
  document.getElementById('newRoom').value = '';
  document.getElementById('newSubject').value = '';
  const normalizeCatalogValue = (value) => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const findCatalogId = (value, records) => {
    if (!value) return '';
    return records.find((record) =>
      record.id === value || normalizeCatalogValue(record.nombre) === normalizeCatalogValue(value)
    )?.id || '';
  };
  adminRows.innerHTML = schedule.map((item) => {
    const roomName = item.aula || item.salon?.nombre || '';
    const teacherName = item.docente || item.profesor?.nombre || '';
    const roomId = findCatalogId(item.salonId, rooms) || findCatalogId(roomName, rooms);
    const teacherId = findCatalogId(item.profesorId, teachers) || findCatalogId(teacherName, teachers);
    const studentIds = Array.isArray(item.estudianteIds) ? item.estudianteIds : [];
    const studentOptions = students.map((student) => {
      const details = [student.carrera || student.programa, student.semestre].filter(Boolean).join(' · ');
      const label = [student.nombre || student.id, details].filter(Boolean).join(' — ');
      return `<option value="${escapeHTML(student.id)}" ${studentIds.includes(student.id) ? 'selected' : ''}>${escapeHTML(label)}</option>`;
    }).join('');
    return `
    <form class="admin-row grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-6" data-id="${item.id}">
      <div class="md:col-span-2"><label class="field-label">Programa</label><input name="carrera" value="${escapeHTML(item.carrera || item.programa || '')}" class="field-input" /></div>
      <div><label class="field-label">Semestre</label><input name="semestre" value="${item.semestre || ''}" class="field-input" /></div>
      <div><label class="field-label">Salón</label><select name="salonId" required class="field-input">
        <option value="" disabled ${roomId ? '' : 'selected'}>${roomId ? 'Selecciona salón' : `Sin coincidencia: ${escapeHTML(roomName || 'salón')}`}</option>
        ${rooms.map((room) => `<option value="${escapeHTML(room.id)}" ${room.id === roomId ? 'selected' : ''}>${escapeHTML(room.nombre)}</option>`).join('')}
      </select></div>
      <div class="md:col-span-2"><label class="field-label">Docente</label><select name="profesorId" required class="field-input">
        <option value="" disabled ${teacherId ? '' : 'selected'}>${teacherId ? 'Selecciona docente' : `Sin coincidencia: ${escapeHTML(teacherName || 'docente')}`}</option>
        ${teachers.map((teacher) => `<option value="${escapeHTML(teacher.id)}" ${teacher.id === teacherId ? 'selected' : ''}>${escapeHTML(teacher.nombre)}</option>`).join('')}
      </select></div>
      <div><label class="field-label">Desde</label><input name="horaInicio" value="${item.horaInicio || ''}" class="field-input" /></div>
      <div><label class="field-label">Hasta</label><input name="horaFin" value="${item.horaFin || ''}" class="field-input" /></div>
      <div><label class="field-label">Modalidad</label><input name="modalidad" value="${item.modalidad || 'Presencial'}" class="field-input" /></div>
      <div class="md:col-span-3"><label class="field-label">Alumnos vinculados (${studentIds.length})</label><select name="estudianteIds" multiple size="3" aria-label="Alumnos vinculados al horario" class="field-input">${studentOptions}</select><p class="mt-1 text-xs text-slate-500">Usa Ctrl o Cmd para seleccionar varios alumnos.</p></div>
      <div class="flex items-end gap-2"><button class="save-admin flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white">Guardar</button><button type="button" class="delete-admin rounded-xl border border-rose-200 px-3 py-2.5 text-sm font-semibold text-rose-600" title="Eliminar" aria-label="Eliminar horario"><i class="ph ph-trash"></i></button></div>
      <p class="admin-status md:col-span-6 text-sm"></p>
    </form>
  `;
  }).join('');

  adminRows.querySelectorAll('.admin-row').forEach((form) => form.addEventListener('submit', saveAdminRow));
  adminRows.querySelectorAll('.delete-admin').forEach((button) => button.addEventListener('click', () => deleteAdminRow(button.closest('.admin-row'))));
}

async function saveAdminRow(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.estudianteIds = new FormData(form).getAll('estudianteIds');
  const status = form.querySelector('.admin-status');
  const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/horarios/${form.dataset.id}`, { method: 'PATCH', headers: adminHeaders(), body: JSON.stringify(payload) });
  status.textContent = result.success ? 'Cambios guardados' : result.message;
  status.className = `admin-status md:col-span-6 text-sm ${result.success ? 'text-emerald-600' : 'text-rose-600'}`;
  if (result.success) {
    await loadAdminEditor();
    await loadData();
  }
}

async function deleteAdminRow(form) {
  if (!confirm('�Eliminar este horario?')) return;
  const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/horarios/${form.dataset.id}`, { method: 'DELETE', headers: adminHeaders() });
  await loadAdminEditor();
  await loadData();
}

async function createAdminRow(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(createScheduleForm).entries());
  const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/horarios`, { method: 'POST', headers: adminHeaders(), body: JSON.stringify(payload) });
  createScheduleMessage.textContent = result.success ? 'Horario creado correctamente.' : result.message;
  createScheduleMessage.className = `text-sm md:col-span-6 ${result.success ? 'text-emerald-600' : 'text-rose-600'}`;
  if (result.success) {
    createScheduleForm.reset();
    createScheduleForm.classList.add('hidden');
    await loadAdminEditor();
    await loadData();
  }
}

searchInput.addEventListener('input', scheduleSearch);
cardsContainer.addEventListener('change', (event) => {
  if (event.target.id !== 'verTodosCheck') return;
  verTodos = event.target.checked;
  render();
});
document.addEventListener('click', (event) => {
  const button = event.target.closest('.franja-btn');
  if (!button) return;
  franjaSeleccionada = button.dataset.franja;
  document.querySelectorAll('.franja-btn').forEach((item) => item.classList.toggle('active', item === button));
  render();
});

adminTabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.adminTab;
    adminTabButtons.forEach((tab) => tab.classList.toggle('active', tab === button));
    const panelId = {
      schedules: 'adminSchedulesTab',
      profesores: 'adminProfesoresTab',
      salones: 'adminSalonesTab',
      materias: 'adminMateriasTab',
      estudiantes: 'adminEstudiantesTab',
      members: 'adminMembersTab',
      tools: 'adminToolsTab'
    }[target] || 'adminToolsTab';
    adminTabPanels.forEach((panel) => panel.classList.toggle('hidden', panel.id !== panelId));
  });
});

if (openMemberFormButton) {
  openMemberFormButton.addEventListener('click', () => {
    document.querySelector('[data-admin-tab="members"]').click();
    document.getElementById('memberName').focus();
  });
}

if (memberForm) {
  memberForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(memberForm).entries());
    const members = getStoredMembers();
    const memberId = memberForm.dataset.memberId || `member-${Date.now()}`;
    const nextMembers = memberForm.dataset.memberId
      ? members.map((member) => member.id === memberId ? { ...member, ...payload, id: memberId } : member)
      : [...members, { ...payload, id: memberId }];

    saveStoredMembers(nextMembers);
    renderMemberTable();
    memberForm.reset();
    delete memberForm.dataset.memberId;
    memberForm.querySelector('button[type="submit"]').textContent = 'Guardar miembro';
    importStatus.textContent = 'Miembro guardado correctamente.';
  });
}

if (excelImportInput) {
  excelImportInput.addEventListener('change', importExcelFile);
}

if (document.getElementById('exportScheduleButton')) {
  document.getElementById('exportScheduleButton').addEventListener('click', () => exportAdminExcel('horarios'));
}

if (document.getElementById('exportMembersButton')) {
  document.getElementById('exportMembersButton').addEventListener('click', () => exportAdminExcel('miembros'));
  document.getElementById('exportMembersButtonSecondary').addEventListener('click', () => exportAdminExcel('miembros'));
  document.getElementById('exportMembersOnlyButton').addEventListener('click', () => exportAdminExcel('miembros'));
}
searchInput.addEventListener('focus', () => {
  if (!searchInput.value.trim()) renderSearchHistory();
});
programSearch.addEventListener('input', scheduleSearch);
timeSearch.addEventListener('input', scheduleSearch);
dateSearch.addEventListener('input', scheduleSearch);
searchButton.addEventListener('click', () => {
  searchInput.focus();
  runSearch();
});
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    runSearch();
  }
});
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  programSearch.value = '';
  timeSearch.value = '';
  dateSearch.value = '';
  render();
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('#searchInput') && !event.target.closest('#searchHistory')) searchHistory.classList.add('hidden');
});
document.querySelectorAll('[data-program]').forEach((chip) => {
  chip.addEventListener('click', () => {
    programSearch.value = chip.dataset.program;
    runSearch();
  });
});
dayFilter?.addEventListener('change', render);
semesterFilter?.addEventListener('change', render);
careerFilter?.addEventListener('change', render);
roomFilter?.addEventListener('change', render);
closeModal.addEventListener('click', closeModalView);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModalView();
});
adminButton.addEventListener('click', openAdmin);
closeAdmin.addEventListener('click', () => adminPanel.classList.add('hidden'));
document.getElementById('adminLoginButton').addEventListener('click', () => adminLoginRequest().catch((error) => { adminLoginMessage.textContent = error.message; }));
document.getElementById('adminLogout').addEventListener('click', () => { adminToken = ''; sessionStorage.removeItem('academic_admin_token'); adminEditor.classList.add('hidden'); adminLogin.classList.remove('hidden'); });
createScheduleButton.addEventListener('click', () => createScheduleForm.classList.toggle('hidden'));
createScheduleForm.addEventListener('submit', (event) => createAdminRow(event).catch((error) => { createScheduleMessage.textContent = error.message; }));
clearFavorites.addEventListener('click', () => {
  localStorage.removeItem(FAVORITES_KEY);
  renderFavorites();
  render();
});
languageToggle.addEventListener('click', switchLanguage);
aboutButton.addEventListener('click', openAbout);
closeAboutButton.addEventListener('click', closeAbout);
closeAboutFooter.addEventListener('click', closeAbout);
aboutModal.addEventListener('click', (event) => { if (event.target === aboutModal) closeAbout(); });

chatButton.addEventListener('click', () => { chatPanel.classList.add('is-open'); chatInput.focus(); });
closeChatButton.addEventListener('click', () => chatPanel.classList.remove('is-open'));
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (question) askChatbot(question);
});

if ('Notification' in window) {
  notificationButton.classList.toggle('hidden', localStorage.getItem('elyon-yireh-notifications') === 'enabled');
  notificationButton.addEventListener('click', enableNotifications);
  setInterval(checkScheduleUpdates, 30 * 60 * 1000);
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.classList.remove('hidden');
});
installButton.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.classList.add('hidden');
});

document.querySelectorAll('.tab-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;
    state.selectedView = view;

    document.querySelectorAll('.tab-btn').forEach((tab) => {
      tab.classList.toggle('active', tab === button);
      tab.classList.toggle('text-white', tab === button);
      tab.classList.toggle('text-slate-300', tab !== button);
    });

    document.querySelectorAll('.view-panel').forEach((panel) => {
      panel.classList.toggle('hidden', panel.id !== `${view}View`);
    });
  });
});

document.querySelectorAll('.bottom-nav-item').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(`.tab-btn[data-view="${button.dataset.view}"]`);
    if (target) target.click();
    document.querySelectorAll('.bottom-nav-item').forEach((item) => item.classList.toggle('active', item === button));
  });
});

myScheduleBtn.addEventListener('click', async () => {
  try {
    const data = await fetchJson(`${API_BASE_URL}/api/v1/estudiante/${state.studentId}/horario`);

    state.allSchedule = data.data.horario || [];
    render();
    document.querySelector('[data-view="tarjetas"]').click();
  } catch (error) {
    alert(error.message);
  }
});

loadData().catch((error) => {
  cardsContainer.innerHTML = '<div class="glass rounded-3xl p-6 text-rose-600">No se pudo conectar con el servidor. Verifica tu conexi�n a internet.</div>';
  forceRefreshButton.classList.remove('hidden');
});
cargarCorte6();

if (pwaSplash && window.matchMedia('(display-mode: standalone)').matches) {
  setTimeout(() => pwaSplash.classList.add('is-hidden'), 1500);
}

applyLanguage();
