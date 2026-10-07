const ADMIN_ENTITY_PAGE_SIZE = 50;
const ADMIN_ENTITY_DATA = { profesores: [], salones: [], materias: [], estudiantes: [] };
const ADMIN_ENTITY_PAGE = new Map();
let adminEntityToastTimer;

const ADMIN_ENTITY_CONFIG = {
  profesores: {
    label: 'docente',
    fields: [
      { key: 'nombre', label: 'Nombre', required: true },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'telefono', label: 'Teléfono' },
      { key: 'departamento', label: 'Departamento' },
      { key: 'oficina', label: 'Oficina' },
      { key: 'horarioAtencion', label: 'Horario de atención' }
    ]
  },
  salones: {
    label: 'salón',
    fields: [
      { key: 'nombre', label: 'Nombre', required: true },
      { key: 'capacidad', label: 'Capacidad', type: 'number', min: '1' },
      { key: 'ubicacion', label: 'Ubicación' }
    ]
  },
  materias: {
    label: 'materia',
    fields: [
      { key: 'nombre', label: 'Nombre', required: true },
      { key: 'codigo', label: 'Código', required: true },
      { key: 'programa', label: 'Programa', required: true },
      { key: 'departamento', label: 'Departamento', required: true }
    ]
  },
  estudiantes: {
    label: 'estudiante',
    fields: [
      { key: 'nombre', label: 'Nombre', required: true },
      { key: 'cedula', label: 'Cédula', required: true },
      { key: 'programa', label: 'Programa', required: true },
      { key: 'semestre', label: 'Semestre', required: true },
      { key: 'email', label: 'Email', type: 'email' }
    ]
  }
};

function getAdminEntityValue(type, record, key) {
  if (key === 'ubicacion') return record.ubicacion ?? record.edificio ?? '';
  if (key === 'programa') return record.programa ?? record.carrera ?? '';
  return record[key] ?? '';
}

