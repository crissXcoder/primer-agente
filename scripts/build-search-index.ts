import fs from "fs";
import path from "path";
import { getAllGuides } from "../src/lib/content/loader";
import { generateSearchDocuments } from "../src/lib/content/search-index";

function runBuildPipeline() {
  console.log("🔍 Verificando pipeline de contenido y generando índice de búsqueda...");

  try {
    const guides = getAllGuides();
    console.log(`✓ Se cargaron y validaron ${guides.length} guías exitosamente.`);

    const searchDocs = generateSearchDocuments(guides);

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, "search-index.json");
    fs.writeFileSync(outputPath, JSON.stringify(searchDocs, null, 2), "utf-8");

    console.log(`✓ Índice de búsqueda generado exitosamente en: ${outputPath}`);
  } catch (error) {
    console.error("❌ ERROR CRÍTICO EN PIPELINE DE CONTENIDO:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
    process.exit(1);
  }
}

runBuildPipeline();
