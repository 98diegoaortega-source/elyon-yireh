const API_BASE_URL = 'https://elyon-yireh-production.up.railway.app';
const dayOrder = ['Corte 5'];

const state = {
  allSchedule: [],
  allTeachers: [],
  selectedView: 'tarjetas',
  studentId: 'est-101'
};

const searchInput = document.getElementById('searchInput');
const dayFilter = document.getElementById('dayFilter');
const semesterFilter = document.getElementById('semesterFilter');
const careerFilter = document.getElementById('careerFilter');
const roomFilter = document.getElementById('roomFilter');
const cardsContainer = document.getElementById('cardsContainer');
const teachersContainer = document.getElementById('teachersContainer');
const calendarContainer = document.getElementById('calendarContainer');
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
const createScheduleForm = document.getElementById('createScheduleForm');
const createScheduleMessage = document.getElementById('createScheduleMessage');
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
const HISTORY_KEY = 'elyon-yireh-search-history';
let adminToken = sessionStorage.getItem('academic_admin_token') || '';
let searchDebounce;
let isLoading = false;

async function fetchJson(url, options = {}) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.signal ? 30000 : 30000);
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    const contentType = response.headers.get('content-type') || '';
    const result = contentType.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      throw new Error(result?.message || `Error HTTP ${response.status}`);
    }

    if (!contentType.includes('application/json')) {
      throw new Error('El servidor no devolvió una respuesta JSON válida');
    }

    return result;
  } catch (error) {
    console.error(`Error consultando ${url}:`, error);
    const friendlyError = new Error(error.name === 'AbortError'
      ? 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
      : 'No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    friendlyError.cause = error;
    throw friendlyError;
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
    render();
  } finally {
    clearTimeout(slowMessage);
    setLoading(false);
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
  statistics.textContent = `${data.profesores} profesores · ${data.horarios} horarios · ${data.programas} programas`;
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

function matchesSearch(item, query) {
  if (!query) return true;

  const text = [
    item.materia?.nombre,
    item.materia?.programa,
    item.profesor?.nombre,
    item.salon?.nombre,
    item.carrera,
    item.semestre,
    item.modalidad,
    item.fecha,
    item.dia,
    item.horaInicio,
    item.horaFin
  ].join(' ');

  const normalizedText = normalize(text);
  const ignoredWords = new Set(['busco', 'buscar', 'el', 'la', 'los', 'las', 'de', 'del', 'un', 'una', 'por', 'programa', 'programas', 'docente', 'profesor', 'profesora', 'horario', 'horarios']);
  const searchTerms = normalize(query).split(/\s+/).filter((term) => term && !ignoredWords.has(term));

  if (normalize(query).includes('horario')) return true;

  if (!searchTerms.length) return true;

  return searchTerms.every((term) => normalizedText.includes(term));
}

function getFilteredSchedule() {
  const search = searchInput.value.trim();
  const program = programSearch.value;
  const time = timeSearch.value;
  const date = dateSearch.value.trim();
  const day = dayFilter?.value || '';
  const semester = semesterFilter?.value || '';
  const career = careerFilter?.value || '';
  const room = roomFilter?.value || '';

  return state.allSchedule.filter((item) => {
    const matchesDay = !day || item.dia === day;
    const matchesSemester = !semester || item.semestre === semester;
    const matchesCareer = !career || item.carrera === career;
    const matchesRoom = !room || item.salon?.nombre === room;
    const matchesSearchValue = matchesSearch(item, search);
    const matchesProgram = !program || normalize(item.carrera).includes(normalize(program));
    const requestedTimes = normalize(time).match(/\d{1,2}:\d{2}/g) || [];
    const itemTimes = `${item.horaInicio} ${item.horaFin}`.match(/\d{2}:\d{2}/g) || [];
    const matchesTime = !time || requestedTimes.every((requested) => itemTimes.some((available) => available.replace(/^0/, '') === requested.replace(/^0/, '')));
    const matchesDate = !date || normalize(item.fecha).includes(normalize(date));

    return matchesDay && matchesSemester && matchesCareer && matchesRoom && matchesSearchValue && matchesProgram && matchesTime && matchesDate;
  });
}

function renderCards(items) {
  const query = searchInput.value.trim();
  const hasSearch = Boolean(query || programSearch.value.trim() || timeSearch.value.trim() || dateSearch.value.trim());

  if (!hasSearch) {
    resultCount.textContent = '';
    cardsContainer.innerHTML = `
      <div class="rounded-3xl border border-dashed border-blue-200 bg-blue-50/60 p-10 text-center">
        <i class="ph ph-magnifying-glass mb-3 text-4xl text-blue-500"></i>
        <h3 class="text-lg font-bold text-slate-900">¿Qué deseas consultar?</h3>
        <p class="mt-2 text-sm text-slate-500">Escribe un programa, docente, salón, horario o fecha para ver los resultados.</p>
      </div>
    `;
    return;
  }

  resultCount.textContent = `${items.length} resultado${items.length === 1 ? '' : 's'}`;

  if (!items.length) {
    cardsContainer.innerHTML = `
      <div class="glass col-span-full rounded-3xl p-12 text-center">
        <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-300">
          <i class="ph ph-magnifying-glass text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-slate-900">No encontramos coincidencias</h3>
        <p class="mt-2 text-sm text-slate-500">Prueba con otro programa, docente, semestre o salón.</p>
      </div>
    `;
    return;
  }

  cardsContainer.innerHTML = `
    ${query ? `<div class="col-span-full mb-1 text-sm text-slate-500"><strong class="text-slate-900">${items.length}</strong> resultado(s) para <strong class="text-blue-600">${query}</strong></div>` : ''}
    ${items
    .map((item) => {
      const teacherInitials = item.profesor?.foto || 'PR';
      const accentClass = item.materia?.color || 'from-slate-500 to-slate-700';

      return `
        <article class="glass result-card rounded-3xl p-5">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div class="rounded-2xl bg-gradient-to-br ${accentClass} p-3 text-sm font-bold text-white shadow-lg">
              CORTE 5
            </div>
            <button class="rounded-full border border-slate-700 bg-slate-900/50 px-2.5 py-1 text-xs text-slate-300" data-open="${item.id}">
              Ver detalles
            </button>
          </div>

          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
            <i class="ph ph-books"></i> ${item.carrera || item.materia?.programa || 'Programa'}
          </div>
          <h3 class="mb-1 text-xl font-semibold text-slate-900">${item.carrera || item.materia?.programa || 'Programa académico'}</h3>
          <p class="mb-3 text-sm text-slate-400">${item.semestre || 'Semestre'} · ${item.modalidad || 'Presencial'}</p>

          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${item.profesor?.color || 'from-cyan-500 to-indigo-500'} text-sm font-bold text-white">
              ${teacherInitials}
            </div>
            <div>
              <p class="font-medium text-slate-900">${item.profesor?.nombre || 'Profesor'}</p>
              <p class="text-xs text-slate-400">Semestre: ${item.semestre || 'Por definir'}</p>
            </div>
          </div>

          <div class="space-y-2 text-sm text-slate-300">
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">Horario</span>
              <strong class="text-right text-slate-900">${item.horaInicio} - ${item.horaFin}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">Fecha</span>
              <strong class="text-right text-slate-900">${item.fecha || 'Por confirmar'}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">Salón</span>
              <strong class="text-slate-900">${item.salon?.nombre || 'Por asignar'}</strong>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-400">Modalidad</span>
              <strong class="text-slate-900">${item.modalidad || 'Presencial'}</strong>
            </div>
          </div>

          <button type="button" class="share-whatsapp mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-700" data-share="${item.id}">
            <i class="ph ph-whatsapp-logo"></i> Compartir
          </button>
        </article>
      `;
    })
    .join('')}
  `;

  cardsContainer.querySelectorAll('[data-open]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.open));
  });
  cardsContainer.querySelectorAll('[data-share]').forEach((button) => {
    button.addEventListener('click', () => shareSchedule(button.dataset.share));
  });
}

function shareSchedule(itemId) {
  const item = state.allSchedule.find((entry) => entry.id === itemId);
  if (!item) return;
  const detail = `${item.profesor?.nombre || 'Docente'} - ${item.materia?.nombre || 'Materia'} - ${item.horaInicio} - ${item.horaFin}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(`Consulta en ELYON YIREH: ${detail}`)}`, '_blank', 'noopener,noreferrer');
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

function renderCalendar(items) {
  const days = dayOrder.map((day) => ({ day, items: items.filter((item) => item.dia === day) }));

  calendarContainer.innerHTML = days
    .map((dayData) => {
      return `
        <div class="day-column glass rounded-2xl p-3">
          <div class="mb-3 text-center text-sm font-semibold text-slate-200">${dayData.day}</div>
          <div class="space-y-3">
            ${dayData.items.length ? dayData.items.map((item) => {
              const accentClass = item.materia?.color || 'from-slate-500 to-slate-700';
              return `
                <div class="class-block rounded-2xl bg-gradient-to-br ${accentClass} p-3 text-left text-white shadow-lg" data-open="${item.id}">
                  <div class="text-[11px] uppercase tracking-[0.14em] text-white/80">${item.carrera || item.materia?.programa || 'Programa'}</div>
                  <div class="mt-2 text-sm font-semibold">${item.salon?.nombre}</div>
                  <div class="mt-2 text-xs text-white/80">${item.horaInicio} - ${item.horaFin}</div>
                  <div class="mt-1 text-xs text-white/80">${item.salon?.nombre}</div>
                </div>
              `;
            }).join('') : '<div class="rounded-xl border border-dashed border-slate-700 p-3 text-center text-xs text-slate-400">Libre</div>'}
          </div>
        </div>
      `;
    })
    .join('');

  calendarContainer.querySelectorAll('[data-open]').forEach((block) => {
    block.addEventListener('click', () => openModal(block.dataset.open));
  });
}

function render() {
  const filtered = getFilteredSchedule();
  renderCards(filtered);
  renderCalendar(filtered);
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
          <div class="text-sm text-slate-400">${item.carrera || item.materia?.programa || 'Programa académico'}</div>
          <div class="text-lg font-semibold text-slate-900">${item.profesor?.nombre}</div>
        </div>
      </div>

      <div class="mb-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-sm text-cyan-100">
        <div class="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Programa</div>
        <div class="mt-1 font-semibold">${item.carrera || item.materia?.programa || 'Por definir'} · ${item.semestre || 'Semestre por definir'}</div>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div class="text-[10px] uppercase tracking-[0.18em] text-slate-400">Día y horario</div>
          <div class="mt-2 font-semibold text-slate-900">${item.horaInicio} - ${item.horaFin}</div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div class="text-[10px] uppercase tracking-[0.18em] text-slate-400">Salón</div>
          <div class="mt-2 font-semibold text-slate-900">${item.salon?.nombre} · ${item.salon?.edificio}</div>
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
      <div class="mb-2 flex items-center justify-between"><span class="text-slate-500">Teléfono</span><strong class="text-slate-900">${item.profesor?.telefono}</strong></div>
      <div class="mb-2 flex items-center justify-between"><span class="text-slate-500">Oficina</span><strong class="text-slate-900">${item.profesor?.oficina}</strong></div>
      <div class="flex items-center justify-between"><span class="text-slate-500">Atención</span><strong class="text-slate-900">${item.profesor?.horarioAtencion}</strong></div>
    </div>
  `;
}

function openModal(itemId) {
  const item = state.allSchedule.find((entry) => entry.id === itemId);

  if (!item) return;

  modalTitle.textContent = `${item.carrera || item.materia?.programa || 'Programa académico'} · ${item.semestre || 'Semestre'}`;
  modalContent.innerHTML = buildModalContent(item);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModalView() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function openAdmin() {
  adminPanel.classList.remove('hidden');
  if (adminToken) loadAdminEditor();
}

function adminHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` };
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
  const [scheduleRes, teachersRes, roomsRes, subjectsRes] = await Promise.all([
    fetchJson(`${API_BASE_URL}/api/v1/admin/horarios`, { headers: adminHeaders() }),
    fetchJson(`${API_BASE_URL}/api/v1/profesores`),
    fetchJson(`${API_BASE_URL}/api/v1/salones`),
    fetchJson(`${API_BASE_URL}/api/v1/materias`)
  ]);

  if (!scheduleRes.success) throw new Error(scheduleRes.message || 'No se pudo cargar el panel');
  adminLogin.classList.add('hidden');
  adminEditor.classList.remove('hidden');
  renderAdminRows(scheduleRes.data, teachersRes.data, roomsRes.data, subjectsRes.data);
}

