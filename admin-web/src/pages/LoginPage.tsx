import { Box, Button, Callout, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { Loading } from "../components/States";
import { isConfigured } from "../config";

export default function LoginPage() {
  const { authed, loading, login } = useAuth();
  if (loading) return <Loading label="校验会话…" />;
  if (authed) return <Navigate to="/" replace />; // 已登录直接进后台

  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }} p="4">
      <Card style={{ width: 360, background: "var(--bg-2)" }}>
        <Flex direction="column" gap="4" p="2">
          <Box>
            <Heading size="5">管理员登录</Heading>
            <Text size="2" color="gray">ZH-Kinger 管理后台 · 由 Logto 统一登录</Text>
          </Box>
          {!isConfigured && (
            <Callout.Root color="amber" size="1">
              <Callout.Text>
                未配置 Logto:请在 admin-web/.env 填 VITE_LOGTO_APP_ID(见 .env.example)。
              </Callout.Text>
            </Callout.Root>
          )}
          <Button size="3" disabled={!isConfigured} onClick={login}>
            使用 Logto 登录
          </Button>
          <Text size="1" color="gray">
            支持邮箱密码 / 注册 / GitHub 等(登录方式在 Logto 控制台开)。
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
