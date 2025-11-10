import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { ModalContext } from "@/hooks/useModal";

type ModalProps = {
  component: React.ReactNode; // 모달로 사용될 컴포넌트
  parameter: unknown; // 전달할 파라미터
  opened: boolean; // 모달이 열려있는지 여부
  title: string | React.ReactNode; // 모달의 타이틀
  onClose: (result?: unknown) => void; // 모달이 닫힐 때 실행할 콜백 함수
  options?: {
    size?: string | number; // 모달의 크기
    isTitleCentered?: boolean; // 타이틀을 중앙 정렬할지 여부
    closeOnClickOutside?: boolean; // 모달 외부 클릭 시 닫힐지 여부
    isNotTitle?: boolean; // 타이틀을 표시하지 않을지 여부
    isCloseButton?: boolean; // 닫기 버튼을 표시할지 여부
  };
};

// Context and hook are defined in ./context to satisfy react-refresh rule

const ModalStackManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalStack, setModalStack] = useState<ModalProps[]>([]);

  const openModal = (
    component: React.ReactNode,
    parameter: unknown,
    title: string | React.ReactNode,
    options?: {
      size?: string | number;
      isTitleCentered?: boolean;
      closeOnClickOutside?: boolean;
      isNotTitle?: boolean;
      isCloseButton?: boolean;
    },
  ): Promise<unknown> => {
    return new Promise<unknown>((resolve) => {
      const modalProps = {
        component,
        parameter,
        onClose: resolve,
        title,
        opened: true,
        options,
      };
      setModalStack((prevStack) => [...prevStack, modalProps]);
    });
  };

  const closeModal = (result?: unknown) => {
    setModalStack((prevStack) => {
      const currentModal = prevStack[prevStack.length - 1];
      currentModal?.onClose?.(result);

      return prevStack.slice(0, -1);
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalStack.map((modalProps, index) => (
        <Modal.Root
          opened={true}
          removeScrollProps={{ allowPinchZoom: true }}
          onClose={closeModal}
          centered
          yOffset={0}
          xOffset={0}
          size={modalProps.options?.size ?? "auto"}
          key={index}
          zIndex={2000 + index}
          // 옵션이 명시되지 않으면 기본값(true)으로 바깥 클릭 시 닫습니다.
          closeOnClickOutside={modalProps.options?.closeOnClickOutside ?? true}
        >
          <Modal.Overlay />
          <Modal.Content>
            {!modalProps.options?.isNotTitle && (
              <Modal.Header w="100%" px="1rem" py="1.125rem">
                <Modal.Title
                  c="gray.9"
                  fz="1.25rem"
                  w="100%"
                  ta={
                    modalProps.options?.isTitleCentered ? "center" : undefined
                  }
                >
                  {modalProps.title}
                </Modal.Title>
                {!modalProps.options?.isCloseButton && (
                  // Mantine v8: CloseButton은 자체적으로 Modal onClose를 호출합니다.
                  <Modal.CloseButton />
                )}
              </Modal.Header>
            )}
            <Modal.Body>{modalProps.component}</Modal.Body>
          </Modal.Content>
        </Modal.Root>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalStackManager;
