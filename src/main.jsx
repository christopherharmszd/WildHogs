import React from "react";
import { mount } from "./mount.jsx";
import { App } from "./App.jsx";
import { setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage("Wild Hogs Rugby · Hohnstorf");
mount(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
