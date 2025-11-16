import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import { ThemeModeProvider } from "./context/ThemeModeContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <AppRoutes />
      </ThemeModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
