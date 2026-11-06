import React from "react";
import { mount } from "./mount.jsx";
import { News, activeNewsDetail, newsDetailPath } from "./News.jsx";
import { english, localizedPath, setPageLanguage } from "./locale.jsx";
import "./styles.css";

const detail = activeNewsDetail();
const params = new URLSearchParams(window.location.search);
if (detail && (params.has("post") || params.has("gallery"))) {
  window.location.replace(localizedPath(newsDetailPath(detail.slug)));
} else {
  setPageLanguage(detail ? `${detail.title} · Wild Hogs Rugby` : english ? "Club life & stories · Wild Hogs Rugby" : "Vereinsleben & Geschichten · Wild Hogs Rugby");
  mount(<News />, document.getElementById("news-root"));
}
