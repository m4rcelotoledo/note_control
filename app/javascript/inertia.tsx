// Inertia.js setup for Rails + React + TypeScript
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import React from "react";

// Import your pages here
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CompaniesIndex from "./pages/Companies/Index";
import CompaniesNew from "./pages/Companies/New";
import CompaniesEdit from "./pages/Companies/Edit";
import InvoicesIndex from "./pages/Invoices/Index";
import InvoicesNew from "./pages/Invoices/New";
import InvoicesEdit from "./pages/Invoices/Edit";
import Dashboard from "./pages/Dashboard";
import SettingsIndex from "./pages/Settings/Index";

// Page registry - add your pages here
const pages: Record<string, React.ComponentType<any>> = {
  Dashboard,
  "Auth/Login": Login,
  "Auth/Register": Register,
  "Companies/Index": CompaniesIndex,
  "Companies/New": CompaniesNew,
  "Companies/Edit": CompaniesEdit,
  "Invoices/Index": InvoicesIndex,
  "Invoices/New": InvoicesNew,
  "Invoices/Edit": InvoicesEdit,
  "Settings/Index": SettingsIndex,
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
