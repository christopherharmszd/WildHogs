import { createRoot, hydrateRoot } from "react-dom/client";

export function mount(element, root) {
  if (root.hasChildNodes()) hydrateRoot(root, element);
  else createRoot(root).render(element);
}
