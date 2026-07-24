import { Card, Flex, Heading, Table, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/endpoints";
import { EmptyState, ErrorState, Loading } from "../components/States";

function fmt(ts: string | null): string {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString("zh-CN");
  } catch {
    return ts;
  }
}

function AuditTable() {
  const { data, isLoading, error } = useQuery({ queryKey: ["audit"], queryFn: () => adminApi.auditLogs(100) });
  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={(error as Error).message} />;
  if (!data?.items.length) return <EmptyState label="暂无审计记录" />;
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>时间</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>操作</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>资源</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>操作者(sub)</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.items.map((r) => (
          <Table.Row key={r.id}>
            <Table.Cell>{fmt(r.created_at)}</Table.Cell>
            <Table.Cell>{r.action}</Table.Cell>
            <Table.Cell>{r.resource_type ?? "—"}</Table.Cell>
            <Table.Cell>{r.actor_sub ?? "—"}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function ConversationsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-conversations"],
    queryFn: () => adminApi.conversations(100),
  });
  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={(error as Error).message} />;
  if (!data?.items.length) return <EmptyState label="暂无用户对话" />;
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>更新时间</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>标题</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>用户(sub)</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.items.map((r) => (
          <Table.Row key={r.id}>
            <Table.Cell>{fmt(r.updated_at)}</Table.Cell>
            <Table.Cell>{r.title ?? "—"}</Table.Cell>
            <Table.Cell>{r.user_sub}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default function AuditLogsPage() {
  return (
    <Flex direction="column" gap="4">
      <Heading size="5">审计日志</Heading>
      <Card style={{ background: "var(--bg-2)" }}>
        <Tabs.Root defaultValue="audit">
          <Tabs.List>
            <Tabs.Trigger value="audit">操作审计</Tabs.Trigger>
            <Tabs.Trigger value="conversations">用户对话</Tabs.Trigger>
          </Tabs.List>
          <div style={{ paddingTop: 12 }}>
            <Tabs.Content value="audit">
              <AuditTable />
            </Tabs.Content>
            <Tabs.Content value="conversations">
              <ConversationsTable />
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </Card>
    </Flex>
  );
}
