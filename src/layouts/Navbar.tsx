import { Box, NavLink, ScrollArea, Stack, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconBrandJavascript,
  IconBrandCss3,
  IconBrandReact,
  IconHome,
  IconArrowsShuffle,
  IconList,
  IconTextSize,
  IconComponents,
  IconCode,
  IconScale,
} from "@tabler/icons-react";

type MenuItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

type MenuCategory = {
  category: string;
  icon: React.ReactNode;
  color: string;
  items: MenuItem[];
};

const menuData: MenuCategory[] = [
  {
    category: "JavaScript",
    icon: <IconBrandJavascript size={18} />,
    color: "yellow",
    items: [
      {
        label: "이벤트 전파",
        path: "/js/event-propagation",
        icon: <IconArrowsShuffle size={16} />,
      },
      {
        label: "배열 메서드",
        path: "/js/array-methods",
        icon: <IconList size={16} />,
      },
    ],
  },
  {
    category: "CSS",
    icon: <IconBrandCss3 size={18} />,
    color: "blue",
    items: [
      {
        label: "Line Height",
        path: "/css/lineheight-showcase",
        icon: <IconTextSize size={16} />,
      },
    ],
  },
  {
    category: "React",
    icon: <IconBrandReact size={18} />,
    color: "cyan",
    items: [
      {
        label: "클래스 컴포넌트",
        path: "/react/class-component",
        icon: <IconCode size={16} />,
      },
      {
        label: "함수형 컴포넌트",
        path: "/react/functional-component",
        icon: <IconComponents size={16} />,
      },
      {
        label: "컴포넌트 비교",
        path: "/react/compare",
        icon: <IconScale size={16} />,
      },
    ],
  },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const isCategoryActive = (items: MenuItem[]) =>
    items.some((item) => location.pathname === item.path);

  return (
    <Box h="100%" bg="white" style={{ borderRight: "1px solid #e9ecef" }}>
      <Stack gap={0} h="100%">
        {/* Home 링크 */}
        <Box p="sm" style={{ borderBottom: "1px solid #e9ecef" }}>
          <NavLink
            label="홈"
            leftSection={<IconHome size={18} />}
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
            variant="filled"
            style={{ borderRadius: 8 }}
          />
        </Box>

        {/* 카테고리별 메뉴 */}
        <ScrollArea flex={1} p="sm">
          <Stack gap="xs">
            {menuData.map((category) => (
              <NavLink
                key={category.category}
                label={
                  <Text fw={600} size="sm">
                    {category.category}
                  </Text>
                }
                leftSection={category.icon}
                childrenOffset={28}
                defaultOpened={isCategoryActive(category.items)}
                variant="subtle"
                color={category.color}
                style={{ borderRadius: 8 }}
              >
                {category.items.map((item) => (
                  <NavLink
                    key={item.path}
                    label={item.label}
                    leftSection={item.icon}
                    active={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                    variant="light"
                    style={{ borderRadius: 6 }}
                  />
                ))}
              </NavLink>
            ))}
          </Stack>
        </ScrollArea>

        {/* 하단 정보 */}
        <Box
          p="sm"
          style={{ borderTop: "1px solid #e9ecef" }}
          bg="gray.0"
        >
          <Text size="xs" c="dimmed" ta="center">
            Frontend Interview Prep
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
