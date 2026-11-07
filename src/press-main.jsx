import React from "react";
import { mount } from "./mount.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import { PressArchive, PressStory } from "./Press.jsx";
import { pressDetailPath } from "./pressData.js";
import "./styles.css";

const detail = window.location.pathname.endsWith(`/${pressDetailPath}`);
setPageLanguage(detail ? (english ? "Rugby goes to school · Wild Hogs Rugby" : "Rugby macht Schule · Wild Hogs Rugby") : (english ? "In the press · Wild Hogs Rugby" : "Aus der Presse · Wild Hogs Rugby"));
mount(detail ? <PressStory /> : <PressArchive />, document.getElementById("press-root"));
