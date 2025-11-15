import { Flex, Loader } from "@mantine/core";

export const Loading = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      justify="center"
      align="center"
      pos="fixed"
      top={0}
      left={0}
      bg={`rgba(0, 0, 0, 0.2)`} // 약간의 투명도와 흰 배경
      style={{
        zIndex: 9999, // 모든 요소 위에 표시
      }}
    >
      <Loader size="xl" />
    </Flex>
  );
};
