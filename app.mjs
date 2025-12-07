import { chromium } from "playwright-core";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// ----------------------------------------
// Crear o abrir la base de datos SQLite
// ----------------------------------------
async function initDB() {
  return open({
    filename: "./videos.db",
    driver: sqlite3.Database
  });
}

async function main() {
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  if (!fs.existsSync(chromePath)) {
    console.error("❌ Chrome no encontrado en el sistema.");
    process.exit(1);
  }

  const db = await initDB();

  // Crear tabla si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      image TEXT,
      url TEXT
    )
  `);

  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true
  });

  const page = await browser.newPage();

  // ⬅️ Espera a que termine carga/animaciones
  await page.goto("https://www.uskokrum2010.com/public/index", {
    waitUntil: "networkidle"
  });

  await page.waitForSelector(".card.videoCard");

  // Estracción de datos. Importante: ?? null garantiza que aunque falte un campo, el script no se rompe.
  const data = await page.$$eval(".card.videoCard", cards =>
    cards.map(card => {
      const img = card.querySelector("img.card-img-top")?.src ?? null;
      const title = card.querySelector(".card-title")?.textContent.trim() ?? null;
      const description = card.querySelector(".card-text")?.textContent.trim() ?? null;
      const id = card.getAttribute("data-url");
      const url = id ? `https://www.youtube.com/watch?v=${id}` : null;

      return { title, description, image: img, url };
    })
  );

  console.log("📦 Datos extraídos:", data);

  // Guardar en SQLite
  for (const item of data) {
    await db.run(
      `INSERT INTO videos (title, description, image, url)
       VALUES (?, ?, ?, ?)`,
      [item.title, item.description, item.image, item.url]
    );
  }

  console.log("💾 Datos guardados en videos.db");

  await browser.close();
}

// 🧯 Captura cualquier error que ocurra en el script

main().catch(err => console.error(err));
