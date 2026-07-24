import { Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/endpoints";
import { ErrorState, Loading } from "../components/States";

const LABELS: Record<string, string> = {
  database: "数据库连接",
  data_dir: "数据目录",
  knowledge_base: "知识库(Chroma)",
  api_key: "DASHSCOPE Key",
};

export default function SystemPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ["health"], queryFn: adminApi.health });
  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={(error as Error).message} />;

  return (
    <Flex direction="column" gap="4">
      <Heading size="5">系统状态</Heading>
      <Card style={{ background: "var(--bg-2)" }}>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>检查项</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>状态</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.entries(data?.checks ?? {}).map(([k, ok]) => (
              <Table.Row key={k}>
                <Table.Cell>{LABELS[k] ?? k}</Table.Cell>
                <Table.Cell>
                  <span className="pill">
                    <span className={`dot ${ok ? "ok" : "bad"}`} />
                    {ok ? "正常" : "异常"}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
      <Text size="2" color="gray">
        数据库:{data?.db_backend} · 身份系统:{data?.iam ?? "—"}
      </Text>
    </Flex>
  );
}
