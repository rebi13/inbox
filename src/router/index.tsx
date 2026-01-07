import { lazy } from "react";

// ---- lazy components (모듈 단위로 코드 스플리팅) ----
const HomePage = lazy(() => import("@/pages/Home"));

const LineHeightShowcasePage = lazy(
  () => import("@/pages/css/LineHeightShowcase"),
);
const EventPropagationPage = lazy(() => import("@/pages/js/EventPropagation"));
const ArrayMethodsPage = lazy(() => import("@/pages/js/ArrayMethods"));

// const TreeShakingPage = lazy(() => import("@/pages/js/TreeShaking"));

// react demos
// const ClassComponentPage = lazy(() => import("@/pages/react/ClassComponent"));
// const FunctionalComponentPage = lazy(
//   () => import("@/pages/react/FunctionalComponent"),
// );
// const ReactCompareComponentsPage = lazy(
//   () => import("@/pages/react/CompareComponents"),
// );

const routePaths = [
  // home
  { path: "/", element: <HomePage /> },
  // css
  { path: "/css/lineheight-showcase", element: <LineHeightShowcasePage /> },

  // js
  { path: "/js/event-propagation", element: <EventPropagationPage /> },
  { path: "/js/array-methods", element: <ArrayMethodsPage /> },
  // { path: "/tree-shaking", element: <TreeShakingPage /> },

  // react
  // { path: "/react/class-component", element: <ClassComponentPage /> },
  // { path: "/react/functional-component", element: <FunctionalComponentPage /> },
  // { path: "/react/compare", element: <ReactCompareComponentsPage /> },
];

export default routePaths;
