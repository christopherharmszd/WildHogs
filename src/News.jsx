import { useEffect, useState } from "react";
import { gallerySets } from "./galleryData.js";
import { InstagramLink } from "./InstagramLink.jsx";
import { sitePath } from "./paths.js";

const posts = [
  {
    slug: "strohballen-wettkampf",
    label: "27.09.2026 · Wettkampftag",
    title: "Hogs on a Roll – der Wettkampftag",
    text: "Aus dem Sondertraining wurde Wettkampf: Am 27. September waren die Wild Hogs in Lüdershausen beim Strohballenwettrollen dabei. Unser Frauen- und unser Mixed-Männerteam gingen gemeinsam an die schweren Ballen. Hier sind die Eindrücke vom Wettkampftag – vom Start bis zu den Teamfotos danach.",
    images: ["65d8e7ec-82aa-47fa-ae48-53d94d79ede0.jpeg", "IMG_3496.jpeg", "IMG_3497.jpeg"].map((file) => sitePath(`assets/gallery/strohballen-wettkampf/${file}`)),
    gallery: gallerySets.strohballenWettkampf.map((file) => sitePath(`assets/gallery/strohballen-wettkampf/${file}`)),
    videos: ["wettkampf-kurz.m4v", "wettkampf-lang.m4v"].map((file) => sitePath(`assets/gallery/strohballen-wettkampf/${file}`))
  },
  { slug: "sommercamp", label: "Sommerferien 2026 · Langeoog", title: "Rugby Summer Camp auf Langeoog", text: "In den Sommerferien war die Rugby-Truppe zum Sommercamp auf Langeoog. Weitere Fotos und Geschichten vom Camp folgen.", images: ["wild-hogs-sommercamp-group.jpeg", "wild-hogs-sommercamp-beach.jpeg", "wild-hogs-sommercamp-detail.jpeg"].map((file) => sitePath(`assets/${file}`)), gallery: gallerySets.sommercamp.map((file) => sitePath(`assets/gallery/sommercamp/${file}`)), className: "news-post-feature" },
  { slug: "strohballen", label: "Vorbereitung · 27.09.2026", title: "Sondertraining fürs Strohballenwettrollen", text: "Zur Vorbereitung auf das Strohballenwettrollen am 27.09.2026 haben wir auf den Lünehöfen in Echem trainiert. Die Teams durften erst ab 18 Jahren starten; für die Kids war das Training trotzdem ein Erlebnis: Sie schoben Rollenbälle mit 250 bis 300 Kilo und probierten sie als Tackle-Objekte aus. Eine ungewöhnliche Vorbereitung – und jede Menge Spaß.", images: ["wild-hogs-strohballen-push.jpeg", "wild-hogs-strohballen-player.jpeg", "wild-hogs-strohballen-teamwork.jpeg"].map((file) => sitePath(`assets/${file}`)), gallery: gallerySets.strohballen.map((file) => sitePath(`assets/gallery/strohballen/${file}`)) },
  { slug: "dorfparade", label: "29.08.2026 · Premiere", title: "Die Wild Hogs bei der Dorfparade", text: "Zum ersten Mal waren wir bei der Dorfparade dabei. Die Kinder haben Plakate gemalt, der Bautrupp hat fleißig am LKW gearbeitet – und gemeinsam wurde daraus ein besonderer Tag. Danke an alle, die geholfen und gespendet haben!", images: ["wild-hogs-dorfparade.jpeg", "wild-hogs-dorfparade-bautrupp.jpeg", "wild-hogs-dorfparade-poster.jpeg"].map((file) => sitePath(`assets/${file}`)), gallery: gallerySets.dorfparade.map((file) => sitePath(`assets/gallery/dorfparade/${file}`)) },
];

const trainingSpieleGallery = {
  slug: "training-spiele",
  label: "Training & Spiele · Bildergalerie",
  title: "Training & Spiele",
  text: "Rugby findet nicht nur an einem besonderen Aktionstag statt. Hier sammeln wir Bilder aus dem Training, von Spieltagen und aus der Mannschaft.",
  gallery: gallerySets.trainingSpiele.map((file) => sitePath(`assets/gallery/training-spiele/${file}`))
};

