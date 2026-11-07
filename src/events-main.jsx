import React from "react";
import { mount } from "./mount.jsx";
import { EventDetail, EventsOverview } from "./Events.jsx";
import { matchPath } from "./eventData.js";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

const detail = window.location.pathname.endsWith(matchPath());
setPageLanguage(detail ? (english ? "SG Nordstern U16 vs SG Rhein West U16 · Wild Hogs Rugby" : "SG Nordstern U16 gegen SG Rhein West U16 · Wild Hogs Rugby") : (english ? "Training & fixtures · Wild Hogs Rugby" : "Training & Termine · Wild Hogs Rugby"));
mount(detail ? <EventDetail /> : <EventsOverview />, document.getElementById("events-root"));
