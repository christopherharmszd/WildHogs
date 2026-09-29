import { useState } from "react";
import { english, localizedPath } from "./locale.jsx";
import { SiteFooter, SiteHeader } from "./SiteChrome.jsx";

const FORM_ACCESS_KEY = "784c8188-479c-4bbb-91ee-8ebd566c747c";

export function Contact() {
  const [submission, setSubmission] = useState("idle");

  async function submitMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", FORM_ACCESS_KEY);
    data.append("subject", english ? "Message from the Wild Hogs website" : "Nachricht über die Wild-Hogs-Website");
    setSubmission("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setSubmission("success");
    } catch {
      setSubmission("error");
    }
  }
  return <main className="contact-page site-shell">
    <SiteHeader active="contact" />
    <section className="contact-page-hero section-dark"><div><p className="eyebrow red-text">{english ? "Join the team" : "Komm ins Team"}</p><h1>{english ? "TRY RUGBY" : "PROBETRAINING"}<br /><em>{english ? "& CONTACT." : "& KONTAKT."}</em></h1><p>{english ? "Would you like to try rugby, ask a question or simply come along? Get in touch with Manuela or call her directly." : "Du möchtest Rugby ausprobieren, hast eine Frage oder möchtest einfach mal vorbeischauen? Melde dich bei Manuela oder ruf direkt an."}</p></div><div className="contact-page-phone"><span>{english ? "Your contact" : "Ansprechpartnerin"}</span><strong>Manuela Oestreich</strong><a href="tel:+4917657949578">0176 57949578</a></div></section>
    <section className="contact-page-form section-paper"><div><p className="eyebrow red-text">{english ? "Get in touch" : "Schreib uns"}</p><h2>{english ? "WE'D LOVE" : "WIR FREUEN"}<br /><em>{english ? "TO HEAR FROM YOU." : "UNS."}</em></h2><p>{english ? "A short message is enough. Send it directly with this form, or call Manuela if you prefer." : "Eine kurze Nachricht reicht. Schick sie direkt über dieses Formular ab oder ruf Manuela an."}</p><a className="text-link" href={localizedPath("datenschutz.html")}>{english ? "How we handle your data" : "Hinweise zum Datenschutz"} <span>→</span></a></div>
      <form className="contact-form" onSubmit={submitMessage}>
        <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
        <label>{english ? "Name" : "Name"}<input required name="name" autoComplete="name" placeholder={english ? "Your name" : "Dein Name"} /></label>
        <label>{english ? "Email" : "E-Mail"}<input required type="email" name="email" autoComplete="email" placeholder={english ? "you@example.com" : "deine@email.de"} /></label>
        <label>{english ? "Message" : "Nachricht"}<textarea required name="message" placeholder={english ? "I'd like to try rugby …" : "Ich möchte Rugby ausprobieren …"} rows="5" /></label>
        <button className="button button-red" type="submit" disabled={submission === "sending"}>{submission === "sending" ? (english ? "Sending…" : "Wird gesendet …") : (english ? "Send message" : "Nachricht senden")} <span>→</span></button>
        {submission === "success" && <p className="form-notice" role="status">{english ? "Thank you! Your message has been sent. We'll get back to you." : "Danke! Deine Nachricht wurde versendet. Wir melden uns bei dir."}</p>}
        {submission === "error" && <p className="form-notice form-notice-error" role="alert">{english ? "Sorry, your message could not be sent. Please try again or email us at" : "Deine Nachricht konnte leider nicht gesendet werden. Versuch es bitte noch einmal oder schreib uns an"} <a href="mailto:info@wildhogsrugby.de">info@wildhogsrugby.de</a>.</p>}
      </form>
    </section>
    <SiteFooter />
  </main>;
}