function NewsHeader() {
  return <header className="site-header"><a className="brand" href={`${sitePath()}#start`} aria-label="Zur Wild Hogs Startseite"><img src={sitePath("assets/wild-hogs-wappen.png")} alt="Wild Hogs Rugby Wappen" /><span><strong>WILD HOGS</strong><small>Vereinsleben · TuS Hohnstorf/Elbe</small></span></a><nav aria-label="Hauptnavigation"><a href={`${sitePath()}#start`}>Start</a><a href={`${sitePath()}#rugby`}>Rugby</a><a href={`${sitePath()}#training`}>Training</a><a className="nav-active" href={sitePath("aktuelles.html")}>Vereinsleben</a><a href={sitePath("kontakt.html")}>Komm vorbei</a></nav><a className="header-cta" href={sitePath("kontakt.html")}>Zum Probetraining <span>→</span></a></header>;
}

function PostDetail({ post }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const closeLightbox = () => setLightboxIndex(null);
  const stepLightbox = (direction) => setLightboxIndex((index) => (index + direction + post.gallery.length) % post.gallery.length);
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);
  return <main className="news-page">
    <NewsHeader />
    <section className="news-detail-hero section-dark">
      <p className="eyebrow red-text">{post.label}</p>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <a className="text-link" href={sitePath("aktuelles.html")}>← Zurück zu Vereinsleben</a>
    </section>
    <section className="news-gallery-section section-light">
      <div className="news-detail-intro">
        <p className="eyebrow red-text">Die komplette Bildserie</p>
        <h2>MITTENDRIN<br /><em>DABEI.</em></h2>
        <p>{post.gallery.length} Fotos in der Galerie. Bild anklicken zum Vergrößern.</p>
      </div>
      <div className="news-gallery">{post.gallery.map((image, index) => <figure key={image}>
        <button className="gallery-trigger" type="button" onClick={() => setLightboxIndex(index)} aria-label={`${post.title} – Foto ${index + 1} groß anzeigen`}>
          <img src={image} alt={`${post.title} – Foto ${index + 1}`} loading="lazy" />
        </button>
        <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
      </figure>)}</div>
      {post.videos?.length ? <div className="news-video-block">
        <p className="eyebrow red-text">Bewegtbilder vom Wettkampftag</p>
        <h2>HOGS ON <em>A ROLL.</em></h2>
        <div className="news-videos">{post.videos.map((video, index) => <figure key={video}>
          <video controls playsInline preload="metadata" aria-label={`${post.title} – Video ${index + 1}`}>
            <source src={video} type="video/mp4" />
            Dein Browser kann dieses Video nicht abspielen.
          </video>
          <figcaption>Video {index + 1} / {post.videos.length}</figcaption>
        </figure>)}</div>
      </div> : null}
    </section>
    {lightboxIndex !== null ? <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${post.title} Galerie`} onClick={(event) => event.target === event.currentTarget && closeLightbox()}>
      <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Galerie schließen">×</button>
      <button className="lightbox-nav lightbox-prev" type="button" onClick={() => stepLightbox(-1)} aria-label="Vorheriges Bild">←</button>
      <figure><img src={post.gallery[lightboxIndex]} alt={`${post.title} – Foto ${lightboxIndex + 1}`} /><figcaption>{lightboxIndex + 1} / {post.gallery.length}</figcaption></figure>
      <button className="lightbox-nav lightbox-next" type="button" onClick={() => stepLightbox(1)} aria-label="Nächstes Bild">→</button>
    </div> : null}
    <footer className="site-footer"><div className="footer-brand"><img src={sitePath("assets/wild-hogs-wappen.png")} alt="" /><span><strong>Wild Hogs Rugby</strong><small>TuS Hohnstorf/Elbe</small></span></div><div className="footer-links"><a href={sitePath()}>Zur Rugby-Seite</a><a href={sitePath("aktuelles.html")}>Vereinsleben</a><a href={sitePath("kontakt.html")}>Komm vorbei</a><InstagramLink /></div><p>Starke Kids. Echter Teamgeist.</p></footer>
  </main>;
}

export function News() {
  const params = new URLSearchParams(window.location.search);
  const activePost = posts.find((post) => post.slug === params.get("post"));
  if (activePost) return <PostDetail post={activePost} />;
  if (params.get("gallery") === "training") return <PostDetail post={trainingSpieleGallery} />;
  return <main className="news-page">
    <NewsHeader />
    <section className="news-hero section-dark"><p className="eyebrow red-text">Nicht nur auf dem Platz</p><h1>VEREINSLEBEN<br /><em>& AKTUELLES.</em></h1><p>Was bei den Wild Hogs neben Training und Spieltagen passiert: besondere Tage, kleine Abenteuer und Geschichten aus unserem Team.</p></section>
    <section className="news-content section-light"><div className="news-intro"><p className="eyebrow red-text">Der Blog der Wild Hogs</p><h2>GESCHICHTEN<br /><em>VON UNS.</em></h2><p>Hier sammeln wir die Dinge, die man nicht in einen Spielplan schreiben kann – aber die zeigen, was unsere Gemeinschaft ausmacht.</p></div><div className="news-posts">{posts.map((post) => <a className="news-card-link" href={sitePath(`aktuelles.html?post=${post.slug}`)} aria-label={`${post.title} – ganze Geschichte ansehen`} key={post.title}><article className={`news-post ${post.className || ""}`}><div className="news-post-media">{post.images.map((image, index) => <img key={image} src={image} alt={`${post.title} – Foto ${index + 1}`} loading="lazy" />)}</div><div><p className="eyebrow red-text">{post.label}</p><h3>{post.title}</h3><p>{post.text}</p><span className="text-link">Ganze Geschichte ansehen <span>→</span></span></div></article></a>)}</div><a className="training-media-card" href={sitePath("aktuelles.html?gallery=training")}><div className="training-media-copy"><p className="eyebrow red-text">Rugby im Alltag</p><h2>TRAINING<br /><em>& SPIELE.</em></h2><p>Der feste Ort für Trainingsmomente, Spieltage und Mannschaftsbilder – getrennt von den besonderen Bloggeschichten.</p><span className="text-link">Zur Bildergalerie <span>→</span></span></div><div className="training-media-preview"><img src={sitePath("assets/gallery/training-spiele/WhatsApp Image 2026-09-13 at 13.23.12.jpeg")} alt="Die Wild Hogs bei einem Spieltag" /><img src={sitePath("assets/gallery/training-spiele/87ca81f9-ad36-4fe7-a8d2-788ee26763db.jpeg")} alt="Training der Wild Hogs auf dem Sportplatz" /><img src={sitePath("assets/gallery/training-spiele/2c40369f-dbd0-4259-a881-0e41a0286d16.jpeg")} alt="Rugby-Übung der Wild Hogs" /></div></a></section>
    <section className="news-fixtures section-dark"><div><p className="eyebrow red-text">Rugby bleibt Rugby</p><h2>SPIELPLAN &<br /><em>TERMINE.</em></h2><p>Auf dieser Seite können später Spieltage, Turniere und besondere Rugby-Termine gesammelt werden.</p></div><div className="fixture-board"><div className="fixture-board-row"><strong>Demnächst</strong><span>Neue Spiel- und Turniertermine werden hier veröffentlicht.</span></div><a className="text-link" href="https://tus-hohnstorf.de/rugby/" target="_blank" rel="noreferrer">Zum TuS-Rugbybereich <span>↗</span></a></div></section>
    <footer className="site-footer"><div className="footer-brand"><img src={sitePath("assets/wild-hogs-wappen.png")} alt="" /><span><strong>Wild Hogs Rugby</strong><small>TuS Hohnstorf/Elbe</small></span></div><div className="footer-links"><a href={sitePath()}>Zur Rugby-Seite</a><InstagramLink /><a href={sitePath("kontakt.html")}>Kontakt</a></div><p>Starke Kids. Echter Teamgeist.</p></footer>
  </main>;
}
