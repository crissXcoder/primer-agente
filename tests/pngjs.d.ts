declare module "pngjs" {
  import type { Buffer } from "node:buffer";

  interface PngImage {
    width: number;
    height: number;
    data: Buffer;
  }

  export const PNG: {
    sync: {
      read(data: Buffer): PngImage;
    };
  };
}
