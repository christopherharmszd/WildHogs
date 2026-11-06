import React from "react";
import { mount } from "./mount.jsx";
import { Contact } from "./Contact.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Try rugby & contact · Wild Hogs Rugby" : "Probetraining & Kontakt · Wild Hogs Rugby");
mount(<Contact />, document.getElementById("contact-root"));
