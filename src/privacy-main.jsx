import React from "react";
import { createRoot } from "react-dom/client";
import { Privacy } from "./Privacy.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Privacy · Wild Hogs Rugby" : "Datenschutz · Wild Hogs Rugby");
createRoot(document.getElementById("privacy-root")).render(<Privacy />);
