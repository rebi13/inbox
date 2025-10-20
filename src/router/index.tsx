import { lazy } from "react";

// ---- lazy components (모듈 단위로 코드 스플리팅) ----
const LineHeightShowcasePage = lazy(
  () => import("@/pages/css/LineHeightShowcase"),
);

const routePaths = [
  { path: "/lineheight-showcase", element: <LineHeightShowcasePage /> },
];

export default routePaths;
