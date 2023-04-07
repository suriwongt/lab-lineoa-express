import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeCustomization from "./theme";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ThemeCustomization>
  </React.StrictMode>
);
