import { PNG } from "pngjs";
import decodeQR from "qr/decode.js";
import { expect, test } from "@playwright/test";

const targetUrl = "https://primer-agente-two.vercel.app/taller";

test("la ruta del taller muestra un SVG decodificable y se imprime sin navegación", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/taller/qr");

  const qr = page.getByRole("img", { name: `Código QR que abre ${targetUrl}` });
  await expect(qr).toBeVisible();
  await expect(page.getByRole("link", { name: targetUrl })).toHaveAttribute("href", targetUrl);
  await expect(page.getByRole("link", { name: "Descargar SVG" })).toHaveAttribute("download", "taller.svg");
  await expect(page.getByRole("link", { name: "Descargar PNG" })).toHaveAttribute("download", "taller.png");

  const screenshot = PNG.sync.read(await qr.screenshot());
  const decoded = await decodeQR({
    data: new Uint8ClampedArray(screenshot.data),
    width: screenshot.width,
    height: screenshot.height,
  });
  expect(decoded).toBe(targetUrl);

  await page.emulateMedia({ media: "print" });
  await expect(page.locator("[data-site-header]")).toBeHidden();
  await expect(page.locator("footer")).toBeHidden();
  await expect(page.getByRole("heading", { name: "Abrí el checklist del taller" })).toBeVisible();
  await expect(qr).toBeVisible();
  await expect(page.getByRole("link", { name: targetUrl })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Descargar código QR" })).toBeHidden();

  await page.emulateMedia({ media: "screen" });
  await page.setViewportSize({ width: 375, height: 812 });
  const responsiveLayout = await page.evaluate(() => ({
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(responsiveLayout.pageWidth).toBeLessThanOrEqual(responsiveLayout.viewportWidth);
  await expect(qr).toBeVisible();
  const mobileScreenshot = PNG.sync.read(await qr.screenshot());
  expect(
    await decodeQR({
      data: new Uint8ClampedArray(mobileScreenshot.data),
      width: mobileScreenshot.width,
      height: mobileScreenshot.height,
    }),
  ).toBe(targetUrl);
});
