# Academic Pulse

Aplicación web académica para consultar en qué materia, profesor, salón y horario tiene cada estudiante.

## Requisitos

- Node.js 18+
- VS Code
- Navegador moderno

## Instalación

1. Abre la carpeta del proyecto en VS Code.
2. En la terminal ejecuta:

```bash
cd "c:\Users\Calidad\Desktop\api mensaje"
cd backend
npm install
```

3. Inicia el servidor:

```bash
npm start
```

4. Abre en el navegador:

```text
http://localhost:4000
```

## Funcionalidades

- Búsqueda por profesor, materia o salón
- Filtro por día, semestre, carrera y salón
- Vista de tarjetas con detalle expandible
- Vista de calendario semanal
- Información de contacto del profesor
- Botón para ver el horario completo del estudiante

## Endpoints

- GET /api/v1/health
- GET /api/v1/profesores
- GET /api/v1/profesores/:id
- GET /api/v1/materias
- GET /api/v1/materias/:id
- GET /api/v1/horarios
- GET /api/v1/horarios?dia=lunes
- GET /api/v1/horarios?salon=302
- GET /api/v1/buscar?q=texto
- GET /api/v1/estudiante/:id/horario

## Depuración

En VS Code presiona F5 y usa la configuración de launch creada en `.vscode/launch.json`.

## Datos de ejemplo

La app incluye profesores, materias, salones y horarios simulados listos para usarse en entorno demo.
