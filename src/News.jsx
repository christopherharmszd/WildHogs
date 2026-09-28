import { useEffect, useState } from "react";
import { gallerySets } from "./galleryData.js";
import { english, localizedPath } from "./locale.jsx";
import { sitePath } from "./paths.js";
import { SiteFooter, SiteHeader } from "./SiteChrome.jsx";

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

const englishPosts = {
  "strohballen-wettkampf": {
    label: "27 September 2026 · Competition day",
    title: "Hogs on a Roll – competition day",
    text: "Special training turned into a real competition: on 27 September, the Wild Hogs took part in the straw-bale rolling event in Lüdershausen. Our women's team and mixed men's team tackled the heavy bales together. Here are the moments from the day – from the start to the team photos afterwards."
  },
  sommercamp: {
    label: "Summer holidays 2026 · Langeoog",
    title: "Rugby Summer Camp on Langeoog",
    text: "During the summer holidays, the rugby team travelled to Langeoog for a summer camp. More photos and stories from the camp will follow."
  },
  strohballen: {
    label: "Training · 27 September 2026",
    title: "Special training for the straw-bale rolling event",
    text: "To get ready for the straw-bale rolling event on 27 September 2026, we trained at Lünehöfe in Echem. Only adults aged 18 and over could enter the competition, but the children still had a memorable training day: they pushed bales weighing 250 to 300 kilograms and tried them out as tackling targets. An unusual preparation – and a lot of fun."
  },
  dorfparade: {
    label: "29 August 2026 · Our first time",
    title: "The Wild Hogs at the village parade",
    text: "We joined the Dorfparade for the first time. The children painted posters, the building crew worked hard on the truck, and together they made it a special day. Thank you to everyone who helped and donated!"
  }
};

const localizedPosts = posts.map((post) => english ? { ...post, ...englishPosts[post.slug] } : post);
const localizedTrainingGallery = english ? {
  ...trainingSpieleGallery,
  label: "Training & games · Photo gallery",
  title: "Training & games",
  text: "Rugby is about more than special events. Here we collect photos from training, match days and the team."
} : trainingSpieleGallery;

