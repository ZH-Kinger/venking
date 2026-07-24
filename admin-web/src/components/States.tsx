import { Callout, Flex, Spinner, Text } from "@radix-ui/themes";

export function Loading({ label = "加载中…" }: { label?: string }) {
  return (
    <Flex align="center" gap="2" py="6" justify="center">
      <Spinner />
      <Text color="gray">{label}</Text>
    </Flex>
  );
}

export function EmptyState({ label = "暂无数据" }: { label?: string }) {
  return (
    <Flex align="center" justify="center" py="6">
      <Text color="gray">{label}</Text>
    </Flex>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <Callout.Root color="red" role="alert">
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
}
