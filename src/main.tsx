// main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/index.css";

import App from "@/App"; // 혹은 "@/App" (프로젝트 alias 설정에 맞춰서)

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
