import { test, expect } from "@playwright/test";

test.describe("Pruebas E2E de Catálogo y Guías (primer-agente)", () => {
  test("1. Buscar sin tildes encuentra resultados acentuados y muestra estado vacío", async ({
    page,
  }) => {
    await page.goto("/guias");

    // Escribir búsqueda sin tilde "instalacion"
    const searchInput = page.locator("#search-guides-input");
    await searchInput.fill("instalacion");

    // Debe encontrar ambas guías con "Instalación" en el título
    await expect(
      page.getByRole("link", { name: "Instalación y Configuración Inicial de Git" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Instalación de Node.js y Gestor pnpm" })
    ).toBeVisible();

    // Escribir término inexistente
    await searchInput.fill("termino-inexistente-xyz");

    // Debe mostrar el estado vacío en español de Costa Rica
    await expect(
      page.getByText("¡Pucha! No encontramos ninguna guía con esos filtros")
    ).toBeVisible();
  });

  test("2. Combinar filtros actualiza la URL y permite compartir enlaces directos", async ({
    page,
  }) => {
    await page.goto("/guias");

    // Seleccionar filtro de Sistema Operativo Linux
    await page.locator("#filter-os").selectOption("linux");

    // Seleccionar filtro de Pista Git
    await page.locator("#filter-track").selectOption("git");

    // Verificar que la URL se haya actualizado con los query params
    await expect(page).toHaveURL(/os=linux/);
    await expect(page).toHaveURL(/track=git/);

    // Navegar directamente a esa URL compartida en una nueva visita
    await page.goto("/guias?os=linux&track=git");

    // Comprobar que los selectores conserven el estado desde la URL
    await expect(page.locator("#filter-os")).toHaveValue("linux");
    await expect(page.locator("#filter-track")).toHaveValue("git");

    // Solo debe mostrarse la guía de Git
    await expect(
      page.getByRole("link", { name: "Instalación y Configuración Inicial de Git" })
    ).toBeVisible();
  });

  test("filtrar por audiencia sincroniza la URL y se puede limpiar", async ({ page }) => {
    await page.goto("/guias");
    await page.locator("#filter-audience").selectOption("programadores");

    await expect(page).toHaveURL(/audience=programadores/);
    await expect(page.getByText("¡Pucha! No encontramos ninguna guía con esos filtros")).toBeVisible();

    await page.getByRole("button", { name: /Limpiar filtros/i }).click();
    await expect(page).toHaveURL("/guias");
    await expect(page.locator("#filter-audience")).toHaveValue("");
    await expect(page.getByRole("link", { name: "Instalación y Configuración Inicial de Git" })).toBeVisible();
    await expect(page.getByText("Todas las personas", { exact: true }).nth(1)).toBeVisible();
  });

  test("3. Cambiar de sistema operativo muestra el comando correcto y permite copiar", async ({
    page,
  }) => {
    // Otorgar permisos de portapapeles al contexto
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

    await page.goto("/guias/instalar-git");

    // Comprobar que carga la guía
    await expect(
      page.getByRole("heading", { name: "Instalación y Configuración Inicial de Git" })
    ).toBeVisible();
    await expect(page.getByText("Todas las personas")).toBeVisible();

    // En las pestañas de OsTabs, cambiar a pestaña Linux
    const linuxTab = page.getByRole("tab", { name: /Linux/i }).first();
    await linuxTab.click();

    // Comprobar que el comando de Linux es visible
    await expect(page.getByText("sudo apt update && sudo apt install git -y")).toBeVisible();

    // Buscar y hacer clic en el botón Copiar correspondiente
    const copyButton = page.getByRole("button", { name: /Copiar/i }).first();
    await copyButton.click();

    // Comprobar que el botón cambia de estado a "¡Copiado!"
    await expect(page.getByText("¡Copiado!")).toBeVisible();
  });
});
