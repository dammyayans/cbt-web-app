import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import AppProviders from "context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </CookiesProvider>
  </React.StrictMode>
);
