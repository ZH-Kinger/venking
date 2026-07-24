import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/endpoints";
import { EmptyState, ErrorState, Loading } from "../components/States";

export default function FeedbackPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ["feedback"], queryFn: () => adminApi.feedback(100) });
  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={(error as Error).message} />;

  return (
    <Flex direction="column" gap="4">
      <Heading size="5">用户反馈(只读)</Heading>
      {!data?.items.length ? (
        <EmptyState label="暂无反馈" />
      ) : (
        <Flex direction="column" gap="3">
          {data.items.map((f, i) => (
            <Card key={i} style={{ background: "var(--bg-2)" }}>
              <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                  <Badge color={f.verdict === "up" ? "green" : "red"}>
                    {f.verdict === "up" ? "👍 好评" : "👎 差评"}
                  </Badge>
                  {f.mode && <Badge variant="soft" color="indigo">{f.mode}</Badge>}
                  {f.ts && <Text size="1" color="gray">{f.ts}</Text>}
                </Flex>
                {f.question && <Text size="2"><b>问:</b>{f.question}</Text>}
                {f.correction && (
                  <Text size="2" color="amber"><b>纠正:</b>{f.correction}</Text>
                )}
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
