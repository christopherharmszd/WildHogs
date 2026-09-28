import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Wild Hogs Rugby · Hohnstorf" : "Wild Hogs Rugby · Hohnstorf");
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
