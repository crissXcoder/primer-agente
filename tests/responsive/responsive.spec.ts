import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const fixedRoutes = [
  "/",
  "/guias",
  "/guias?os=linux&track=git",
  "/guias/instalar-git",
  "/errores",
  "/rutas",
  "/rutas/primeros-pasos",
  "/rutas/python-entornos",
  "/taller",
  "/_estres",
];

const guideFiles = [join(process.cwd(), "content"), join(process.cwd(), "content", "guias")]
  .flatMap((directory) => readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => `/guias/${entry.name.replace(/\.mdx$/, "")}`));

const viewports = [
  [280, 653, 1], [320, 568, 2], [360, 640, 3], [375, 667, 1], [390, 844, 2],
  [412, 915, 3], [430, 932, 1], [568, 320, 2], [844, 390, 3], [768, 1024, 1],
  [1024, 768, 2], [820, 1180, 3], [1280, 720, 1], [1440, 900, 2], [1920, 1080, 3], [2560, 1440, 1],
] as const;

async function expectNoOverflow(page: Page) {
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const documentWidth = document.scrollingElement?.scrollWidth ?? 0;
    const outliers: string[] = [];
    const clippedText: string[] = [];

    for (const element of document.querySelectorAll<HTMLElement>("body *")) {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (element.closest("nextjs-portal")) continue;
      if (style.display === "none" || style.visibility === "hidden" || rect.width === 0 || rect.height === 0) continue;
      if ((style.overflowX === "hidden" || style.overflowY === "hidden") &&
          (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) &&
          element.innerText.trim() &&
          !element.classList.contains("sr-only") &&
          !element.classList.contains("line-clamp-2")) {
        clippedText.push(`${element.tagName.toLowerCase()}.${String(element.className).slice(0, 60)}`);
      }
      if (element.closest("nextjs-portal")) continue;
      let ancestor = element.parentElement;
      let hasScrollContainer = false;
      while (ancestor && ancestor !== document.body) {
        if (["auto", "scroll"].includes(getComputedStyle(ancestor).overflowX)) {
          hasScrollContainer = true;
          break;
        }
        ancestor = ancestor.parentElement;
      }
      if (!hasScrollContainer && (rect.left < -1 || rect.right > viewportWidth + 1)) {
        outliers.push(`${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}.${String(element.className).slice(0, 80)} ${Math.round(rect.left)}..${Math.round(rect.right)} parent=${element.parentElement?.tagName.toLowerCase()}.${String(element.parentElement?.className).slice(0, 40)}`);
      }
    }
    return { viewportWidth, documentWidth, outliers: outliers.slice(0, 10), clippedText: clippedText.slice(0, 10) };
  });
  expect(result.documentWidth, `document overflow: ${JSON.stringify(result)}`).toBeLessThanOrEqual(result.viewportWidth);
  expect(result.outliers, `elements outside viewport: ${JSON.stringify(result.outliers)}`).toEqual([]);
  expect(result.clippedText, `text clipped by overflow:hidden: ${JSON.stringify(result.clippedText)}`).toEqual([]);
}

async function expectNoSeriousAxeViolations(page: Page, route: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const severe = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
  expect(severe, `${route}: ${JSON.stringify(severe.map(({ id, nodes }) => ({ id, nodes: nodes.length })))}`).toEqual([]);
}

test("layout and axe stay clean across routes and viewport matrix", async ({ browser }) => {
  test.setTimeout(15 * 60 * 1000);
  for (const [width, height, deviceScaleFactor] of viewports) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor });
    const page = await context.newPage();
    const routes = width === 320 || width === 768 || width === 1280
      ? [...fixedRoutes, ...guideFiles]
      : fixedRoutes;
    for (const route of routes) {
      await page.goto(route);
      await expectNoOverflow(page);
      await expectNoSeriousAxeViolations(page, `${width}x${height} ${route}`);
    }
    await context.close();
  }
});

test("stress page exercises long content, tabs, table and card grids", async ({ page }) => {
  await page.goto("/_estres");
  await expect(page.getByTestId("stress-page")).toBeVisible();
  await expect(page.getByRole("tab")).toHaveCount(12);
  await expect(page.getByRole("columnheader")).toHaveCount(12);
  await expect(page.getByRole("heading", { name: /200 resultados/ })).toBeVisible();
  await expect(page.locator("#stress-search-heading + div > *")).toHaveCount(200);
  await page.setViewportSize({ width: 360, height: 844 });
  await expectNoOverflow(page);
  await page.setViewportSize({ width: 844, height: 390 });
  await expectNoOverflow(page);
});

test("reflow works at 320px with WCAG text spacing and 200% root font", async ({ page }) => {
  for (const route of ["/", "/guias", "/guias/instalar-git", "/_estres"]) {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(route);
    await page.addStyleTag({ content: "*:not(svg):not(svg *) { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }" });
    await expectNoOverflow(page);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expectNoOverflow(page);
  }
});

test("interactive targets meet the minimum size and keyboard focus remains visible", async ({ page }) => {
  for (const route of ["/guias", "/guias/instalar-git", "/_estres"]) {
    await page.setViewportSize({ width: 360, height: 844 });
    await page.goto(route);
    const targets = await page.locator("button:not(nextjs-portal button), input, select, [role='tab'], summary").evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { label: element.getAttribute("aria-label") || element.textContent?.trim().slice(0, 36), width: rect.width, height: rect.height };
      }),
    );
    expect(targets.filter((target) => target.width < 24 || target.height < 24)).toEqual([]);
    const below44 = targets.filter((target) => target.width < 44 || target.height < 44);
    if (below44.length) console.warn(`${route}: touch targets below 44px`, below44);
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.matches(":focus-visible") ?? false);
    expect(focused, `${route}: keyboard focus indicator`).toBeTruthy();
  }
});

test("mobile navigation closes with Escape and returns focus to its trigger", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 844 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Abrir menú" });
  await menuButton.click();
  const closeButton = page.getByRole("button", { name: "Cerrar menú" });
  await expect(closeButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("captures key pages at mobile, tablet, desktop and short landscape sizes", async ({ page }) => {
  mkdirSync("tests/responsive/screenshots", { recursive: true });
  for (const [width, height, routes] of [
    [360, 844, ["/guias", "/guias/instalar-git", "/_estres"]],
    [768, 1024, ["/guias"]],
    [1440, 900, ["/guias"]],
    [844, 390, ["/guias", "/guias/instalar-git", "/_estres"]],
  ] as const) {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      await page.goto(route);
      if (route === "/guias") await page.locator(".responsive-grid").first().waitFor();
      const name = route.replaceAll("/", "_").replace(/^_/, "home") || "home";
      await page.screenshot({ path: `tests/responsive/screenshots/${width}x${height}${name}.png`, fullPage: true });
    }
  }
});

test("production build excludes the stress route from normal rendering", async ({ page }) => {
  test.skip(process.env.PLAYWRIGHT_BASE_URL === undefined, "run against pnpm start to verify production");
  const response = await page.goto("/_estres");
  expect(response?.status()).toBe(404);
});
