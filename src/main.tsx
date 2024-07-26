import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Header } from "./components/Header.tsx";
import DotPattern from "./components/dot-pattern.tsx";
import { cn } from "./lib/utils.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <App />
    <DotPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
        )}
      />
  </React.StrictMode>,
);
