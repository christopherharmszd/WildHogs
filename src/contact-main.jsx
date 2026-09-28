import React from "react";
import { createRoot } from "react-dom/client";
import { Contact } from "./Contact.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Contact · Wild Hogs Rugby" : "Kontakt · Wild Hogs Rugby");
createRoot(document.getElementById("contact-root")).render(<Contact />);
