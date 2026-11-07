import { english, localizedPath } from "./locale.jsx";
import { sitePath } from "./paths.js";
import { pressDetailPath, pressSourceUrl } from "./pressData.js";
import { SiteFooter, SiteHeader } from "./SiteChrome.jsx";

export function PressArchive() {
  return <main className="news-page">
    <SiteHeader active="news" />
    <section className="news-hero section-dark">
      <p className="eyebrow red-text">Wild Hogs Rugby</p>
      <h1>{english ? "IN THE" : "AUS DER"}<br /><em>{english ? "PRESS." : "PRESSE."}</em></h1>
      <p>{english ? "Reports about rugby in our region, collected here with links to the original articles." : "Berichte über Rugby in unserer Region – mit Links zu den Originalartikeln."}</p>
    </section>
    <section className="press-archive section-light" aria-labelledby="press-list-title">
      <div className="press-archive-heading">
        <div><p className="eyebrow red-text">{english ? "Press coverage" : "Pressespiegel"}</p><h2 id="press-list-title">{english ? "RUGBY" : "RUGBY"}<br /><em>{english ? "IN THE NEWS." : "IN DEN MEDIEN."}</em></h2></div>
        <p>{english ? "This collection will grow whenever new reports about the Wild Hogs and rugby at local schools are published." : "Hier sammeln wir Berichte über die Wild Hogs und Rugby an den Schulen der Region. Weitere Beiträge können dazukommen."}</p>
      </div>
      <article className="press-card" aria-labelledby="press-archive-story-title">
        <div className="press-card-source"><p className="eyebrow red-text">{english ? "Newspaper" : "Zeitung"}</p><span>Landeszeitung</span><time dateTime="2026-05-08">08.05.2026</time></div>
        <div className="press-card-content">
          <h3 id="press-archive-story-title">{english ? "Rugby goes to school." : "Rugby macht Schule."}</h3>
          <p>{english ? "Four schools took part in the first school rugby tournament in Scharnebeck. Read our account and the Landeszeitung report." : "Vier Schulen beim ersten Schulrugbyturnier in Scharnebeck: Lest unsere Einordnung und den Bericht der Landeszeitung."}</p>
          <div className="press-card-actions"><a className="text-link" href={localizedPath(pressDetailPath)}>{english ? "Our story" : "Unsere Geschichte"} <span aria-hidden="true">→</span></a><a className="text-link" href={pressSourceUrl} target="_blank" rel="noopener noreferrer">{english ? "LZ article (German)" : "Artikel bei der LZ"} <span aria-hidden="true">↗</span></a></div>
        </div>
      </article>
      <a className="text-link" href={localizedPath("aktuelles.html")}>{english ? "← Club life" : "← Vereinsleben"}</a>
    </section>
    <SiteFooter />
  </main>;
}

export function PressStory() {
  return <main className="news-page">
    <SiteHeader active="news" />
    <article>
      <header className="press-story-hero section-dark">
        <p className="eyebrow red-text">{english ? "School rugby · Scharnebeck · May 2026" : "Schulrugby · Scharnebeck · Mai 2026"}</p>
        <h1>{english ? "RUGBY GOES" : "RUGBY MACHT"}<br /><em>{english ? "TO SCHOOL." : "SCHULE."}</em></h1>
        <p>{english ? "Four schools met for the region’s first school rugby tournament. A day that showed how much team spirit can grow on a rugby pitch." : "Vier Schulen trafen sich zum ersten Schulrugbyturnier in Stadt und Landkreis Lüneburg. Ein Tag, an dem Teamgeist auf dem Rugbyplatz sichtbar wurde."}</p>
      </header>
      <div className="press-story-body section-light">
        <div className="press-story-main">
          <p className="eyebrow red-text">{english ? "The tournament" : "Das Turnier"}</p>
          <h2>{english ? "FOUR SCHOOLS." : "VIER SCHULEN."}<br /><em>{english ? "ONE PITCH." : "EIN PLATZ."}</em></h2>
          <p>{english ? "At the sports field of the Scharnebeck school centre, teams from the Bernhard-Riemann-Gymnasium, Oberschule Scharnebeck, Herderschule and Hauptschule Bleckede came together for a school rugby tournament. For some pupils, it was their first chance to play against teams from other schools." : "Auf dem Sportplatz des Schulzentrums Scharnebeck trafen Teams vom Bernhard-Riemann-Gymnasium, der Oberschule Scharnebeck, der Herderschule und der Hauptschule Bleckede aufeinander. Für manche war es die erste Gelegenheit, Rugby gegen Teams anderer Schulen zu spielen."}</p>
          <p>{english ? "The tournament followed a school rugby programme supported by the Niedersächsischer Rugby-Verband and TuS Hohnstorf. Manuela Oestreich helped connect the club and the schools. The Landeszeitung reports on the matches, the pupils and the effort to bring rugby into everyday school sport." : "Das Turnier schloss an ein Schulrugbyprogramm an, das der Niedersächsische Rugby-Verband und der TuS Hohnstorf unterstützten. Manuela Oestreich brachte Verein und Schulen zusammen. Die Landeszeitung berichtet über die Spiele, die Schülerinnen und Schüler und die Frage, wie Rugby im Schulsport weiter wachsen kann."}</p>
          <div className="press-story-source">
            <p className="eyebrow red-text">{english ? "Original report" : "Originalbericht"}</p>
            <h3>{english ? "Read the full story in the Landeszeitung" : "Den ganzen Bericht in der Landeszeitung lesen"}</h3>
            <p>{english ? "Kathrin Bensemann’s article was published on 8 May 2026. The linked article is in German and may require access through the publisher." : "Der Artikel von Kathrin Bensemann erschien am 8. Mai 2026. Der Zugang zum vollständigen Bericht liegt bei der Landeszeitung."}</p>
            <a className="text-link" href={pressSourceUrl} target="_blank" rel="noopener noreferrer">{english ? "Open the LZ article (German)" : "Zum Artikel der LZ"} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside className="press-story-aside">
          <figure><img src={sitePath("assets/wild-hogs-real-team.jpg")} alt={english ? "Wild Hogs Rugby team photo" : "Teamfoto der Wild Hogs Rugby"} /><figcaption>{english ? "The Wild Hogs rugby team" : "Die Rugbygruppe der Wild Hogs"}</figcaption></figure>
          <div className="press-story-cta"><p className="eyebrow red-text">{english ? "Try rugby" : "Rugby ausprobieren"}</p><h3>{english ? "JOIN THE TEAM." : "KOMM INS TEAM."}</h3><p>{english ? "Interested in playing yourself? Find our current training times and contact details here." : "Du möchtest Rugby selbst ausprobieren? Hier findest du die aktuellen Trainingszeiten und den Kontakt zum Team."}</p><a className="text-link" href={localizedPath("termine.html")}>{english ? "Training times" : "Trainingszeiten"} <span aria-hidden="true">→</span></a><br /><a className="text-link" href={localizedPath("kontakt.html")}>{english ? "Get in touch" : "Kontakt aufnehmen"} <span aria-hidden="true">→</span></a></div>
        </aside>
      </div>
    </article>
    <div className="press-story-back section-light"><a className="text-link" href={localizedPath("presse.html")}>{english ? "← All press coverage" : "← Alle Presseberichte"}</a></div>
    <SiteFooter />
  </main>;
}
