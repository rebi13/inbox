import React from "react";
import {
  Flex,
  Text,
  Card,
  Stack,
  Group,
  Divider,
  Title,
  Code,
  Box,
  Badge,
  Table,
  Slider,
} from "@mantine/core";

/* ────────────────────────────── 📘 개념 요약 박스 ────────────────────────────── */
const ConceptBox = () => (
  <Card withBorder shadow="sm" radius="lg" p="md">
    <Title order={4} mb="sm">
      📘 핵심 개념 정리
    </Title>
    <Text size="sm" c="dimmed" mb="sm">
      아래 표는 폰트의 세로 정렬 구조를 이해하는 기본 요소입니다.
    </Text>

    <Table withColumnBorders highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>개념</Table.Th>
          <Table.Th>설명</Table.Th>
          <Table.Th>예시 / 역할</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>
            <Code>font-size</Code>
          </Table.Td>
          <Table.Td>글자 자체의 높이</Table.Td>
          <Table.Td>예: 16px</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Code>line-height</Code>
          </Table.Td>
          <Table.Td>한 줄 전체의 높이(= line box의 크기)</Table.Td>
          <Table.Td>글자 + 위/아래 여백 포함</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Code>leading</Code>
          </Table.Td>
          <Table.Td>
            <Code>line-height - font-size</Code> 의 값으로, 텍스트 위/아래에
            분배되는 추가 여백
          </Table.Td>
          <Table.Td>예: (24 - 16) = 8px → 위4px + 아래4px</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <Code>baseline</Code>
          </Table.Td>
          <Table.Td>
            글자가 ‘앉는 선’. 대부분의 폰트는 baseline을 기준으로 렌더링됨
          </Table.Td>
          <Table.Td>중앙이 아니라, 글자 아래쪽에 위치</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  </Card>
);

/* ────────────────────────────── 🧩 재사용 카드 컴포넌트 ────────────────────────────── */
const ExampleCard = ({
  title,
  desc,
  demo,
}: {
  title: string;
  desc: React.ReactNode;
  demo: React.ReactNode;
}) => (
  <Card withBorder shadow="sm" radius="lg" p="md" w="100%">
    <Stack gap="sm">
      <Group justify="space-between">
        <Title order={4}>{title}</Title>
        <Badge variant="light">Demo</Badge>
      </Group>
      <Text size="sm">{desc}</Text>
      <Box
        bg="gray.0"
        style={{
          borderRadius: 8,
          border: "1px dashed #ccc",
          padding: 8,
        }}
      >
        {demo}
      </Box>
    </Stack>
  </Card>
);

