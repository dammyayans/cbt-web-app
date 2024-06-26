import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CookiesProvider } from "react-cookie";

import App from "./App";

import AppProviders from "context";

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
