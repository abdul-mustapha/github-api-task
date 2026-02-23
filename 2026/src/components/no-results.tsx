import { Stack, Text } from "@mantine/core";
import { SearchX } from "lucide-react";

interface NoResultsProps {
  query: string;
}

export function NoResults({ query }: NoResultsProps) {
  return (
    <Stack align="center" justify="center" py={64}>
      <SearchX size={48} color="var(--mantine-color-dimmed)" />
      <Text fw={600} size="lg">
        No results found
      </Text>
      <Text size="sm" c="dimmed">
        No repositories match &ldquo;{query}&rdquo;. Try a different search
        term.
      </Text>
    </Stack>
  );
}
