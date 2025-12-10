# 🎥 Web Scraper con Playwright + SQLite + Node.js

Este proyecto extrae información de la página
https://www.uskokrum2010.com/public/index y guarda los resultados en una base de datos SQLite.

## Datos que extrae
- Imagen del vídeo
- Título
- Descripción
- URL completa del vídeo de YouTube

## Requisitos
- Node.js >= 18 (probado con Node 20)
- npm o yarn
- macOS / Linux / Windows

> Nota sobre macOS: algunos binarios de Chromium descargados por Playwright requieren macOS 12+; si ves errores al lanzar Chromium (símbolos faltantes), instala los navegadores con Playwright o utiliza el Chrome/Chromium del sistema mediante `executablePath` (ver Troubleshooting).

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repo>
cd <carpeta-del-proyecto>
```

2. Instala dependencias:

```bash
npm install
```

3. (Recomendado) instala los navegadores de Playwright:

```bash
npx playwright install --with-deps
```

## Scripts útiles

- `npm start` — ejecuta `node app.mjs` (arranca el scraper).
- `npm test` — ejecuta `playwright test` (si tienes tests configurados).

## Uso

Ejecuta el scraper con:

```bash
npm start
```

El script crea o actualiza `videos.db` en la raíz del proyecto con los registros recogidos.

## Estructura mínima del proyecto

- `app.mjs` — script principal que controla Playwright y persiste en SQLite.
- `videos.db` — archivo SQLite generado por el script (no está versionado por defecto).
- `package.json` — dependencias y scripts.

## Troubleshooting (errores comunes)

- Error dyld / "Symbol not found" al lanzar Chromium en macOS: indica que el binario descargado requiere una versión de macOS superior a la instalada. Opciones:
  - Ejecutar `npx playwright install --with-deps` para reinstalar navegadores compatibles.
  - Usar el Chrome/Chromium del sistema editando `app.mjs` y pasando `executablePath` al lanzar el navegador. Ejemplo:

```js
// import { chromium } from 'playwright';
// chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
```

  - Actualizar macOS si es viable.

## Visualizar la base de datos

Puedes abrir `videos.db` con extensiones de VSCode como `sqlite-viewer` o con la CLI:

```bash
sqlite3 videos.db
```

## Contribuir

- Abre un issue si encuentras problemas.
- Para PRs, añade descripciones claras y commits pequeños.


Toda la información se guarda en una base de datos **SQLite**, ideal para proyectos pequeños, portátiles y sin servidor.

---

## 📌 ¿Qué es SQLite?

SQLite es una base de datos **muy ligera** que:

- No necesita servidor.
- Guarda toda la información en un solo archivo (`videos.db`).
- Es utilizada por Chrome, Firefox, VSCode, Android, iOS, Discord, etc.

Perfecta para scripts de scraping y automatización.

---

