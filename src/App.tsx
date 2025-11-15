// App.tsx
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import routePaths from "@/router"; // 기존 "@/router/index.tsx" 라면 거기에 맞게
import ModalStackManager from "@/components/ModalStackManager";
import DrawerStackManager from "@/components/DrawerStackManager";
import { Loading } from "@/components/common/Loading";
import Layout from "@/layouts";

function App() {
  return (
    <MantineProvider withGlobalClasses withStaticClasses>
      <Suspense fallback={<Loading />}>
        <ModalStackManager>
          <DrawerStackManager>
            <Notifications position="top-center" />

            <Routes>
              {/* 모든 라우트를 Layout으로 감싸서 Outlet이 렌더링되도록 구성 */}
              <Route element={<Layout />}>
                {routePaths.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}

                {/* 존재하지 않는 path 대응 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </DrawerStackManager>
        </ModalStackManager>
      </Suspense>
    </MantineProvider>
  );
}

export default App;
