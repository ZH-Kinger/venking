import { Box, Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/client";
import { useAuth } from "../auth/auth";
import { ErrorState } from "../components/States";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await login(identifier.trim(), password);
      nav("/", { replace: true });
    } catch (e2) {
      setErr(e2 instanceof ApiError ? e2.message : "登录失败,请重试");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }} p="4">
      <Card style={{ width: 360, background: "var(--bg-2)" }}>
        <Flex direction="column" gap="4" p="2">
          <Box>
            <Heading size="5">管理员登录</Heading>
            <Text size="2" color="gray">
              ZH-Kinger 管理后台
            </Text>
          </Box>
          {err && <ErrorState message={err} />}
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
              <TextField.Root
                placeholder="邮箱或用户名"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoFocus
                required
              />
              <TextField.Root
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={busy || !identifier || !password}>
                {busy ? "登录中…" : "登录"}
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
}
