import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/auth";
import Layout from "./components/Layout";
import { Loading } from "./components/States";
import AuditLogsPage from "./pages/AuditLogsPage";
import Callback from "./pages/Callback";
import DashboardPage from "./pages/DashboardPage";
import FeedbackPage from "./pages/FeedbackPage";
import LoginPage from "./pages/LoginPage";
import SystemPage from "./pages/SystemPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { authed, loading, isAdmin, logout } = useAuth();
  if (loading) return <Loading label="校验会话…" />;
  if (!authed) return <Navigate to="/login" replace />;
  // 已登录但非管理员:不进后台,也别重定向死循环——给明确提示 + 换账号。
  if (!isAdmin) {
    return (
      <Flex direction="column" align="center" justify="center" gap="3" style={{ minHeight: "100vh" }} p="4">
        <Heading size="5">无管理员权限</Heading>
        <Text color="gray" size="2">当前账号未被授予管理员角色,无法访问后台。</Text>
        <Button variant="soft" color="gray" onClick={logout}>换个账号登录</Button>
      </Flex>
    );
  }
  return <>{children}</>;
}

function Placeholder({ title }: { title: string }) {
  return (
    <Flex direction="column" gap="2">
      <Heading size="5">{title}</Heading>
      <Text color="gray">此功能将在后续版本(P3/P4)上线。</Text>
    </Flex>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<Callback />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="system" element={<SystemPage />} />
        <Route path="audit" element={<AuditLogsPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="articles" element={<Placeholder title="文章管理" />} />
        <Route path="users" element={<Placeholder title="用户管理" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
