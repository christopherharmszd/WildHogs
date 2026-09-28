import React from "react";
import { createRoot } from "react-dom/client";
import { Legal } from "./Legal.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Legal notice · Wild Hogs Rugby" : "Impressum · Wild Hogs Rugby");
createRoot(document.getElementById("legal-root")).render(<Legal />);
