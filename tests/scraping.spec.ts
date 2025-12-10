import { test, expect } from "@playwright/test";

test("La página carga y contiene tarjetas de video", async ({ page }) => {
  await page.goto("https://www.uskokrum2010.com/public/index", {
    waitUntil: "networkidle"
  });

  // Verificamos que al menos un elemento exista
  const cards = await page.$$(".card.videoCard");
  expect(cards.length).toBeGreaterThan(0);
});
