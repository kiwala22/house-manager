import React from "react";
import { createRoot } from 'react-dom/client';
import { HomePage } from './components/pages/HomePage'
import { Routes } from './components/Routes'

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  );
});