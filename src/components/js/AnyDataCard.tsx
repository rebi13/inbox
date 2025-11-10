import { useModal } from "@/hooks/useModal";
import { Flex, Text, ActionIcon, Menu } from "@mantine/core";
import {
  IconDotsVertical,
  IconAsterisk,
  IconHash,
  IconUser,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";

type AnyData = {
  id: number;
  a: string; // A 항목
  b: string; // B 항목
  c: string; // C 항목
};

interface AnyDataCardProps {
  data: AnyData;
  // 메뉴 전파 동작 선택: 'stop'은 전파 차단(AnyDataMenu), 'propagate'는 전파 허용(AnyDataMenuPropagation)
  menuVariant?: 'stop' | 'propagate';
}

export const AnyDataCard = ({ data, menuVariant = 'stop' }: AnyDataCardProps) => {
  const { openModal } = useModal();

  return (
    <Flex
      w="100%"
      h={96}
      px="md"
      py="xs"
      gap="md"
      align="flex-start"
      style={{ borderRadius: 8, cursor: "pointer" }}
      bg="gray.5"
      // 카드 전체 클릭 시 상세 보기 실행
      onClick={() => openModal(<AnyDataDetail />, null, "상세 데이터 팝업")}
    >
      {/* 왼쪽 정보 영역 */}
      <Flex direction="column" gap={6} flex={1}>
        <Flex align="center" gap={8}>
          <IconAsterisk size={16} />
          <Text c="dimmed" w={60} fz={13}>
            A
          </Text>
          <Text fz={13}>{data.a}</Text>
        </Flex>

        <Flex align="center" gap={8}>
          <IconHash size={16} />
          <Text c="dimmed" w={60} fz={13}>
            B
          </Text>
          <Text fz={13}>{data.b}</Text>
        </Flex>

        <Flex align="center" gap={8}>
          <IconUser size={16} />
          <Text c="dimmed" w={60} fz={13}>
            C
          </Text>
          <Text fz={13}>{data.c}</Text>
        </Flex>
      </Flex>

      {/* 오른쪽 액션 영역 */}
      <Flex direction="column" align="flex-end" justify="space-between" w={80}>
        {/* 메뉴 전파 동작을 props로 제어 */}
        {menuVariant === 'propagate' ? <AnyDataMenuPropagation /> : <AnyDataMenu />}
      </Flex>
    </Flex>
  );
};

const AnyDataDetail = () => {
  return (
    <Flex w="30rem" h="20rem" bg="white">
      <Text>AnyDataDetail</Text>
    </Flex>
  );
};

const AnyDataMenu = () => {
  const { openModal } = useModal();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="black"
          onMouseDownCapture={(e) => {
            // 클릭 합성 전 단계에서 전파 차단하여 부모 카드 onClick 방지
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation(); // 부모 Flex로의 이벤트 전파 차단
          }}
        >
          <IconDotsVertical size={18} />
        </ActionIcon>
      </Menu.Target>

      {/* 포털 내부 클릭이 카드로 버블링되지 않도록 버블 단계에서만 전파 차단 */}
      <Menu.Dropdown
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Menu.Label>메뉴 선택</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings size={14} />}
          onClick={(e) => {
            e.stopPropagation();
            openModal(<AnyDataDetail />, null, "상세 데이터 팝업");
          }}
        >
          상세조회
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMessageCircle size={14} />}
          onClick={(e) => {
            // 카드 onClick으로 전파되어 상세 팝업이 열리는 것을 방지
            e.stopPropagation();
          }}
        >
          카드 수정(미동작)
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

// 이벤트 전파를 막지 않는 "소프트" 버전
// - Dropdown/Item/Trigger 어디에서도 stopPropagation을 사용하지 않습니다.
// - 카드 등 부모 컨테이너의 onClick이 함께 실행될 수 있습니다(데모/학습용).
export const AnyDataMenuPropagation = () => {
  const { openModal } = useModal();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="subtle" color="black">
          <IconDotsVertical size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>메뉴 선택 (전파 허용)</Menu.Label>
        <Menu.Item
          leftSection={<IconSettings size={14} />}
          onClick={() => {
            // 전파를 막지 않으므로 부모 카드 onClick도 함께 실행될 수 있습니다.
            openModal(<AnyDataDetail />, null, "상세 데이터 팝업");
          }}
        >
          상세조회
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          카드 수정(미동작)
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
