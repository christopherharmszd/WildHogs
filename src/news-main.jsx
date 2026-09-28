import React from "react";
import { createRoot } from "react-dom/client";
import { News } from "./News.jsx";
import { english, setPageLanguage } from "./locale.jsx";
import "./styles.css";

setPageLanguage(english ? "Club life · Wild Hogs Rugby" : "Vereinsleben · Wild Hogs Rugby");
createRoot(document.getElementById("news-root")).render(<News />);
