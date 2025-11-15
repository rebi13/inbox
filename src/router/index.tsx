import { lazy } from "react";

// ---- lazy components (모듈 단위로 코드 스플리팅) ----
const HomePage = lazy(() => import("@/pages/Home"));

const LineHeightShowcasePage = lazy(
  () => import("@/pages/css/LineHeightShowcase"),
);
const EventPropagationPage = lazy(() => import("@/pages/js/EventPropagation"));

// const TreeShakingPage = lazy(() => import("@/pages/js/TreeShaking"));

const routePaths = [
  // home
  { path: "/", element: <HomePage /> },
  // css
  { path: "/lineheight-showcase", element: <LineHeightShowcasePage /> },

  // js
  { path: "/event-propagation", element: <EventPropagationPage /> },
  // { path: "/tree-shaking", element: <TreeShakingPage /> },
];

export default routePaths;
