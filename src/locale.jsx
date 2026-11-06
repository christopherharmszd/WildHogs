import { sitePath } from "./paths.js";

const basePath = sitePath("");
const englishPrefix = `${basePath}en/`;
export const language = window.location.pathname.startsWith(englishPrefix) || new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "de";
export const english = language === "en";

export function localizedPath(path = "") {
  return sitePath(`${english ? "en/" : ""}${path}`);
}

function switchPath(nextLanguage) {
  const url = new URL(window.location.href);
  const relativePath = url.pathname.startsWith(englishPrefix) ? url.pathname.slice(englishPrefix.length) : url.pathname.slice(basePath.length);
  url.pathname = `${basePath}${nextLanguage === "en" ? "en/" : ""}${relativePath}`;
  url.searchParams.delete("lang");
  return `${url.pathname}${url.search}${url.hash}`;
}

export function LanguageSwitch() {
  return <div className="language-switch" role="group" aria-label={english ? "Choose language" : "Sprache wählen"}>
    <a href={switchPath("de")} lang="de" hrefLang="de" aria-current={!english ? "true" : undefined}>DE</a>
    <a href={switchPath("en")} lang="en" hrefLang="en" aria-current={english ? "true" : undefined}>EN</a>
  </div>;
}

export function setPageLanguage(title) {
  document.documentElement.lang = language;
  document.title = title;
}
