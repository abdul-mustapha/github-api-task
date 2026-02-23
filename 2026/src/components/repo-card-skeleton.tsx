import { Card, Skeleton, Group } from "@mantine/core";

export function RepoCardSkeleton() {
  return (
    <Card shadow="xs" padding="md" radius="md" withBorder>
      <Group gap="xs" mb="xs">
        <Skeleton height={20} circle />
        <Skeleton height={14} width="60%" />
      </Group>
      <Skeleton height={12} mb={6} />
      <Skeleton height={12} mb={6} />
      <Skeleton height={12} width="70%" mb="sm" />
      <Group gap="xs" mt="sm">
        <Skeleton height={20} width={80} radius="xl" />
        <Skeleton height={14} width={100} />
      </Group>
      <Group gap="md" mt="xs">
        <Skeleton height={14} width={40} />
        <Skeleton height={14} width={40} />
      </Group>
    </Card>
  );
}
