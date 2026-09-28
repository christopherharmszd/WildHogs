import { InstagramLink } from "./InstagramLink.jsx";
import { english, LanguageSwitch, localizedPath } from "./locale.jsx";
import { sitePath } from "./paths.js";

export function SiteHeader({ active = "" }) {
  const nav = [
    ["start", "Start", "Home", "index.html#start"],
    ["rugby", "Rugby", "Rugby", "index.html#rugby"],
    ["training", "Training", "Training", "index.html#training"],
    ["news", "Vereinsleben", "Club life", "aktuelles.html"],
    ["contact", "Komm vorbei", "Join us", "kontakt.html"],
  ];
  return <header className="site-header">
    <a className="brand" href={localizedPath("index.html#start")} aria-label={english ? "Wild Hogs home" : "Zur Wild Hogs Startseite"}>
      <img src={sitePath("assets/wild-hogs-wappen.png")} alt={english ? "Wild Hogs Rugby crest" : "Wild Hogs Rugby Wappen"} />
      <span><strong>WILD HOGS</strong><small>Rugby · TuS Hohnstorf/Elbe</small></span>
    </a>
    <nav aria-label={english ? "Main navigation" : "Hauptnavigation"}>
      {nav.map(([key, de, en, path]) => <a className={active === key ? "nav-active" : undefined} href={localizedPath(path)} key={key}>{english ? en : de}</a>)}
    </nav>
    <LanguageSwitch />
    <a className="header-cta" href={localizedPath("kontakt.html")}>{english ? "Try rugby" : "Zum Probetraining"} <span aria-hidden="true">→</span></a>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-brand"><img src={sitePath("assets/wild-hogs-wappen.png")} alt="" /><span><strong>Wild Hogs Rugby</strong><small>TuS Hohnstorf/Elbe</small></span></div>
    <div className="footer-links">
      <a href="https://tus-hohnstorf.de/rugby/" target="_blank" rel="noopener noreferrer">TuS Hohnstorf/Elbe</a>
      <InstagramLink>{english ? "Instagram" : "Instagram-Kanal"}</InstagramLink>
      <a href={localizedPath("kontakt.html")}>{english ? "Contact" : "Kontakt"}</a>
      <a href={localizedPath("impressum.html")}>{english ? "Legal notice" : "Impressum"}</a>
      <a href={localizedPath("datenschutz.html")}>{english ? "Privacy" : "Datenschutz"}</a>
    </div>
    <p>{english ? "Strong kids. Real team spirit." : "Starke Kids. Echter Teamgeist."}</p>
  </footer>;
}