/* ────────────────────────────── 🩵 ⑤ Baseline 시각화 (슬라이더 포함) ────────────────────────────── */
const BaselineDemo = () => {
  const [baselinePct, setBaselinePct] = React.useState(30);

  return (
    <Card withBorder shadow="sm" radius="lg" p="md" w="100%">
      <Stack gap="sm" pb="lg">
        <Group justify="space-between">
          <Title order={4}>
            ⑤ 글자는 중앙이 아니라 Baseline 기준으로 앉는다
          </Title>
          <Badge variant="light">Demo</Badge>
        </Group>

        <Text size="sm">
          대부분의 폰트는 <b>baseline</b>을 기준으로 배치됩니다. 같은 박스여도
          중앙선과 baseline이 달라 보이는 이유가 바로 이 때문이에요.
        </Text>

        {/* ▼ 충분한 공간을 확보하여 텍스트/선/라벨이 절대 겹치지 않게 */}
        <Box
          pos="relative"
          px="md"
          py="xl"
          bg="gray.0"
          style={{
            borderRadius: 8,
            minHeight: 180, // ← 높이 여유
            overflow: "visible", // ← 내부 요소가 잘리지 않게
          }}
        >
          {/* 빨간 중앙선 */}
          <Box
            pos="absolute"
            left={0}
            right={0}
            top="50%"
            style={{
              height: 1,
              background: "red",
              transform: "translateY(-50%)",
            }}
          />

          {/* 파란 baseline */}
          <Box
            pos="absolute"
            left={0}
            right={0}
            style={{
              bottom: `${baselinePct}%`,
              height: 1,
              background: "blue",
            }}
          />

          {/* 텍스트 자체도 여유 line-height로 시각적 겹침 방지 */}
          <Text
            ta="center"
            style={{
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: 48,
              lineHeight: "96px", // ← 80px → 96px 로 살짝 여유
            }}
          >
            Ag
          </Text>

          <Text size="xs" ta="center" mt="xs" c="dimmed">
            🔴 박스 중앙선(top:50%) | 🔵 baseline(bottom: {baselinePct}%)
          </Text>
        </Box>

        <Stack gap={4}>
          <Text size="xs" c="dimmed">
            Baseline 위치 미세 조정 (폰트/브라우저에 따라 28~32% 권장)
          </Text>
          <Slider
            value={baselinePct}
            onChange={setBaselinePct}
            min={20}
            max={40}
            step={0.5}
            marks={[
              { value: 28, label: "28%" },
              { value: 30, label: "30%" },
              { value: 32, label: "32%" },
            ]}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

/* ────────────────────────────── 🎨 메인 Showcase (반응형 행 배치) ────────────────────────────── */
const LineHeightShowcase = () => (
  <Flex direction="column" align="center" gap="xl" p="xl" w="100%">
    <Title order={2}>
      Typography: height / line-height / leading / baseline
    </Title>
    <Text c="dimmed" ta="center" maw={720}>
      이 가이드는 <Code>height</Code>, <Code>line-height</Code>,{" "}
      <Code>leading</Code>, <Code>baseline</Code>의 관계를 시각적으로 이해하기
      위한 예시입니다.
    </Text>

    {/* 카드 그리드: Flex 래핑 + 반응형 너비 (1열 → 2열 → 3열) */}
    <Flex gap="lg" wrap="wrap" justify="center" w="100%">
      {/* 개념 표: 항상 전체폭 */}
      <ConceptBox />
      <p>aaaaaa</p>
      {/* ① height만 지정 */}
      <Box w={{ base: "100%", sm: "50%", lg: "33.333%" }}>
        <ExampleCard
          title="① height만 지정"
          desc={
            <>
              <Code>height=80px</Code>만 지정된 상태입니다.{" "}
              <Code>line-height</Code>가 작아서 텍스트가 박스 상단에 위치하며,
              중앙이 아닙니다.
            </>
          }
          demo={
            <Flex
              h={80}
              px="md"
              // ▼ 텍스트가 커지거나 폰트가 달라도 잘리지 않도록 여유
              py="xs"
              bg="gray.1"
              justify="center"
              style={{
                borderRadius: 10,
                overflow: "visible", // ← 잘림 방지
              }}
            >
              <Text lh="normal" size="md">
                height=80, lh=normal → 상단에 치우침
              </Text>
            </Flex>
          }
        />
      </Box>

      {/* ② Flex 정렬만 사용 */}
      <Box w={{ base: "100%", sm: "50%", lg: "33.333%" }}>
        <ExampleCard
          title="② Flex 정렬만 사용 (align='center')"
          desc={
            <>
              Flex의 중앙 정렬로 부모 박스 기준 중앙에는 위치하지만,{" "}
              <Code>lh='normal'</Code>이면 폰트의 베이스라인 기준 때문에 약간
              위/아래로 어긋나 보일 수 있습니다.
            </>
          }
          demo={
            <Flex
              h={80}
              px="md"
              py="xs" // ← 여유 패딩
              bg="gray.2"
              align="center"
              justify="center"
              style={{
                borderRadius: 10,
                overflow: "visible", // ← 잘림 방지
              }}
            >
              <Text lh="normal" size="md">
                Flex align='center' → 중앙이지만 시각 오프셋 가능
              </Text>
            </Flex>
          }
        />
      </Box>

      {/* ③ height === lh + 중앙정렬 */}
      <Box w={{ base: "100%", sm: "50%", lg: "33.333%" }}>
        <ExampleCard
          title="③ height === lh + 중앙정렬"
          desc={
            <>
              <Code>height</Code>와 <Code>lh</Code>를 동일하게 지정하면 line
              box가 박스를 완전히 채워, 시각적으로 중앙처럼 보입니다.
            </>
          }
          demo={
            <Flex
              h={80}
              lh="80px"
              px="md"
              py="xs" // ← 여유 패딩
              align="center"
              justify="center"
              bg="gray.1"
              style={{
                borderRadius: 10,
                overflow: "visible", // ← 잘림 방지
              }}
            >
              <Text size="md">height=80, lh=80 → 정확한 중앙</Text>
            </Flex>
          }
        />
      </Box>

      {/* ④ 여러 줄에서 lh 활용 (가독성) */}
      <Box w={{ base: "100%", sm: "50%", lg: "33.333%" }}>
        <ExampleCard
          title="④ 여러 줄에서 lh 활용 (가독성)"
          desc={
            <>
              여러 줄 문장은 <Code>lh</Code>를 <b>비율(예: 1.4~1.8)</b>로 설정해
              줄 간격을 확보하면 가독성이 좋아집니다.
            </>
          }
          demo={
            <Flex
              direction="column"
              bg="gray.0"
              p="sm"
              style={{ borderRadius: 8, overflow: "visible" }} // ← 안전
            >
              <Text size="sm" lh={1}>
                lh=1 → 줄 간격이 좁음
              </Text>
              <Text size="sm" lh={1.6}>
                lh=1.6 → 권장
              </Text>
              <Text size="sm" lh={2}>
                lh=2 → 넓은 간격
              </Text>
            </Flex>
          }
        />
      </Box>

      {/* ⑤ Baseline 시각화 */}
      <Box w={{ base: "100%", sm: "50%", lg: "33.333%" }}>
        <BaselineDemo />
      </Box>

      {/* ⑥ 폰트 크기와 줄 높이를 다르게 설정하는 이유 (Leading 확보) */}
      <Box w={{ base: "100%", sm: "50%", lg: "33.333%" }}>
        <ExampleCard
          title="⑥ 폰트 크기와 줄 높이를 다르게 설정하는 이유 (Leading 확보)"
          desc={
            <>
              디자이너는 줄 간에 <b>시각적 여백(leading)</b>을 주어 글이 답답해
              보이지 않도록 합니다. <Code>font-size</Code>보다{" "}
              <Code>line-height</Code>를 살짝 크게 설정하면, 글자 위아래로
              균형감 있는 공간이 생기며 가독성이 향상됩니다.
            </>
          }
          demo={
            <Flex
              direction="column"
              bg="gray.0"
              p="sm"
              style={{ borderRadius: 8, overflow: "visible" }}
            >
              <Text size="sm" lh="1rem">
                line-height = 1rem (여백 없음)
              </Text>
              <Text size="sm" lh="1.375rem">
                line-height ≈ font-size보다 약간 큼 (적당한 여백)
              </Text>
              <Text size="sm" lh="1.6rem">
                line-height 더 큼 (여백 많고 부드러움)
              </Text>
            </Flex>
          }
        />
      </Box>
    </Flex>

    <Divider my="xl" w="100%" />
    <Text size="sm" c="dimmed" ta="center">
      🔹 Baseline은 텍스트의 “앉는 선”이며, 중앙선과는 다릅니다.
      <br />
      🔹 디자이너는 font-size보다 line-height를 조금 크게 두어 leading(여백)을
      확보하고, 가독성과 시각적 안정감을 조절합니다.
    </Text>
  </Flex>
);

export default LineHeightShowcase;
