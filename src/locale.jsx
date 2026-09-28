import { sitePath } from "./paths.js";

export const language = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "de";
export const english = language === "en";

export function localizedPath(path = "") {
  const url = new URL(sitePath(path), window.location.origin);
  if (english) url.searchParams.set("lang", "en");
  return `${url.pathname}${url.search}${url.hash}`;
}

function switchPath(nextLanguage) {
  const url = new URL(window.location.href);
  if (nextLanguage === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
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
