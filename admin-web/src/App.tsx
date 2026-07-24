import { Flex, Heading, Text } from "@radix-ui/themes";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./auth/auth";
import Layout from "./components/Layout";
import { Loading } from "./components/States";
import AuditLogsPage from "./pages/AuditLogsPage";
import DashboardPage from "./pages/DashboardPage";
import FeedbackPage from "./pages/FeedbackPage";
import LoginPage from "./pages/LoginPage";
import SystemPage from "./pages/SystemPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Loading label="校验会话…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
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
