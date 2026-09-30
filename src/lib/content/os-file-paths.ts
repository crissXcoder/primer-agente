export function getOsFilePaths(relativePath: string, userName = "TuUsuario") {
  const segments = relativePath.split(/[\\/]+/).filter(Boolean);
  const relativeWindowsPath = segments.length ? `\\${segments.join("\\")}` : "";
  const relativeUnixPath = segments.length ? `/${segments.join("/")}` : "";

  return {
    windows: `C:\\Users\\${userName}${relativeWindowsPath}`,
    macos: `/Users/${userName}${relativeUnixPath}`,
    linux: `/home/${userName}${relativeUnixPath}`,
  };
}