function NewsHeader() {
  return <SiteHeader active="news" />;
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
      <a className="text-link" href={localizedPath("aktuelles.html")}>{english ? "← Back to club life" : "← Zurück zu Vereinsleben"}</a>
    </section>
    <section className="news-gallery-section section-light">
      <div className="news-detail-intro">
        <p className="eyebrow red-text">{english ? "The complete photo series" : "Die komplette Bildserie"}</p>
        <h2>{english ? "RIGHT IN" : "MITTENDRIN"}<br /><em>{english ? "THE ACTION." : "DABEI."}</em></h2>
        <p>{english ? `${post.gallery.length} photos. Click an image to enlarge it.` : `${post.gallery.length} Fotos in der Galerie. Bild anklicken zum Vergrößern.`}</p>
      </div>
      <div className="news-gallery">{post.gallery.map((image, index) => <figure key={image}>
        <button className="gallery-trigger" type="button" onClick={() => setLightboxIndex(index)} aria-label={`${post.title} – ${english ? "enlarge photo" : "Foto groß anzeigen"} ${index + 1}`}>
          <img src={image} alt={`${post.title} – ${english ? "photo" : "Foto"} ${index + 1}`} loading="lazy" />
        </button>
        <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
      </figure>)}</div>
      {post.videos?.length ? <div className="news-video-block">
        <p className="eyebrow red-text">{english ? "Videos from competition day" : "Bewegtbilder vom Wettkampftag"}</p>
        <h2>HOGS ON <em>A ROLL.</em></h2>
        <div className="news-videos">{post.videos.map((video, index) => <figure key={video}>
          <video controls playsInline preload="metadata" aria-label={`${post.title} – ${english ? "video" : "Video"} ${index + 1}`}>
            <source src={video} type="video/mp4" />
            {english ? "Your browser cannot play this video." : "Dein Browser kann dieses Video nicht abspielen."}
          </video>
          <figcaption>{english ? "Video" : "Video"} {index + 1} / {post.videos.length}</figcaption>
        </figure>)}</div>
      </div> : null}
    </section>
    {lightboxIndex !== null ? <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${post.title} ${english ? "gallery" : "Galerie"}`} onClick={(event) => event.target === event.currentTarget && closeLightbox()}>
      <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label={english ? "Close gallery" : "Galerie schließen"}>×</button>
      <button className="lightbox-nav lightbox-prev" type="button" onClick={() => stepLightbox(-1)} aria-label={english ? "Previous image" : "Vorheriges Bild"}>←</button>
      <figure><img src={post.gallery[lightboxIndex]} alt={`${post.title} – ${english ? "photo" : "Foto"} ${lightboxIndex + 1}`} /><figcaption>{lightboxIndex + 1} / {post.gallery.length}</figcaption></figure>
      <button className="lightbox-nav lightbox-next" type="button" onClick={() => stepLightbox(1)} aria-label={english ? "Next image" : "Nächstes Bild"}>→</button>
    </div> : null}
    <SiteFooter />
  </main>;
}

export function News() {
  const params = new URLSearchParams(window.location.search);
  const activePost = localizedPosts.find((post) => post.slug === params.get("post"));
  if (activePost) return <PostDetail post={activePost} />;
  if (params.get("gallery") === "training") return <PostDetail post={localizedTrainingGallery} />;
  return <main className="news-page">
    <NewsHeader />
    <section className="news-hero section-dark"><p className="eyebrow red-text">{english ? "Beyond the pitch" : "Nicht nur auf dem Platz"}</p><h1>{english ? "CLUB LIFE" : "VEREINSLEBEN"}<br /><em>{english ? "& NEWS." : "& AKTUELLES."}</em></h1><p>{english ? "What happens beyond training and match days: special events, small adventures and stories from our team." : "Was bei den Wild Hogs neben Training und Spieltagen passiert: besondere Tage, kleine Abenteuer und Geschichten aus unserem Team."}</p></section>
    <section className="trailer-feature section-dark" aria-labelledby="trailer-title">
      <div className="trailer-feature-copy"><p className="eyebrow red-text">{english ? "The Wild Hogs film · 27 September 2026" : "Der Wild-Hogs-Film · 27.09.2026"}</p><h2 id="trailer-title">HOGS ON<br /><em>A ROLL.</em></h2><p>{english ? "Our trailer for the straw-bale rolling event: a special day for the women's team, the mixed men's team and everyone cheering them on." : "Unser Trailer zum Strohballenwettrollen: ein besonderer Tag für das Frauenteam, das Mixed-Männerteam und alle, die am Streckenrand mitgefiebert haben."}</p><a className="text-link" href={localizedPath("aktuelles.html?post=strohballen-wettkampf")}>{english ? "Read the full story and see the photos" : "Zur ganzen Geschichte und allen Fotos"} <span>→</span></a></div>
      <video controls playsInline preload="metadata" poster={sitePath("assets/gallery/strohballen-wettkampf/wild-hogs-trailer-poster.png")} aria-label={english ? "Wild Hogs straw-bale rolling trailer" : "Wild-Hogs-Trailer zum Strohballenwettrollen"}><source src={sitePath("assets/gallery/strohballen-wettkampf/wild-hogs-trailer.m4v")} type="video/mp4" />{english ? "Your browser cannot play this video." : "Dein Browser kann dieses Video nicht abspielen."}</video>
    </section>
    <section className="news-content section-light">
      <div className="news-intro"><p className="eyebrow red-text">{english ? "The Wild Hogs blog" : "Der Blog der Wild Hogs"}</p><h2>{english ? "STORIES" : "GESCHICHTEN"}<br /><em>{english ? "FROM US." : "VON UNS."}</em></h2><p>{english ? "The things that don't fit into a fixture list, but show what our community is all about." : "Hier sammeln wir die Dinge, die man nicht in einen Spielplan schreiben kann – aber die zeigen, was unsere Gemeinschaft ausmacht."}</p></div>
      <div className="news-posts">{localizedPosts.map((post) => <a className="news-card-link" href={localizedPath(`aktuelles.html?post=${post.slug}`)} aria-label={`${post.title} – ${english ? "read the full story" : "ganze Geschichte ansehen"}`} key={post.slug}><article className={`news-post ${post.className || ""}`}><div className="news-post-media">{post.images.map((image, index) => <img key={image} src={image} alt={`${post.title} – ${english ? "photo" : "Foto"} ${index + 1}`} loading="lazy" />)}</div><div><p className="eyebrow red-text">{post.label}</p><h3>{post.title}</h3><p>{post.text}</p><span className="text-link">{english ? "Read the full story" : "Ganze Geschichte ansehen"} <span>→</span></span></div></article></a>)}</div>
      <a className="training-media-card" href={localizedPath("aktuelles.html?gallery=training")}><div className="training-media-copy"><p className="eyebrow red-text">{english ? "Everyday rugby" : "Rugby im Alltag"}</p><h2>TRAINING<br /><em>{english ? "& GAMES." : "& SPIELE."}</em></h2><p>{english ? "A place for training moments, matches and team photos – separate from the special blog stories." : "Der feste Ort für Trainingsmomente, Spieltage und Mannschaftsbilder – getrennt von den besonderen Bloggeschichten."}</p><span className="text-link">{english ? "See the photo gallery" : "Zur Bildergalerie"} <span>→</span></span></div><div className="training-media-preview"><img src={sitePath("assets/gallery/training-spiele/WhatsApp Image 2026-09-13 at 13.23.12.jpeg")} alt={english ? "The Wild Hogs at a match" : "Die Wild Hogs bei einem Spieltag"} /><img src={sitePath("assets/gallery/training-spiele/87ca81f9-ad36-4fe7-a8d2-788ee26763db.jpeg")} alt={english ? "Wild Hogs rugby training" : "Training der Wild Hogs auf dem Sportplatz"} /><img src={sitePath("assets/gallery/training-spiele/2c40369f-dbd0-4259-a881-0e41a0286d16.jpeg")} alt={english ? "Wild Hogs rugby drill" : "Rugby-Übung der Wild Hogs"} /></div></a>
    </section>
    <section className="news-fixtures section-dark"><div><p className="eyebrow red-text">{english ? "Rugby stays rugby" : "Rugby bleibt Rugby"}</p><h2>{english ? "FIXTURES" : "SPIELPLAN &"}<br /><em>{english ? "& EVENTS." : "TERMINE."}</em></h2><p>{english ? "Future matches, tournaments and other rugby dates can be shared here." : "Auf dieser Seite können später Spieltage, Turniere und besondere Rugby-Termine gesammelt werden."}</p></div><div className="fixture-board"><div className="fixture-board-row"><strong>{english ? "Coming up" : "Demnächst"}</strong><span>{english ? "New matches and tournament dates will be posted here." : "Neue Spiel- und Turniertermine werden hier veröffentlicht."}</span></div><a className="text-link" href="https://tus-hohnstorf.de/rugby/" target="_blank" rel="noopener noreferrer">{english ? "TuS rugby page" : "Zum TuS-Rugbybereich"} <span>↗</span></a></div></section>
    <SiteFooter />
  </main>;
}
