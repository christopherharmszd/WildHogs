#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { match, matchPath } from "../src/eventData.js";
import { pressDetailPath } from "../src/pressData.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "client");
const templatesDir = path.join(root, "dist", "prerender-templates");
const origin = "https://wildhogsrugby.de";
const topLevel = ["index.html", "aktuelles.html", "presse.html", "termine.html", "kontakt.html", "impressum.html", "datenschutz.html"];
const details = ["strohballen-wettkampf", "sommercamp", "strohballen", "dorfparade", "training-spiele"];

if (!process.argv[2]) {
  mkdirSync(templatesDir, { recursive: true });
  for (const filename of topLevel) copyFileSync(path.join(dist, filename), path.join(templatesDir, filename));
  for (const lang of ["de", "en"]) {
    const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url), lang], { stdio: "inherit", env: process.env });
    if (result.status !== 0) process.exit(result.status || 1);
  }
  const routes = [...topLevel.map((file) => file === "index.html" ? "" : file), ...details.map((slug) => `geschichten/${slug}.html`), pressDetailPath, matchPath()];
  const urls = routes.flatMap((route) => [route, `en/${route}`]);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((route) => `  <url><loc>${origin}/${route}</loc></url>`).join("\n")}\n</urlset>\n`;
  writeFileSync(path.join(dist, "sitemap.xml"), xml);
  writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`Prerendered ${urls.length} German and English pages with sitemap and robots.txt`);
  process.exit(0);
}

const lang = process.argv[2];
if (!["de", "en"].includes(lang)) throw new Error(`Unsupported language: ${lang}`);
globalThis.window = { location: new URL(`${origin}/${lang === "en" ? "en/" : ""}index.html`) };

const React = await import("react");
const { renderToString } = await import("react-dom/server");
const { createServer } = await import("vite");
const server = await createServer({ configFile: path.join(root, "vite.config.mjs"), server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: "custom", logLevel: "silent" });

try {
  const [{ App }, { News, activeNewsDetail }, { PressArchive, PressStory }, { EventsOverview, EventDetail }, { Contact }, { Legal }, { Privacy }] = await Promise.all([
    server.ssrLoadModule("/src/App.jsx"),
    server.ssrLoadModule("/src/News.jsx"),
    server.ssrLoadModule("/src/Press.jsx"),
    server.ssrLoadModule("/src/Events.jsx"),
    server.ssrLoadModule("/src/Contact.jsx"),
    server.ssrLoadModule("/src/Legal.jsx"),
    server.ssrLoadModule("/src/Privacy.jsx"),
  ]);

  const prefix = lang === "en" ? "en/" : "";
  const homeImage = `${origin}/assets/wild-hogs-real-team.jpg`;
  const metadata = {
    "index.html": {
      title: "Wild Hogs Rugby · Hohnstorf",
      description: lang === "en" ? "Wild Hogs rugby at TuS Hohnstorf/Elbe: rugby for children aged 8 and over, training in Scharnebeck and a friendly first session with the team." : "Wild Hogs Rugby beim TuS Hohnstorf/Elbe: Rugby für Kinder ab 8 Jahren, Training in Scharnebeck und ein Probetraining zum Kennenlernen.",
      image: homeImage,
      component: App,
      rootId: "root",
    },
    "aktuelles.html": {
      title: lang === "en" ? "Club life & stories · Wild Hogs Rugby" : "Vereinsleben & Geschichten · Wild Hogs Rugby",
      description: lang === "en" ? "Club life at Wild Hogs Rugby: match days, straw-bale rolling, the village parade, a school rugby tournament and stories from the team." : "Vereinsleben der Wild Hogs: Spieltage, Strohballenwettrollen, Dorfparade, Schul-Rugbyturnier und Geschichten aus dem Team.",
      image: `${origin}/assets/gallery/strohballen-wettkampf/65d8e7ec-82aa-47fa-ae48-53d94d79ede0.jpeg`,
      component: News,
      rootId: "news-root",
    },
    "presse.html": {
      title: lang === "en" ? "In the press · Wild Hogs Rugby" : "Aus der Presse · Wild Hogs Rugby",
      description: lang === "en" ? "Press coverage of the Wild Hogs and rugby in the region, with links to the original reports." : "Presseberichte über die Wild Hogs und Rugby in der Region – mit Links zu den Originalartikeln.",
      image: homeImage,
      component: PressArchive,
      rootId: "press-root",
    },
    "termine.html": {
      title: lang === "en" ? "Rugby training times & fixtures in Scharnebeck · Wild Hogs" : "Rugby-Trainingszeiten & Spieltermine in Scharnebeck · Wild Hogs",
      description: lang === "en" ? "Wild Hogs rugby in Scharnebeck: training on Mondays 16:00–18:00 and Saturdays 10:00–12:00 for children aged 8 and over. Match dates, venue and directions." : "Wild Hogs Rugby in Scharnebeck: Training montags 16–18 Uhr und samstags 10–12 Uhr für Kinder ab 8 Jahren. Hier stehen auch Spieltermine, Sportplatz und Anfahrt.",
      image: homeImage,
      component: EventsOverview,
      rootId: "events-root",
    },
    "kontakt.html": {
      title: lang === "en" ? "Try rugby & contact · Wild Hogs Rugby" : "Probetraining & Kontakt · Wild Hogs Rugby",
      description: lang === "en" ? "Come and try rugby with the Wild Hogs in Scharnebeck. Contact Manuela Oestreich by phone, email or the online form." : "Probetraining bei den Wild Hogs in Scharnebeck: Kontaktiere Manuela Oestreich telefonisch, per E-Mail oder über das Formular.",
      image: homeImage,
      component: Contact,
      rootId: "contact-root",
    },
    "impressum.html": {
      title: lang === "en" ? "Legal notice · Wild Hogs Rugby" : "Impressum · Wild Hogs Rugby",
      description: lang === "en" ? "Legal notice and contact details for the Wild Hogs Rugby website." : "Impressum und Verantwortliche der Wild-Hogs-Rugby-Website.",
      image: homeImage,
      component: Legal,
      rootId: "legal-root",
    },
    "datenschutz.html": {
      title: lang === "en" ? "Privacy notice · Wild Hogs Rugby" : "Datenschutz · Wild Hogs Rugby",
      description: lang === "en" ? "How the Wild Hogs Rugby website handles hosting data, contact messages, Web3Forms submissions, photos and videos." : "Datenschutzhinweise der Wild-Hogs-Rugby-Website zu Hosting, Kontaktanfragen, Web3Forms sowie Fotos und Videos.",
      image: homeImage,
      component: Privacy,
      rootId: "privacy-root",
    },
  };

  for (const [filename, info] of Object.entries(metadata)) writePage(filename, filename, info);

  writePage("presse.html", pressDetailPath, {
    title: lang === "en" ? "First school rugby tournament in Scharnebeck · Wild Hogs Rugby" : "Erstes Schulrugbyturnier in Scharnebeck · Wild Hogs Rugby",
    description: lang === "en" ? "Four schools took part in Scharnebeck's first school rugby tournament. Read the Wild Hogs story and the original Landeszeitung report." : "Vier Schulen beim ersten Schulrugbyturnier in Scharnebeck: die Geschichte der Wild Hogs und der Originalbericht der Landeszeitung.",
    image: homeImage,
    component: PressStory,
    rootId: "press-root",
  });

  const matchRoute = matchPath();
  const matchTitle = lang === "en" ? match.titleEn : match.titleDe;
  const matchDescription = lang === "en"
    ? "U16 rugby league match in Scharnebeck: SG Nordstern U16 vs SG Rhein West U16 on 7 November 2026 at 13:00 at Schulzentrum Schiffshebewerk."
    : "U16-Rugby-Ligaspiel in Scharnebeck: SG Nordstern U16 gegen SG Rhein West U16 am 7. November 2026 um 13 Uhr am Schulzentrum Schiffshebewerk.";
  writePage("termine.html", matchRoute, {
    title: lang === "en" ? `${matchTitle} on 7 November 2026 · Wild Hogs Rugby` : `${matchTitle} am 7. November 2026 · Wild Hogs Rugby`,
    description: matchDescription,
    image: `${origin}/${match.poster}`,
    component: EventDetail,
    rootId: "events-root",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: matchTitle,
      description: matchDescription,
      startDate: match.date,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: `${origin}/${match.poster}`,
      url: `${origin}/${prefix}${matchRoute}`,
      location: {
        "@type": "Place",
        name: match.placeDe,
        address: { "@type": "PostalAddress", streetAddress: "Duvenbornsweg 5a", postalCode: "21379", addressLocality: "Scharnebeck", addressCountry: "DE" },
      },
    },
  });

  for (const slug of details) {
    const route = `geschichten/${slug}.html`;
    window.location = new URL(`${origin}/${prefix}${route}`);
    const post = activeNewsDetail();
    if (!post) throw new Error(`Missing story: ${slug}`);
    const image = post.images?.[0] || post.gallery?.[0] || homeImage;
    writePage("aktuelles.html", route, {
      title: `${post.title} · Wild Hogs Rugby`,
      description: summarize(post.text),
      image: new URL(image, origin).href,
      component: News,
      rootId: "news-root",
    });
  }

  function writePage(templateName, route, info) {
    window.location = new URL(`${origin}/${prefix}${route}`);
    const canonicalPath = route === "index.html" ? "" : route;
    const canonical = `${origin}/${prefix}${canonicalPath}`;
    const alternateDe = `${origin}/${canonicalPath}`;
    const alternateEn = `${origin}/en/${canonicalPath}`;
    const image = info.image;
    const pageData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: info.title,
      description: info.description,
      url: canonical,
      primaryImageOfPage: image,
    };
    const head = [
      `<meta name="description" content="${escapeHtml(info.description)}" />`,
      `<meta name="robots" content="index, follow, max-image-preview:large" />`,
      `<link rel="canonical" href="${canonical}" />`,
      `<link rel="alternate" hreflang="de" href="${alternateDe}" />`,
      `<link rel="alternate" hreflang="en" href="${alternateEn}" />`,
      `<link rel="alternate" hreflang="x-default" href="${alternateDe}" />`,
      `<meta property="og:type" content="${route.startsWith("geschichten/") || route === pressDetailPath ? "article" : "website"}" />`,
      `<meta property="og:title" content="${escapeHtml(info.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(info.description)}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${escapeHtml(image)}" />`,
      `<meta property="og:image:alt" content="${escapeHtml(info.title)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
      `<script type="application/ld+json">${JSON.stringify(pageData).replaceAll("<", "\\u003c")}</script>`,
      ...(info.structuredData ? [`<script type="application/ld+json">${JSON.stringify(info.structuredData).replaceAll("<", "\\u003c")}</script>`] : []),
    ].join("\n    ");
    const rootMarker = `<div id="${info.rootId}"></div>`;
    const html = readFileSync(path.join(templatesDir, templateName), "utf8");
    if (!html.includes(rootMarker)) throw new Error(`Root element not found in ${templateName}`);
    const rendered = renderToString(React.createElement(info.component));
    const result = html
      .replace('<html lang="de">', `<html lang="${lang}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(info.title)}</title>\n    ${head}`)
      .replace(rootMarker, `<div id="${info.rootId}">${rendered}</div>`);
    const output = path.join(dist, prefix, route);
    mkdirSync(path.dirname(output), { recursive: true });
    writeFileSync(output, result);
  }
} finally {
  await server.close();
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function summarize(value) {
  if (value.length <= 165) return value;
  return `${value.slice(0, 160).replace(/\s+\S*$/, "")} …`;
}
