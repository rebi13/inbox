import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Flex,
  Group,
  Text,
  Tooltip,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconBrandGithub, IconBook } from "@tabler/icons-react";

const pathLabels: Record<string, string> = {
  js: "JavaScript",
  css: "CSS",
  react: "React",
  "event-propagation": "이벤트 전파",
  "array-methods": "배열 메서드",
  "lineheight-showcase": "Line Height",
  "class-component": "클래스 컴포넌트",
  "functional-component": "함수형 컴포넌트",
  compare: "컴포넌트 비교",
};

export const Header = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length === 0) return null;

    return paths.map((path, index) => {
      const label = pathLabels[path] || path;
      const isLast = index === paths.length - 1;

      return (
        <Text
          key={path}
          size="sm"
          c={isLast ? "dark" : "dimmed"}
          fw={isLast ? 600 : 400}
        >
          {label}
        </Text>
      );
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Flex
      h="100%"
      px="md"
      align="center"
      justify="space-between"
      bg="white"
      style={{ borderBottom: "1px solid #e9ecef" }}
    >
      {/* 좌측: 로고 + Breadcrumb */}
      <Group gap="lg">
        <Group gap="xs">
          <IconBook size={20} color="#228be6" />
          <Text fw={700} size="sm" c="blue">
            FE Interview
          </Text>
        </Group>

        {breadcrumbs && (
          <Box style={{ borderLeft: "1px solid #e9ecef", paddingLeft: 16 }}>
            <Breadcrumbs separator="›" separatorMargin={8}>
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
        )}
      </Group>

      {/* 우측: 유틸리티 버튼 */}
      <Group gap="xs">
        <Tooltip label="GitHub 저장소" position="bottom">
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            component="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub size={20} />
          </ActionIcon>
        </Tooltip>

        <Anchor
          href="https://developer.mozilla.org"
          target="_blank"
          rel="noopener noreferrer"
          size="xs"
          c="dimmed"
          style={{ textDecoration: "none" }}
        >
          MDN Docs
        </Anchor>
      </Group>
    </Flex>
  );
};
