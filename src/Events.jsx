import { english, localizedPath } from "./locale.jsx";
import { match, matchPath } from "./eventData.js";
import { sitePath } from "./paths.js";
import { TrainingSchedule } from "./Schedule.jsx";
import { SiteFooter, SiteHeader } from "./SiteChrome.jsx";

function MatchCard() {
  return <article className="event-card">
    <div>
      <p className="eyebrow red-text">{english ? "U16 league match" : "U16-Ligaspiel"}</p>
      <h2>{english ? match.titleEn : match.titleDe}</h2>
      <p><time dateTime={match.date}>{english ? match.dateEn : match.dateDe}</time><br />{english ? match.placeEn : match.placeDe}, Scharnebeck</p>
      <a className="text-link" href={localizedPath(matchPath())}>{english ? "Match details" : "Alle Infos zum Spiel"} <span>→</span></a>
    </div>
    <a href={localizedPath(matchPath())} aria-label={english ? "Match details" : "Alle Infos zum Spiel"}><img src={sitePath(match.poster)} alt={english ? "Wild Hogs match poster" : "Plakat zum U16-Ligaspiel"} loading="lazy" /></a>
  </article>;
}

export function EventsOverview() {
  return <main className="news-page">
    <SiteHeader active="training" />
    <section className="news-hero section-dark"><p className="eyebrow red-text">Wild Hogs Rugby</p><h1>{english ? "TRAINING" : "TRAINING"}<br /><em>{english ? "& FIXTURES." : "& TERMINE."}</em></h1><p>{english ? "Training times, the venue and our match dates in one place." : "Trainingszeiten, Sportplatz und Spieltermine auf einen Blick."}</p></section>
    <TrainingSchedule />
    <section className="events-list section-light" aria-labelledby="events-title"><p className="eyebrow red-text">{english ? "Match dates" : "Spieltage"}</p><h2 id="events-title">{english ? "ON THE PITCH." : "AUF DEM PLATZ."}</h2><MatchCard /></section>
    <SiteFooter />
  </main>;
}

export function EventDetail() {
  return <main className="news-page">
    <SiteHeader active="training" />
    <section className="event-detail-hero section-dark"><p className="eyebrow red-text">{english ? "7 November 2026 · U16 rugby" : "07.11.2026 · U16-Rugby"}</p><h1>{english ? match.titleEn : match.titleDe}</h1><p>{english ? "The Wild Hogs invite you to the first U16 league match in Scharnebeck. Come and cheer on the teams!" : "Die Wild Hogs laden zum ersten U16-Ligaspiel in Scharnebeck ein. Kommt vorbei und feuert die Teams an!"}</p></section>
    <section className="news-fixtures match-announcement section-dark event-detail-body"><div className="match-copy"><p className="eyebrow red-text">{english ? "Match information" : "Alle Infos zum Spiel"}</p><h2>SG NORDSTERN U16<br /><em>{english ? "VS SG RHEIN WEST U16" : "GEGEN SG RHEIN WEST U16"}</em></h2><dl className="match-facts"><div><dt>{english ? "When" : "Wann"}</dt><dd><time dateTime={match.date}>{english ? match.dateEn : match.dateDe}</time></dd></div><div><dt>{english ? "Where" : "Wo"}</dt><dd>{english ? match.placeEn : match.placeDe}<br />{match.address}</dd></div><div><dt>{english ? "Refreshments" : "Verpflegung"}</dt><dd>{english ? "Coffee, cake and more will be available." : "Für Kaffee, Kuchen und mehr ist gesorgt."}</dd></div></dl><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Schule+am+Schiffshebewerk%2C+Duvenbornsweg+5a%2C+21379+Scharnebeck" target="_blank" rel="noopener noreferrer">{english ? "Directions in Google Maps" : "Route in Google Maps"} <span>↗</span></a><br /><a className="text-link" href={localizedPath("termine.html")}>{english ? "← All dates" : "← Alle Termine"}</a></div><a className="match-poster" href={sitePath(match.poster)} target="_blank" rel="noopener noreferrer"><img src={sitePath(match.poster)} alt={english ? "German poster for the match between SG Nordstern U16 and SG Rhein West U16" : "Spielplakat: SG Nordstern U16 gegen SG Rhein West U16 am 7. November 2026 in Scharnebeck"} width="1024" height="1536" /></a></section>
    <SiteFooter />
  </main>;
}
