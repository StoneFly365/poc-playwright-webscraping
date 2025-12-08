import { chromium } from "playwright";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function initDB() {
  return open({
    filename: "./videos.db",
    driver: sqlite3.Database
  });
}

async function main() {

  // -----------------------------------------
  // Detectar si estamos en macOS / GitHub CI
  // -----------------------------------------
  const macChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  const useSystemChrome = fs.existsSync(macChromePath);

  console.log("🚀 Modo navegador:", useSystemChrome ? "Chrome local (macOS)" : "Chromium de Playwright");

  const browser = await chromium.launch({
    executablePath: useSystemChrome ? macChromePath : undefined,
    headless: true
  });

  const db = await initDB();

await db.exec(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image TEXT,
    url TEXT UNIQUE
  )
`);


  const page = await browser.newPage();

  await page.goto("https://www.uskokrum2010.com/public/index", {
    waitUntil: "networkidle"
  });

  await page.waitForSelector(".card.videoCard");

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

  for (const item of data) {
    await db.run(
        `INSERT OR IGNORE INTO videos (title, description, image, url)
        VALUES (?, ?, ?, ?)`,
    [item.title, item.description, item.image, item.url]
);

  }

  console.log("💾 Datos guardados en videos.db");

  await browser.close();
}

main().catch(err => console.error(err));
