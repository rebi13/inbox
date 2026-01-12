import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type DrawerContextType = {
  openDrawer: (
    component: ReactNode,
    parameter: unknown,
    title: string | ReactNode,
    options?: {
      isTitleCentered?: boolean;
      isDrawerFullSize?: boolean;
      closeOnClickOutside?: boolean;
      isNotTitle?: boolean;
    },
  ) => Promise<unknown>;
  closeDrawer: (result?: unknown) => void;
};

export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined,
);

export const useDrawer = (): DrawerContextType => {
  const drawerContext = useContext(DrawerContext);
  if (!drawerContext) {
    throw new Error("useDrawer must be used within a DrawerStackManager");
  }
  return drawerContext;
};
