import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeeksContextProvider } from "./Components/WeeksContext/WeeksContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 10,
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      // refetchOnWindowFocus: true,
      // refetchOnReconnect: "always",
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <CssBaseline />
        <WeeksContextProvider>
          <App />
        </WeeksContextProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