function normalizeAdminSearch(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function createEntityAction(type, record, action, icon, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'rounded-lg border border-slate-200 px-2 py-1 text-sm hover:bg-slate-100';
  button.textContent = icon;
  button.title = `${label} ${record.nombre || ''}`;
  button.setAttribute('aria-label', `${label} ${record.nombre || ''}`);
  button.dataset.entityAction = action;
  button.dataset.entityType = type;
  button.dataset.entityId = record.id;
  return button;
}

function renderAdminEntity(type) {
  const config = ADMIN_ENTITY_CONFIG[type];
  const tableContainer = document.querySelector(`[data-entity-table="${type}"]`);
  const pagination = document.querySelector(`[data-entity-pagination="${type}"]`);
  const search = document.querySelector(`[data-entity-search="${type}"]`);
  const query = normalizeAdminSearch(search.value);
  const records = ADMIN_ENTITY_DATA[type].filter((record) =>
    [record.id, ...config.fields.map(({ key }) => getAdminEntityValue(type, record, key))]
      .some((value) => normalizeAdminSearch(value).includes(query))
  );
  const pageCount = Math.max(1, Math.ceil(records.length / ADMIN_ENTITY_PAGE_SIZE));
  const page = Math.min(ADMIN_ENTITY_PAGE.get(type) || 1, pageCount);
  ADMIN_ENTITY_PAGE.set(type, page);
  const pageRecords = records.slice((page - 1) * ADMIN_ENTITY_PAGE_SIZE, page * ADMIN_ENTITY_PAGE_SIZE);
  const table = document.createElement('table');
  table.className = 'w-full min-w-[720px] border-collapse text-left text-sm';
  const head = document.createElement('thead');
  const headerRow = document.createElement('tr');
  [...config.fields.map(({ label }) => label), 'Acciones'].forEach((label) => {
    const cell = document.createElement('th');
    cell.className = 'border-b border-slate-200 px-3 py-2 font-semibold text-slate-600';
    cell.textContent = label;
    headerRow.append(cell);
  });
  head.append(headerRow);
  table.append(head);
  const body = document.createElement('tbody');
  if (!pageRecords.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = config.fields.length + 1;
    cell.className = 'px-3 py-6 text-center text-slate-500';
    cell.textContent = 'No hay registros para mostrar.';
    row.append(cell);
    body.append(row);
  }
  pageRecords.forEach((record) => {
    const row = document.createElement('tr');
    row.className = 'border-b border-slate-100';
    config.fields.forEach(({ key }) => {
      const cell = document.createElement('td');
      cell.className = 'px-3 py-2 text-slate-700';
      cell.textContent = String(getAdminEntityValue(type, record, key));
      row.append(cell);
    });
    const actions = document.createElement('td');
    actions.className = 'whitespace-nowrap px-3 py-2';
    actions.append(
      createEntityAction(type, record, 'view', '👁️', 'Ver'),
      createEntityAction(type, record, 'edit', '✏️', 'Editar'),
      createEntityAction(type, record, 'delete', '🗑️', 'Eliminar')
    );
    row.append(actions);
    body.append(row);
  });
  table.append(body);
  tableContainer.replaceChildren(table);

  pagination.replaceChildren();
  const summary = document.createElement('span');
  summary.className = 'mr-auto self-center text-sm text-slate-500';
  summary.textContent = `${records.length} registros · Página ${page} de ${pageCount}`;
  pagination.append(summary);
  if (pageCount > 1) {
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.textContent = 'Anterior';
    previous.setAttribute('aria-label', 'Página anterior');
    previous.disabled = page === 1;
    previous.addEventListener('click', () => {
      ADMIN_ENTITY_PAGE.set(type, page - 1);
      renderAdminEntity(type);
    });
    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = 'Siguiente';
    next.setAttribute('aria-label', 'Página siguiente');
    next.disabled = page === pageCount;
    next.addEventListener('click', () => {
      ADMIN_ENTITY_PAGE.set(type, page + 1);
      renderAdminEntity(type);
    });
    pagination.append(previous, next);
  }
}

window.renderAdminEntities = (entities) => {
  Object.keys(ADMIN_ENTITY_DATA).forEach((type) => {
    ADMIN_ENTITY_DATA[type] = entities[type] || [];
    renderAdminEntity(type);
  });
};

function showAdminEntityToast(message, isError = false) {
  const toast = document.getElementById('adminToast');
  toast.textContent = message;
  toast.className = `fixed bottom-4 right-4 z-[60] rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${isError ? 'bg-rose-700' : 'bg-emerald-700'}`;
  clearTimeout(adminEntityToastTimer);
  adminEntityToastTimer = setTimeout(() => toast.classList.add('hidden'), 4500);
}

function openAdminEntityModal(type, id, readOnly = false) {
  const config = ADMIN_ENTITY_CONFIG[type];
  const record = id ? ADMIN_ENTITY_DATA[type].find((item) => item.id === id) : null;
  if (id && !record) return showAdminEntityToast('No se encontró el registro seleccionado.', true);
  modalTitle.textContent = `${readOnly ? 'Ver' : id ? 'Editar' : 'Nuevo'} ${config.label}`;
  const form = document.createElement('form');
  form.className = 'grid gap-3 md:grid-cols-2';
  config.fields.forEach((field) => {
    const label = document.createElement('label');
    label.className = 'grid gap-1 text-sm font-medium text-slate-700';
    const caption = document.createElement('span');
    caption.textContent = field.label;
    const input = document.createElement('input');
    input.className = 'field-input';
    input.name = field.key;
    input.type = field.type || 'text';
    input.value = String(record ? getAdminEntityValue(type, record, field.key) : '');
    input.required = Boolean(field.required);
    input.disabled = readOnly;
    if (field.min) input.min = field.min;
    label.append(caption, input);
    form.append(label);
  });
  if (!readOnly) {
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white md:col-span-2';
    submit.textContent = id ? 'Guardar cambios' : 'Crear registro';
    form.append(submit);
    form.addEventListener('submit', (event) => saveAdminEntity(event, type, id));
  }
  modalContent.replaceChildren(form);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

async function refreshAdminEntityViews() {
  try {
    await loadAdminEditor();
    await loadData();
  } catch (error) {
    showAdminEntityToast(`El cambio se guardó, pero no se pudo actualizar la vista: ${error.message}`, true);
  }
}

async function saveAdminEntity(event, type, id) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
  try {
    const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/${type}${id ? `/${encodeURIComponent(id)}` : ''}`, {
      method: id ? 'PATCH' : 'POST',
      headers: adminHeaders(),
      body: JSON.stringify(payload)
    });
    if (!result.success) throw new Error(result.message || 'No se pudo guardar el registro.');
  } catch (error) {
    showAdminEntityToast(error.message, true);
    return;
  }
  closeModalView();
  showAdminEntityToast(`${ADMIN_ENTITY_CONFIG[type].label} guardado correctamente.`);
  await refreshAdminEntityViews();
}

async function deleteAdminEntity(type, id) {
  const record = ADMIN_ENTITY_DATA[type].find((item) => item.id === id);
  if (!record || !confirm(`¿Eliminar ${ADMIN_ENTITY_CONFIG[type].label} «${record.nombre}»?`)) return;
  try {
    const result = await fetchJson(`${API_BASE_URL}/api/v1/admin/${type}/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: adminHeaders()
    });
    if (!result.success) throw new Error(result.message || 'No se pudo eliminar el registro.');
  } catch (error) {
    showAdminEntityToast(error.message, true);
    return;
  }
  showAdminEntityToast(`${ADMIN_ENTITY_CONFIG[type].label} eliminado correctamente.`);
  await refreshAdminEntityViews();
}

function csvCell(value) {
  let text = String(value ?? '');
  // Evita que Excel interprete como fórmula un dato exportado.
  if (/^[\t\r ]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function exportAdminEntityCSV(type) {
  const config = ADMIN_ENTITY_CONFIG[type];
  const columns = [{ key: 'id', label: 'ID' }, ...config.fields];
  const rows = [
    columns.map((column) => csvCell(column.label)).join(','),
    ...ADMIN_ENTITY_DATA[type].map((record) =>
      columns.map((column) => csvCell(column.key === 'id' ? record.id : getAdminEntityValue(type, record, column.key))).join(',')
    )
  ];
  const blob = new Blob([`\uFEFF${rows.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `elyon-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll('[data-entity-search]').forEach((input) => {
  input.addEventListener('input', () => {
    ADMIN_ENTITY_PAGE.set(input.dataset.entitySearch, 1);
    renderAdminEntity(input.dataset.entitySearch);
  });
});
document.querySelectorAll('[data-entity-create]').forEach((button) => {
  button.addEventListener('click', () => openAdminEntityModal(button.dataset.entityCreate));
});
document.querySelectorAll('[data-entity-export]').forEach((button) => {
  button.addEventListener('click', () => exportAdminEntityCSV(button.dataset.entityExport));
});
document.querySelectorAll('[data-entity-table]').forEach((container) => {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-entity-action]');
    if (!button || !container.contains(button)) return;
    const { entityAction, entityType, entityId } = button.dataset;
    if (entityAction === 'view') openAdminEntityModal(entityType, entityId, true);
    if (entityAction === 'edit') openAdminEntityModal(entityType, entityId);
    if (entityAction === 'delete') deleteAdminEntity(entityType, entityId);
  });
});
