// Vite sets BASE_URL to "/" locally and to the repository path on GitHub Pages.
export function sitePath(path = "") {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
