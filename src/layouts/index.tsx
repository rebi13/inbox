import { AppShell, AppShellHeader, AppShellNavbar, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "@/layouts/Header";
import { Navbar } from "@/layouts/Navbar";

const Layout = () => {
  return (
    <Flex w="100%" mih="100%">
      <AppShell
        w="100%"
        h="100%"
        bg="#F3F7FA"
        padding={0}
        layout="alt"
        header={{ height: "3rem" }}
        navbar={{ width: "15rem", breakpoint: "none" }}
      >
        <AppShellHeader>
          <Header />
        </AppShellHeader>
        <AppShellNavbar withBorder={false}>
          <Navbar />
        </AppShellNavbar>
        <AppShell.Main
          w="100%"
          h="100%"
          display="flex"
          style={{ flexDirection: "column" }}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Flex>
  );
};

export default Layout;
