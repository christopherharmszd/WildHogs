import { useState } from "react";
import { english, localizedPath } from "./locale.jsx";
import { SiteFooter, SiteHeader } from "./SiteChrome.jsx";

export function Contact() {
  const [emailPrepared, setEmailPrepared] = useState(false);
  function prepareEmail(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = english ? "Wild Hogs rugby enquiry" : "Anfrage an Wild Hogs Rugby";
    const body = `${data.get("message")}\n\n${english ? "Name" : "Name"}: ${data.get("name")}\nE-Mail: ${data.get("email")}`;
    window.location.href = `mailto:info@wildhogsrugby.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailPrepared(true);
  }
  return <main className="contact-page site-shell">
    <SiteHeader active="contact" />
    <section className="contact-page-hero section-dark"><div><p className="eyebrow red-text">{english ? "Join the team" : "Komm ins Team"}</p><h1>{english ? "TRY RUGBY" : "PROBETRAINING"}<br /><em>{english ? "& CONTACT." : "& KONTAKT."}</em></h1><p>{english ? "Would you like to try rugby, ask a question or simply come along? Get in touch with Manuela or call her directly." : "Du möchtest Rugby ausprobieren, hast eine Frage oder möchtest einfach mal vorbeischauen? Melde dich bei Manuela oder ruf direkt an."}</p></div><div className="contact-page-phone"><span>{english ? "Your contact" : "Ansprechpartnerin"}</span><strong>Manuela Oestreich</strong><a href="tel:+4917657949578">0176 57949578</a></div></section>
    <section className="contact-page-form section-paper"><div><p className="eyebrow red-text">{english ? "Get in touch" : "Schreib uns"}</p><h2>{english ? "WE'D LOVE" : "WIR FREUEN"}<br /><em>{english ? "TO HEAR FROM YOU." : "UNS."}</em></h2><p>{english ? "A short message is enough. Until our online form is ready, this opens your email app with a draft. Please send the email there, or call Manuela directly." : "Eine kurze Nachricht reicht. Bis unser Onlineformular bereit ist, öffnet sich dein E-Mail-Programm mit einem Entwurf. Bitte sende die E-Mail dort selbst ab – oder ruf Manuela direkt an."}</p><a className="text-link" href={localizedPath("datenschutz.html")}>{english ? "How we handle your data" : "Hinweise zum Datenschutz"} <span>→</span></a></div>
      <form className="contact-form" onSubmit={prepareEmail}>
        <label>{english ? "Name" : "Name"}<input required name="name" autoComplete="name" placeholder={english ? "Your name" : "Dein Name"} /></label>
        <label>{english ? "Email" : "E-Mail"}<input required type="email" name="email" autoComplete="email" placeholder={english ? "you@example.com" : "deine@email.de"} /></label>
        <label>{english ? "Message" : "Nachricht"}<textarea required name="message" placeholder={english ? "I'd like to try rugby …" : "Ich möchte Rugby ausprobieren …"} rows="5" /></label>
        <button className="button button-red" type="submit">{english ? "Open email draft" : "E-Mail-Entwurf öffnen"} <span>→</span></button>
        {emailPrepared && <p className="form-notice" role="status">{english ? "Please send the draft in your email app. If no app opened, call Manuela instead." : "Bitte den Entwurf im E-Mail-Programm absenden. Falls sich keines geöffnet hat, ruf Manuela bitte an."}</p>}
      </form>
    </section>
    <SiteFooter />
  </main>;
}
