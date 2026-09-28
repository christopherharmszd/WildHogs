import React from "react";
import { createRoot } from "react-dom/client";
import { Contact } from "./Contact.jsx";
import "./styles.css";

createRoot(document.getElementById("contact-root")).render(<Contact />);
