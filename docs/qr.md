# Código QR del taller

El QR codifica directamente `https://primer-agente-two.vercel.app/taller`; no usa un servicio de QR, acortador, redirección, query string ni rastreo. Los archivos `public/qr/taller.svg` y `public/qr/taller.png` están versionados.

## Regenerarlo

Desde la raíz del repositorio:

```bash
pnpm qr -- --url https://primer-agente-two.vercel.app/taller --nombre taller
```

El comando imprime la URL que va a codificar antes de escribir. La URL debe usar HTTPS y no puede ser local, privada, tener credenciales, query ni fragmento. El SVG y el PNG usan nivel de corrección Q, quiet zone de cuatro módulos y tinta `#171c1f` sobre fondo blanco `#ffffff`. La generación es local e idempotente.

## Dependencias

Las herramientas QR están en `devDependencies`: `qrcode@1.5.4` (MIT) genera los archivos; `qr@0.7.2` (MIT o Apache-2.0) decodifica las pruebas; `pngjs@7.0.0` (MIT) lee sus píxeles. `qr` reemplaza a `jsQR`, cuya última publicación fue hace cinco años. `qrcode@1.5.4` continúa siendo la versión vigente del generador, aunque tiene baja frecuencia de publicación; no se encontró un aviso de abandono. Al 2026-09-30, `pnpm audit` no reportó vulnerabilidades conocidas.

No cambies el nombre del proyecto de Vercel luego de imprimir o repartir el QR: su host forma parte de la URL fija codificada. Si cambia el dominio, genera, prueba y vuelve a imprimir los dos archivos.

## Escaneo e impresión

- Prueba el QR descargado con más de un teléfono antes de imprimir. Conserva la URL escrita junto al código como plan B.
- En una diapositiva, mide la distancia real desde la última fila. Como orientación inicial, el código debería medir al menos una décima parte de esa distancia; es una heurística, no una garantía. Por ejemplo, a 5 m, empieza con 50 cm de ancho. [Comisión Europea, Joint Research Centre: guía de códigos QR](https://circulareconomy.europa.eu/platform/sites/default/files/2026-01/JRC141706_01.pdf).
- Imprime el SVG para conservar nitidez; el PNG de 1024 px sirve para pantallas y materiales pequeños. Mantén el fondo blanco y deja visible toda la quiet zone.
- Comprueba la proyección con las luces reales, y el póster a tamaño final, también en blanco y negro, en ángulo y con poca luz.

La ruta `/taller/qr` presenta el SVG en línea y permite descargar ambas versiones. Su hoja de impresión oculta la navegación y los controles de descarga sin fijar el tamaño del papel.
