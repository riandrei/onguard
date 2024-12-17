import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/lib/service-worker.js")
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
);
