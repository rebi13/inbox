import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import routePaths from "@/router/index.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider withGlobalClasses withStaticClasses>
        <Suspense fallback={<Loader />}>
          <Notifications position="top-center" />
          <Routes>
            {routePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
