
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('Startup error: could not find the "root" element in index.html.');
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (error) {
    console.error("App startup error:", error);
    rootElement.textContent = `App startup error: ${error.message}`;
  }
}
