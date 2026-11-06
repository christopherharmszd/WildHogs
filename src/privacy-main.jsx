import React from "react";
import { mount } from "./mount.jsx";
import { Privacy } from "./Privacy.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Privacy notice · Wild Hogs Rugby" : "Datenschutz · Wild Hogs Rugby");
mount(<Privacy />, document.getElementById("privacy-root"));