function renderAdminRows(schedule, teachers, rooms, subjects) {
  document.getElementById('newTeacher').innerHTML = teachers.map((teacher) => `<option value="${teacher.id}">${teacher.nombre}</option>`).join('');
  document.getElementById('newRoom').innerHTML = rooms.map((room) => `<option value="${room.id}">${room.nombre}</option>`).join('');
  document.getElementById('newSubject').innerHTML = subjects.map((subject) => `<option value="${subject.id}">${subject.programa}</option>`).join('');
  adminRows.innerHTML = schedule.map((item) => `
    <form class="admin-row grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-6" data-id="${item.id}">
      <div class="md:col-span-2"><label class="field-label">Programa</label><input name="carrera" value="${item.carrera}" class="field-input" /></div>
      <div><label class="field-label">Semestre</label><input name="semestre" value="${item.semestre}" class="field-input" /></div>
      <div><label class="field-label">Salón</label><select name="salonId" class="field-input">${rooms.map((room) => `<option value="${room.id}" ${room.id === item.salonId ? 'selected' : ''}>${room.nombre}</option>`).join('')}</select></div>
      <div class="md:col-span-2"><label class="field-label">Docente</label><select name="profesorId" class="field-input">${teachers.map((teacher) => `<option value="${teacher.id}" ${teacher.id === item.profesorId ? 'selected' : ''}>${teacher.nombre}</option>`).join('')}</select></div>
      <div><label class="field-label">Desde</label><input name="horaInicio" value="${item.horaInicio}" class="field-input" /></div>
      <div><label class="field-label">Hasta</label><input name="horaFin" value="${item.horaFin}" class="field-input" /></div>
      <div><label class="field-label">Modalidad</label><select name="modalidad" class="field-input"><option ${item.modalidad === 'Presencial' ? 'selected' : ''}>Presencial</option><option ${item.modalidad === 'Intensiva' ? 'selected' : ''}>Intensiva</option><option>Virtual</option></select></div>
      <div class="flex items-end gap-2"><button class="save-admin flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white">Guardar</button><button type="button" class="delete-admin rounded-xl border border-rose-200 px-3 py-2.5 text-sm font-semibold text-rose-600" title="Eliminar"><i class="ph ph-trash"></i></button></div>
      <p class="admin-status md:col-span-6 text-sm"></p>
    </form>
  `).join('');

  adminRows.querySelectorAll('.admin-row').forEach((form) => form.addEventListener('submit', saveAdminRow));
  adminRows.querySelectorAll('.delete-admin').forEach((button) => button.addEventListener('click', () => deleteAdminRow(button.closest('.admin-row'))));
}

async function saveAdminRow(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());
  const status = form.querySelector('.admin-status');
  const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/horarios/${form.dataset.id}`, { method: 'PATCH', headers: adminHeaders(), body: JSON.stringify(payload) });
  status.textContent = result.success ? 'Cambios guardados' : result.message;
  status.className = `admin-status md:col-span-6 text-sm ${result.success ? 'text-emerald-600' : 'text-rose-600'}`;
  if (result.success) loadData();
}

async function deleteAdminRow(form) {
  if (!confirm('¿Eliminar este horario?')) return;
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
  cardsContainer.innerHTML = '<div class="glass rounded-3xl p-6 text-rose-600">No se pudo conectar con el servidor. Verifica tu conexión a internet.</div>';
  forceRefreshButton.classList.remove('hidden');
});

if (pwaSplash && window.matchMedia('(display-mode: standalone)').matches) {
  setTimeout(() => pwaSplash.classList.add('is-hidden'), 1500);
}
