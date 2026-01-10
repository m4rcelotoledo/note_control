// Inertia.js setup for Rails + React + TypeScript
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import React from "react";

// Import your pages here
import Welcome from "./pages/Welcome";

// Page registry - add your pages here
const pages: Record<string, React.ComponentType<any>> = {
  Welcome,
};

createInertiaApp({
  resolve: (name) => {
    const page = pages[name];
    if (!page) {
      throw new Error(
        `Page not found: ${name}. Make sure to import and register it in inertia.tsx`
      );
    }
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );
  },
});
