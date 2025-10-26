import { CloseIcon, Drawer, Portal, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { DrawerContext } from "../../hooks/useDrawer";

type DrawerProps = {
  component: React.ReactNode;
  parameter: unknown;
  opened: boolean;
  title: string | React.ReactNode;
  onClose: (result?: unknown) => void;
  options?: {
    isTitleCentered?: boolean; // 제목을 중앙 정렬할지 여부
    isDrawerFullSize?: boolean; // Drawer가 전체 화면을 차지할지 여부
    closeOnClickOutside?: boolean; // Drawer 외부 클릭 시 닫힐지 여부
    isNotTitle?: boolean; // 제목을 표시하지 않을지 여부
  };
};

// Context and hook are defined in ./context to satisfy react-refresh rule

const TRANSITION_DURATION = 200;

const DrawerStackManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drawerStack, setDrawerStack] = useState<DrawerProps[]>([]);
  const [openedStates, setOpenedStates] = useState<boolean[]>([]);

  const drawerStackRef = useRef<DrawerProps[]>([]);
  useEffect(() => {
    drawerStackRef.current = drawerStack;
  }, [drawerStack]);

  const openDrawer = (
    component: React.ReactNode,
    parameter: unknown,
    title: string | React.ReactNode,
    options?: {
      isTitleCentered?: boolean;
      isDrawerFullSize?: boolean;
      closeOnClickOutside?: boolean;
      isNotTitle?: boolean;
    },
  ): Promise<unknown> => {
    return new Promise<unknown>((resolve) => {
      const newDrawer: DrawerProps = {
        component,
        parameter,
        onClose: resolve,
        title,
        opened: false, // 1️⃣ 초기에는 닫힌 상태
        options,
      };

      // 2️⃣ Drawer 먼저 Stack에 추가
      setDrawerStack((prev) => [...prev, newDrawer]);
      setOpenedStates((prev) => [...prev, false]);

      // 3️⃣ 다음 렌더 타이밍에 opened=true로 변경 (자연스러운 transition 발생)
      requestAnimationFrame(() => {
        setOpenedStates((prev) =>
          prev.map((v, i) => (i === prev.length - 1 ? true : v)),
        );
      });
    });
  };

  const closeDrawer = (result?: unknown) => {
    const stack = drawerStackRef.current;
    const topIndex = stack.length - 1;
    if (topIndex < 0) return;

    setOpenedStates((prev) => prev.map((v, i) => (i === topIndex ? false : v)));

    setTimeout(() => {
      const currentDrawer = stack[topIndex];
      currentDrawer?.onClose?.(result);

      setDrawerStack((prev) => prev.slice(0, topIndex));
      setOpenedStates((prev) => prev.slice(0, topIndex));
    }, TRANSITION_DURATION);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <Portal>
        {drawerStack.map((drawerProps, index) => (
          <Drawer.Root
            key={index}
            opened={openedStates[index]}
            position="bottom"
            removeScrollProps={{ allowPinchZoom: true }}
            onClose={closeDrawer}
            // title={drawerProps.isNotTitle ? <></> : drawerProps.title}
            closeOnClickOutside={!drawerProps.options?.closeOnClickOutside}
            transitionProps={{
              transition: "slide-up", // 기본 slide-up → 닫힐 때 slide-down으로 작동
              duration: TRANSITION_DURATION,
              timingFunction: "ease",
            }}
            zIndex={1000 + index} // 여러 Drawer가 겹칠 수 있으므로 zIndex 보정
            styles={{
              header: {
                display: "flex",
                width: "100%",
                padding: "0rem",
                // paddingTop: "0.875rem",
                // paddingInline: "1rem",
                // paddingBottom: "0.625rem",
                minHeight: drawerProps.options?.isDrawerFullSize
                  ? "3.5rem"
                  : "3rem",
                height: drawerProps.options?.isDrawerFullSize
                  ? "3.5rem"
                  : "3.25rem",
              },
              content: {
                display: "flex",
                flexDirection: "column",
                height: drawerProps.options?.isDrawerFullSize ? "100%" : "auto",
                borderTopLeftRadius: drawerProps.options?.isDrawerFullSize
                  ? "0px"
                  : "0.75rem",
                borderTopRightRadius: drawerProps.options?.isDrawerFullSize
                  ? "0px"
                  : "0.75rem",
              },
              body: {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "0px",
                width: "100%",
                marginBottom: drawerProps.options?.isDrawerFullSize
                  ? "0rem"
                  : "0.5rem",
              },
              title: {
                width: "100%",
              },
            }}
          >
            <Drawer.Overlay />
            <Drawer.Content>
              {!drawerProps.options?.isNotTitle && (
                <Drawer.Header
                  w="100%"
                  p={
                    drawerProps.options?.isDrawerFullSize
                      ? "1.125rem 1rem 1.125rem 1rem"
                      : "0.875rem 1.125rem 0.875rem 1.125rem"
                  }
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Drawer.Title>
                    <Text
                      w="100%"
                      c="gray.9"
                      h={
                        drawerProps.options?.isDrawerFullSize
                          ? "1.25rem"
                          : "1.5rem"
                      }
                      fz={
                        drawerProps.options?.isDrawerFullSize
                          ? "1.25rem"
                          : "1.125rem"
                      }
                      lh={
                        drawerProps.options?.isDrawerFullSize
                          ? "1.5625rem"
                          : "1.25rem"
                      }
                      ff="MBK CorpoA"
                      ta={
                        drawerProps.options?.isTitleCentered
                          ? "center"
                          : "start"
                      }
                    >
                      {drawerProps.title}
                    </Text>
                  </Drawer.Title>
                  <Drawer.CloseButton
                    w="1.5rem"
                    h="1.5rem"
                    miw="1.5rem"
                    mih="1.5rem"
                    iconSize="1.5rem"
                    fw={700}
                    c="black"
                    onClick={() => {
                      closeDrawer();
                    }}
                    icon={<CloseIcon />}
                  />
                </Drawer.Header>
              )}
              <Drawer.Body>{drawerProps.component}</Drawer.Body>
            </Drawer.Content>
          </Drawer.Root>
        ))}
      </Portal>
    </DrawerContext.Provider>
  );
};

export default DrawerStackManager;
