# 🎥 Web Scraper con Playwright + SQLite + Node.js

Este proyecto realiza scraping sobre la página  
**https://www.uskokrum2010.com/public/index**, extrayendo:

- 🖼️ **Imagen del vídeo**
- 📝 **Título**
- 📄 **Descripción**
- 🔗 **URL completa del vídeo de YouTube**

Toda la información se guarda en una base de datos **SQLite**, ideal para proyectos pequeños, portátiles y sin servidor.

---

## 📌 ¿Qué es SQLite?

SQLite es una base de datos **muy ligera** que:

- No necesita servidor.
- Guarda toda la información en un solo archivo (`videos.db`).
- Es utilizada por Chrome, Firefox, VSCode, Android, iOS, Discord, etc.

Perfecta para scripts de scraping y automatización.

---

# 🚀 Instalación del proyecto

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repo>
cd <carpeta-del-proyecto>
```

### 2️⃣ Instalar dependencias
```bash 
npm install
```
Esto instalará:
- playwright-core
- sqlite3
- sqlite (wrapper)

### 3️⃣ Ejecutar el scraper
```bash 
npm start
```
Esto hará:

- Lanzar Google Chrome desde tu sistema (compatible con macOS 11)
- Scrapear todos los vídeos
- Guardarlos en videos.db

### 4️⃣ Extensión VSCode para visualizar la base de datos

- [sqlite-viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)

### 5️⃣ 📦 Estructura del proyecto

📂 proyecto
- app.mjs              # Script principal del scraper
- videos.db            # Base SQLite generada automáticamente
- package.json         # Dependencias y scripts
- README.md            # Documentación
