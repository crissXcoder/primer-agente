#!/usr/bin/env python3
"""Convierte documentos de una carpeta a Markdown (MarkItDown) dentro de una bóveda.

Reglas de seguridad y de datos:
- Solo LEE de --origen; nunca modifica ni borra los originales.
- Solo escribe dentro de --destino (se valida que cada salida quede dentro).
- Solo procesa extensiones de la lista blanca; ignora el resto.
- No sobrescribe salidas existentes salvo que se pase --sobrescribir.
- Usa convert_local (archivos locales; no acepta URLs).
- Deja un informe CSV y avisa cuando una conversión sale vacía (p. ej. PDF escaneado).
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
from datetime import date
from importlib.metadata import version
from pathlib import Path

from markitdown import MarkItDown

EXTENSIONES = {".pdf", ".docx", ".pptx", ".xlsx", ".xls", ".csv", ".html", ".htm", ".epub", ".json", ".xml", ".txt"}
INVALIDOS = re.compile(r'[\\/:*?"<>|#^\[\]]')  # rompen archivos o wikilinks en Obsidian


def limpiar_nombre(nombre: str) -> str:
    limpio = INVALIDOS.sub("-", nombre).strip(" .")
    return re.sub(r"\s+", " ", limpio) or "sin-nombre"


def ruta_salida(origen: Path, archivo: Path, destino: Path) -> Path:
    relativa = archivo.relative_to(origen)
    partes = [limpiar_nombre(p) for p in relativa.parent.parts]
    nombre = limpiar_nombre(archivo.stem) + f" ({archivo.suffix.lstrip('.').lower()}).md"
    return destino.joinpath(*partes, nombre)


def con_frontmatter(markdown: str, archivo: Path, origen: Path, etiqueta: str, v: str) -> str:
    fuente = archivo.relative_to(origen).as_posix().replace('"', "'")
    return (
        "---\n"
        f'fuente: "{fuente}"\n'
        f"convertido: {date.today().isoformat()}\n"
        f"herramienta: markitdown {v}\n"
        f"tags:\n  - {etiqueta}\n"
        "revisado: false\n"
        "---\n\n" + markdown
    )


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--origen", required=True, type=Path)
    ap.add_argument("--destino", required=True, type=Path)
    ap.add_argument("--etiqueta", default="material/convertido")
    ap.add_argument("--sobrescribir", action="store_true")
    ap.add_argument("--simular", action="store_true", help="No escribe nada; solo muestra qué haría")
    a = ap.parse_args()

    origen, destino = a.origen.resolve(), a.destino.resolve()
    if not origen.is_dir():
        print(f"ERROR: la carpeta de origen no existe: {origen}", file=sys.stderr)
        return 2
    if destino == origen or origen in destino.parents:
        print("ERROR: el destino no puede estar dentro del origen.", file=sys.stderr)
        return 2

    v = version("markitdown")
    md = MarkItDown(enable_plugins=False)
    filas, vacios, fallos = [], 0, 0

    for archivo in sorted(p for p in origen.rglob("*") if p.is_file() and not p.is_symlink()):
        if any(parte.startswith(".") for parte in archivo.relative_to(origen).parts):
            continue
        if archivo.suffix.lower() not in EXTENSIONES:
            filas.append((str(archivo.relative_to(origen)), "", "ignorado", "extensión no incluida"))
            continue
        salida = ruta_salida(origen, archivo, destino)
        if destino not in salida.resolve().parents:
            filas.append((str(archivo.relative_to(origen)), "", "error", "salida fuera del destino"))
            fallos += 1
            continue
        if salida.exists() and not a.sobrescribir:
            filas.append((str(archivo.relative_to(origen)), str(salida.relative_to(destino)), "omitido", "ya existe"))
            continue
        try:
            texto = md.convert_local(str(archivo)).markdown
        except Exception as e:  # cada archivo falla de forma aislada
            filas.append((str(archivo.relative_to(origen)), "", "error", f"{type(e).__name__}: {e}"[:200]))
            fallos += 1
            continue
        if not texto.strip():
            vacios += 1
            filas.append((str(archivo.relative_to(origen)), "", "vacio", "sin texto extraíble (¿PDF escaneado?)"))
            continue
        if not a.simular:
            salida.parent.mkdir(parents=True, exist_ok=True)
            salida.write_text(con_frontmatter(texto, archivo, origen, a.etiqueta, v), encoding="utf-8")
        filas.append((str(archivo.relative_to(origen)), str(salida.relative_to(destino)), "convertido", ""))

    if not a.simular:
        destino.mkdir(parents=True, exist_ok=True)
        with (destino / "_informe-conversion.csv").open("w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["origen", "salida", "estado", "detalle"])
            w.writerows(filas)
    resumen = {e: sum(1 for x in filas if x[2] == e) for e in ("convertido", "omitido", "vacio", "error", "ignorado")}
    print(resumen)
    if vacios:
        print(f"AVISO: {vacios} archivo(s) salieron vacíos (probablemente escaneados). Revisa el informe.")
    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main())
