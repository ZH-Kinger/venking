import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/endpoints";
import { ErrorState, Loading } from "../components/States";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Card style={{ background: "var(--bg-2)" }}>
      <Flex direction="column" gap="1">
        <Text size="2" color="gray">{label}</Text>
        <Heading size="6">{value}</Heading>
      </Flex>
    </Card>
  );
}

export default function DashboardPage() {
  const health = useQuery({ queryKey: ["health"], queryFn: adminApi.health });
  const audit = useQuery({ queryKey: ["audit", 1], queryFn: () => adminApi.auditLogs(1) });
  const fb = useQuery({ queryKey: ["fb", 1], queryFn: () => adminApi.feedback(1) });

  if (health.isLoading) return <Loading />;
  if (health.error) return <ErrorState message={(health.error as Error).message} />;

  return (
    <Flex direction="column" gap="4">
      <Heading size="5">仪表盘</Heading>
      <Grid columns={{ initial: "1", sm: "3" }} gap="3">
        <Stat label="服务状态" value={health.data?.ok ? "正常" : "异常"} />
        <Stat label="数据库" value={health.data?.db_backend ?? "—"} />
        <Stat label="运行模式" value={health.data?.dev_mode ? "dev" : "prod"} />
      </Grid>
      <Grid columns={{ initial: "1", sm: "2" }} gap="3">
        <Stat label="审计记录总数" value={audit.data?.total ?? "…"} />
        <Stat label="反馈条数" value={fb.data?.total ?? "…"} />
      </Grid>
      <Text size="2" color="gray">
        文章管理与发布(P3/P4)将在后续版本接入。
      </Text>
    </Flex>
  );
}
