import React from "react";
import { mount } from "./mount.jsx";
import { Legal } from "./Legal.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Legal notice · Wild Hogs Rugby" : "Impressum · Wild Hogs Rugby");
mount(<Legal />, document.getElementById("legal-root"));
