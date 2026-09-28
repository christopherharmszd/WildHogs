import { english } from "./locale.jsx";
import { SiteFooter, SiteHeader } from "./SiteChrome.jsx";

export function Legal() {
  return <main className="legal-page site-shell">
    <SiteHeader />
    <section className="legal-hero section-dark"><p className="eyebrow red-text">Wild Hogs Rugby</p><h1>{english ? "LEGAL NOTICE." : "IMPRESSUM."}</h1></section>
    <section className="legal-content section-light" aria-label={english ? "Website provider information" : "Angaben zum Webauftritt"}>
      <div><p className="eyebrow red-text">{english ? "Website information" : "Angaben zum Webauftritt"}</p><h2>{english ? "CONTACT" : "KONTAKT"}<br /><em>{english ? "& ADDRESS." : "& ANSCHRIFT."}</em></h2></div>
      <address><strong>Christopher Harms</strong><span>Am Osterberg 7<br />21379 Echem<br />{english ? "Germany" : "Deutschland"}</span><a href="mailto:info@wildhogsrugby.de">info@wildhogsrugby.de</a></address>
    </section>
    <SiteFooter />
  </main>;
}
