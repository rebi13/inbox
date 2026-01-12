import { useState, useMemo, useRef, useCallback } from "react";
import type { MouseEvent } from "react";
import {
  Paper,
  Group,
  Button,
  Title,
  Text,
  Stack,
  ScrollArea,
  Code,
  Divider,
  Switch,
  Tooltip,
  List,
  Anchor,
  Flex,
} from "@mantine/core";
import { AnyDataCard } from "@/components/js/AnyDataCard";

type Phase = "Capture" | "Bubble";

type LogStep = {
  phase: Phase;
  label: string;
  stopped?: boolean;
  defaultPrevented?: boolean;
};

type ClickBatch = {
  id: number;
  timestamp: number;
  target: string;
  steps: LogStep[];
};

type DemoSectionProps = {
  title: string;
  defaultStops?: {
    middleCapture?: boolean;
    middleBubble?: boolean;
    innerBubble?: boolean;
  };
  defaultPreventLinkDefault?: boolean;
  menuPropagate?: boolean;
};

const DemoSection = ({
  title,
  defaultStops,
  defaultPreventLinkDefault = false,
}: DemoSectionProps) => {
  const [batches, setBatches] = useState<ClickBatch[]>([]);
  const [stopOnMiddleCapture, setStopOnMiddleCapture] = useState(
    !!defaultStops?.middleCapture,
  );
  const [stopOnMiddleBubble, setStopOnMiddleBubble] = useState(
    !!defaultStops?.middleBubble,
  );
  const [stopOnInnerBubble, setStopOnInnerBubble] = useState(
    !!defaultStops?.innerBubble,
  );
  const [preventLinkDefault, setPreventLinkDefault] = useState(
    !!defaultPreventLinkDefault,
  );

  const currentBatchIdRef = useRef<number | null>(null);
  const lastBatchIdRef = useRef<number>(0);

  const ensureBatchForEvent = useCallback((e: MouseEvent) => {
    if (currentBatchIdRef.current != null) return currentBatchIdRef.current;
    const targetEl = e.target as HTMLElement | null;
    const area = targetEl?.closest("[data-area]") as HTMLElement | null;
    const target = area?.dataset.area ?? "Unknown";
    const id = lastBatchIdRef.current + 1;
    lastBatchIdRef.current = id;
    currentBatchIdRef.current = id;
    setBatches((prev) =>
      [
        {
          id,
          timestamp: Date.now(),
          target,
          steps: [],
        },
        ...prev,
      ].slice(0, 100),
    );
    return id;
  }, []);

  const appendStep = useCallback(
    (
      phase: Phase,
      label: string,
      stopped?: boolean,
      defaultPrevented?: boolean,
    ) => {
      const id = currentBatchIdRef.current;
      if (id == null) return;
      setBatches((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                steps: [
                  ...b.steps,
                  { phase, label, stopped, defaultPrevented },
                ],
              }
            : b,
        ),
      );
    },
    [],
  );

  const endBatchSoon = useCallback(() => {
    queueMicrotask(() => {
      currentBatchIdRef.current = null;
    });
  }, []);

  const clearLogs = () => setBatches([]);

  const handlers = useMemo(() => {
    const makeHandlers = (label: "Outer" | "Middle" | "Inner") => ({
      onClickCapture: (e: MouseEvent) => {
        if (label === "Outer") {
          ensureBatchForEvent(e);
        }
        if (label === "Middle" && stopOnMiddleCapture) {
          appendStep("Capture", `${label}`, true);
          e.stopPropagation();
          endBatchSoon();
          return;
        }
        appendStep("Capture", label);
      },
      onClick: (e: MouseEvent) => {
        if (label === "Middle" && stopOnMiddleBubble) {
          appendStep("Bubble", `${label}`, true);
          e.stopPropagation();
          endBatchSoon();
          return;
        }
        if (label === "Inner" && stopOnInnerBubble) {
          appendStep("Bubble", `${label}`, true);
          e.stopPropagation();
          endBatchSoon();
          return;
        }
        appendStep("Bubble", label);
        if (label === "Outer") {
          endBatchSoon();
        }
      },
    });
    return {
      outer: makeHandlers("Outer"),
      middle: makeHandlers("Middle"),
      inner: makeHandlers("Inner"),
    };
  }, [stopOnMiddleBubble, stopOnMiddleCapture, stopOnInnerBubble]);

  return (
    <Flex direction="column" gap="md" w="100%">
      <Title order={3}>{title}</Title>

      <Paper withBorder p="md" radius="md">
        <Stack gap="xs">
          <Group gap="md">
            <Switch
              checked={stopOnMiddleCapture}
              onChange={(e) => setStopOnMiddleCapture(e.currentTarget.checked)}
              label="Middle에서 캡처링 중단 (stopPropagation)"
            />
            <Switch
              checked={stopOnMiddleBubble}
              onChange={(e) => setStopOnMiddleBubble(e.currentTarget.checked)}
              label="Middle에서 버블링 중단 (stopPropagation)"
            />
            <Switch
              checked={stopOnInnerBubble}
              onChange={(e) => setStopOnInnerBubble(e.currentTarget.checked)}
              label="Inner에서 버블링 중단 (stopPropagation)"
            />
            <Switch
              checked={preventLinkDefault}
              onChange={(e) => setPreventLinkDefault(e.currentTarget.checked)}
              label="링크 기본 동작 막기 (preventDefault)"
            />
          </Group>
          <Text c="dimmed" size="sm">
            스위치를 켜고 아래 영역의 버튼을 클릭해 이벤트 전파 순서를 로그로
            확인해 보세요.
          </Text>
        </Stack>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group align="flex-start" gap="lg">
          {/* Nested clickable area */}
          <Stack gap="xs" style={{ flex: 1 }}>
            <Tooltip label="Outer 영역" withArrow>
              <Paper
                withBorder
                p="md"
                radius="md"
                bg="gray.0"
                data-area="Outer"
                {...handlers.outer}
              >
                <Text fw={700}>Outer</Text>
                <Text c="dimmed" size="sm">
                  onClickCapture, onClick 핸들러가 등록되어 있습니다.
                </Text>

                <Paper
                  withBorder
                  p="md"
                  radius="md"
                  bg="gray.1"
                  mt="sm"
                  data-area="Middle"
                  {...handlers.middle}
                >
                  <Text fw={700}>Middle</Text>
                  <Text c="dimmed" size="sm">
                    스위치로 이 레벨에서 전파를 중단할 수 있습니다.
                  </Text>

                  <Paper
                    withBorder
                    p="md"
                    radius="md"
                    bg="gray.2"
                    mt="sm"
                    data-area="Inner"
                    {...handlers.inner}
                  >
                    <Text fw={700}>Inner</Text>
                    <Text c="dimmed" size="sm" mb="xs">
                      아래 버튼을 클릭해 전파 순서를 확인해 보세요.
                    </Text>
                    <Button
                      data-area="InnerButton"
                      onClickCapture={(e) => {
                        // 타깃(Button) 단계도 캡처/버블 로그에 포함
                        ensureBatchForEvent(e);
                        appendStep("Capture", "InnerButton");
                      }}
                      onClick={() => {
                        appendStep("Bubble", "InnerButton");
                      }}
                    >
                      여기를 클릭
                    </Button>
                    <Text c="dimmed" size="xs" mt="xs">
                      아래 링크를 클릭하면 새 탭이 열립니다. 스위치를 켜면 기본
                      동작(탭 열기)을 막습니다.
                    </Text>
                    <Anchor
                      href="https://example.com"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        if (preventLinkDefault) {
                          e.preventDefault();
                          appendStep("Bubble", "Link (anchor)", false, true);
                          endBatchSoon();
                        } else {
                          appendStep("Bubble", "Link (anchor)");
                        }
                      }}
                      mt="xs"
                    >
                      example.com 열기
                    </Anchor>
                  </Paper>
                </Paper>
              </Paper>
            </Tooltip>
          </Stack>

          {/* Logs */}
          <Stack gap="xs" style={{ flex: 1, minWidth: 320 }}>
            <Group justify="space-between">
              <Title order={4} m={0}>
                전파 로그
              </Title>
              <Group gap="xs">
                <Button variant="light" size="xs" onClick={clearLogs}>
                  로그 지우기
                </Button>
              </Group>
            </Group>
            <Divider />
            <ScrollArea.Autosize mah={280} type="always">
              <Stack gap={4}>
                {batches.length === 0 ? (
                  <Text c="dimmed" size="sm">
                    아직 로그가 없습니다. 버튼을 눌러 보세요.
                  </Text>
                ) : (
                  batches.map((b) => (
                    <Paper key={b.id} withBorder p="xs" radius="sm">
                      <Text fw={600} size="sm">
                        클릭 대상: {b.target} ·{" "}
                        {new Date(b.timestamp).toLocaleTimeString()}
                      </Text>
                      {b.steps.length === 0 ? (
                        <Text c="dimmed" size="sm">
                          (전파 로그 없음)
                        </Text>
                      ) : (
                        <Stack gap={2} mt={4}>
                          {b.steps.map((s, i) => (
                            <Code key={i} block>
                              {`${i + 1}. [${s.phase}] ${s.label}${s.stopped ? " (stopPropagation)" : ""}${s.defaultPrevented ? " (preventDefault)" : ""}`}
                            </Code>
                          ))}
                        </Stack>
                      )}
                    </Paper>
                  ))
                )}
              </Stack>
            </ScrollArea.Autosize>
          </Stack>
        </Group>
      </Paper>
      <Flex w="100%" direction="column" gap="1rem">
        <Flex w="100%" direction="column" gap="0.75rem">
          <Title order={4} m={0}>
            이벤트 전파 방지 (Stop)
          </Title>
          <AnyDataCard
            data={{ id: 1, a: "data A1", b: "data B1", c: "data C1" }}
            menuVariant="stop"
          />
        </Flex>
        <Flex w="100%" direction="column" gap="0.75rem">
          <Title order={4} m={0}>
            이벤트 전파 (propagate)
          </Title>
          <AnyDataCard
            data={{ id: 2, a: "data A2", b: "data B2", c: "data C2" }}
            menuVariant="propagate"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const EventPropagationExample = () => {
  return (
    <Flex direction="column" align="center" gap="xl" p="xl" w="100%">
      <Stack gap="md" p="lg" w="100%" maw={960}>
        <Title order={2}>이벤트 버블링과 캡처링</Title>
        <Text>
          - 캡처링 단계: 바깥 → 안쪽 순서로 핸들러가 실행됩니다. React에서는
          <Code> onClickCapture</Code>로 감지합니다.
        </Text>
        <Text>
          - 버블링 단계: 타깃(가장 안쪽) → 바깥 순서로 실행됩니다. React에서는
          <Code> onClick</Code>으로 감지합니다.
        </Text>
        <DemoSection
          title="전파/전파 방지 데모 (토글로 전환)"
          defaultStops={{
            middleCapture: false,
            middleBubble: false,
            innerBubble: false,
          }}
          menuPropagate={false}
        />
        <Divider my="md" />
        <Stack gap={4}>
          <Title order={4}>요약</Title>
          <Text>
            1) 클릭 시, React는 먼저 <Code>onClickCapture</Code> 핸들러를 바깥 →
            안쪽으로 실행한 뒤, 타깃에서 <Code>onClick</Code>을 시작해 안쪽 →
            바깥으로 버블링합니다.
          </Text>
          <Text>
            2) <Code>event.stopPropagation()</Code>을 호출하면 호출 시점 이후의
            전파가 중단됩니다. (필요 시 같은 노드의 다른 리스너까지 막으려면{" "}
            <Code>stopImmediatePropagation()</Code>을 사용합니다.)
          </Text>
          <Text>
            3) 본 예제는 Mantine의 <Code>Paper</Code>, <Code>Button</Code>,{" "}
            <Code>ScrollArea</Code> 등을 사용해 전파 흐름을 시각화했습니다.
          </Text>
        </Stack>

        <Divider my="md" />
        <Stack gap={6}>
          <Title order={4}>원리 자세히</Title>
          <List spacing={6} size="sm">
            <List.Item>
              DOM 이벤트 흐름은 3단계입니다: <b>캡처링</b> (문서/루트 → 타깃),{" "}
              <b>타깃</b> (이벤트 발생 노드), <b>버블링</b> (타깃 → 문서/루트).
            </List.Item>
            <List.Item>
              React는 <b>SyntheticEvent</b>와 <b>이벤트 위임</b>을 사용해 루트
              컨테이너에서 이벤트를 수신하고, 컴포넌트의{" "}
              <Code>onClickCapture</Code>/<Code>onClick</Code> 순서를 DOM 규칙에
              맞게 시뮬레이션합니다.
            </List.Item>
            <List.Item>
              Inner 버튼을 클릭했을 때의 일반적인 순서 예시:{" "}
              <Code>Outer(onClickCapture)</Code> →{" "}
              <Code>Middle(onClickCapture)</Code> →{" "}
              <Code>Inner(onClickCapture)</Code> → <Code>Inner(onClick)</Code> →{" "}
              <Code>Middle(onClick)</Code> → <Code>Outer(onClick)</Code>.
            </List.Item>
            <List.Item>
              <Code>stopPropagation()</Code>은 호출 지점 이후의 전파(남은
              캡처·타깃·버블)를 모두 중단합니다. 같은 노드에 여러 리스너가 있을
              경우까지 즉시 중단하려면 <Code>stopImmediatePropagation()</Code>을
              사용합니다.
            </List.Item>
            <List.Item>
              <Code>preventDefault()</Code>는 <b>기본 동작</b>을 막고, 전파와는
              별개입니다. 둘 다 필요하면 두 메서드를 함께 호출해야 합니다. 예:
              링크 열기, 폼 제출, 텍스트 선택/컨텍스트 메뉴 표시 등.
            </List.Item>
            <List.Item>
              <Code>event.target</Code>은 실제 이벤트가 발생한 노드,{" "}
              <Code>event.currentTarget</Code>은 현재 실행 중인 핸들러가 연결된
              노드를 가리킵니다.
            </List.Item>
            <List.Item>
              네이티브 DOM의 <Code>addEventListener</Code>는{" "}
              <Code>{`{ capture: true }`}</Code> 옵션으로 캡처 단계 등록이
              가능하며, <Code>once</Code>, <Code>passive</Code> 같은 옵션도
              제공됩니다. React에서는 해당 개념을 <Code>onClickCapture</Code>와{" "}
              <Code>onClick</Code>으로 구분해 사용합니다.
            </List.Item>
          </List>
        </Stack>

        <Divider my="md" />
        <Stack gap={6}>
          <Title order={4}>preventDefault 사례</Title>
          <List spacing={6} size="sm">
            <List.Item>
              링크:{" "}
              <Code>{`<a href="…" target="_blank" onClick={(e) => e.preventDefault()}>`}</Code>{" "}
              — 새 탭 열림을 막고, 필요 시 자체 라우팅/로깅을 수행합니다. 위
              Inner 영역의 링크에서 스위치로 체험할 수 있습니다.
            </List.Item>
            <List.Item>
              폼 제출:{" "}
              <Code>{`<form onSubmit={(e) => { e.preventDefault(); /* 검증/비동기 제출 */ }}>`}</Code>{" "}
              — 기본 리로드를 막고 클라이언트 검증 후 API로 제출합니다.
            </List.Item>
            <List.Item>
              체크박스:{" "}
              <Code>{`<input type="checkbox" onClick={(e) => e.preventDefault()} />`}</Code>{" "}
              — 네이티브 토글을 막고, 상태는 React로 제어합니다(컨트롤드
              컴포넌트).
            </List.Item>
            <List.Item>
              컨텍스트 메뉴:{" "}
              <Code>{`onContextMenu={(e) => e.preventDefault()}`}</Code> —
              우클릭 메뉴를 숨기고 커스텀 메뉴를 표시할 수 있습니다.
            </List.Item>
            <List.Item>
              스크롤/터치:{" "}
              <Code>{`addEventListener('touchmove', handler, { passive: false })`}</Code>
              일 때에만 <Code>preventDefault()</Code>가 효과적입니다. React의
              기본 수동성(passive) 규칙과의 상호작용에 유의하세요.
            </List.Item>
          </List>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default EventPropagationExample;
