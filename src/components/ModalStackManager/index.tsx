import { CloseButton, Modal, Portal } from "@mantine/core";
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
      <Portal>
        {modalStack.map((modalProps, index) => (
          <Modal.Root
            opened={true}
            removeScrollProps={{ allowPinchZoom: true }}
            onClose={closeModal}
            // title={modalProps.title}
            centered
            size={modalProps.options?.size ?? "auto"}
            key={index}
            zIndex={2000 + index}
            closeOnClickOutside={!modalProps.options?.closeOnClickOutside} // true일 경우 닫히지 않고 false일 경우 닫힘
            styles={{
              content: {
                borderRadius: "0.75rem",
                boxShadow: "0px 0px 20px 3px rgba(0, 0, 0, 0.12)",
              },
              header: {
                display: "flex",
                width: "100%",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0px",
                paddingBottom: "0px",
                minHeight: "3.5rem",
                height: "3.5rem",
              },
              body: {
                display: "flex",
                flex: 1,
                padding: "0px",
                width: "100%",
              },
              title: {
                width: "100%",
              },
            }}
          >
            <Modal.Overlay />
            <Modal.Content>
              {!modalProps.options?.isNotTitle && (
                <Modal.Header w="100%" px="1rem" py="1.125rem">
                  <Modal.Title c="gray.9" ff="MBK CorpoA" fz="1.25rem">
                    {modalProps.title}
                  </Modal.Title>
                  {!modalProps.options?.isCloseButton && (
                    <Modal.CloseButton
                      w="1.5rem"
                      h="1.5rem"
                      miw="1.5rem"
                      mih="1.5rem"
                      iconSize="1.5rem"
                      fw={700}
                      c="black"
                      onClick={modalProps.onClose}
                      icon={<CloseButton />}
                    />
                  )}
                </Modal.Header>
              )}
              <Modal.Body>{modalProps.component}</Modal.Body>
            </Modal.Content>
          </Modal.Root>
        ))}
      </Portal>
    </ModalContext.Provider>
  );
};

export default ModalStackManager;
