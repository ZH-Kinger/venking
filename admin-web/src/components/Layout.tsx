import { Badge, Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

const NAV = [
  { to: "/", label: "仪表盘", end: true },
  { to: "/system", label: "系统状态" },
  { to: "/audit", label: "审计日志" },
  { to: "/feedback", label: "反馈" },
  { to: "/articles", label: "文章(即将上线)", disabled: true },
  { to: "/users", label: "用户(即将上线)", disabled: true },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/login", { replace: true });
  };

  return (
    <Flex style={{ minHeight: "100vh" }}>
      {/* 左侧导航 */}
      <Box
        style={{
          width: 240,
          borderRight: "1px solid var(--line)",
          background: "var(--bg-1)",
          padding: 16,
          flexShrink: 0,
        }}
      >
        <Flex align="center" gap="2" mb="5">
          <span className="dot" style={{ background: "var(--accent)", width: 12, height: 12 }} />
          <Heading size="3">管理后台</Heading>
        </Flex>
        <Flex direction="column" gap="1">
          {NAV.map((n) =>
            n.disabled ? (
              <Text key={n.to} size="2" className="muted" style={{ padding: "8px 12px" }}>
                {n.label}
              </Text>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                style={({ isActive }) => ({
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  color: isActive ? "var(--fg)" : "var(--muted)",
                  background: isActive ? "var(--accent-soft)" : "transparent",
                  fontSize: 14,
                })}
              >
                {n.label}
              </NavLink>
            ),
          )}
        </Flex>
      </Box>

      {/* 主区 */}
      <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
        <Flex
          align="center"
          justify="between"
          px="5"
          style={{ height: 58, borderBottom: "1px solid var(--line)", background: "var(--bg-1)" }}
        >
          <Text size="2" color="gray">
            ZH-Kinger · 内容与账号管理
          </Text>
          <Flex align="center" gap="3">
            <Badge color="indigo" variant="soft">
              {user?.username} · {user?.role}
            </Badge>
            <Button size="1" variant="soft" color="gray" onClick={onLogout}>
              退出
            </Button>
          </Flex>
        </Flex>
        <Box p="5" style={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
