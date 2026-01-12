import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type ModalContextType = {
  openModal: (
    component: ReactNode,
    parameter: unknown,
    title: string | ReactNode,
    options?: {
      size?: string | number;
      isTitleCentered?: boolean;
      closeOnClickOutside?: boolean;
      isNotTitle?: boolean;
      isCloseButton?: boolean;
    },
  ) => Promise<unknown>;
  closeModal: (result?: unknown) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const useModal = (): ModalContextType => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useModal must be used within a ModalStackManager");
  }
  return modalContext;
};
