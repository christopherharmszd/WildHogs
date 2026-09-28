import React from "react";
import { createRoot } from "react-dom/client";
import { News } from "./News.jsx";
import "./styles.css";

createRoot(document.getElementById("news-root")).render(<News />);
