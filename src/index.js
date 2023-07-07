import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
