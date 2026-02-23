import {
  Modal,
  Group,
  Avatar,
  Text,
  Badge,
  SimpleGrid,
  Stack,
  Button,
  Accordion,
  ScrollArea,
  Skeleton,
  TypographyStylesProvider,
} from "@mantine/core";
import {
  Star,
  GitFork,
  CircleDot,
  Eye,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { formatNumber, timeAgo, getLanguageColor } from "@/lib/format";
import { fetchReadme } from "@/lib/github";
import type { Repository } from "@/types";

interface RepoModalProps {
  repo: Repository;
  opened: boolean;
  onClose: () => void;
}

export function RepoModal({ repo, opened, onClose }: RepoModalProps) {
  const { data: readme, isLoading: readmeLoading } = useQuery({
    queryKey: ["readme", repo.full_name],
    queryFn: () => fetchReadme(repo.full_name),
    enabled: opened,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <Avatar src={repo.owner.avatar_url} size={32} radius="xl" />
          <div>
            <Text fw={700} size="lg">
              {repo.full_name}
            </Text>
            <Text size="sm" c="dimmed">
              by {repo.owner.login}
            </Text>
          </div>
        </Group>
      }
      size="xl"
      centered
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {repo.description || "No description provided."}
        </Text>

        {repo.topics.length > 0 && (
          <Group gap="xs">
            {repo.topics.map((topic) => (
              <Badge key={topic} variant="light" size="sm">
                {topic}
              </Badge>
            ))}
          </Group>
        )}

        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
          <StatItem icon={Star} label="Stars" value={repo.stargazers_count} />
          <StatItem icon={GitFork} label="Forks" value={repo.forks_count} />
          <StatItem icon={Eye} label="Watchers" value={repo.watchers_count} />
          <StatItem
            icon={CircleDot}
            label="Issues"
            value={repo.open_issues_count}
          />
        </SimpleGrid>

        <Stack gap="xs">
          {repo.language && (
            <Group gap="xs">
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: getLanguageColor(repo.language),
                }}
              />
              <Text size="sm">{repo.language}</Text>
            </Group>
          )}
          <Group gap="xs">
            <Calendar size={16} color="var(--mantine-color-dimmed)" />
            <Text size="sm" c="dimmed">
              Created {timeAgo(repo.created_at)}
            </Text>
          </Group>
          <Group gap="xs">
            <Calendar size={16} color="var(--mantine-color-dimmed)" />
            <Text size="sm" c="dimmed">
              Last pushed {timeAgo(repo.pushed_at)}
            </Text>
          </Group>
        </Stack>

        <Accordion variant="contained">
          <Accordion.Item value="readme">
            <Accordion.Control>README</Accordion.Control>
            <Accordion.Panel>
              <ReadmeContent readme={readme} isLoading={readmeLoading} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Button
          component="a"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          leftSection={<ExternalLink size={16} />}
        >
          View on GitHub
        </Button>
      </Stack>
    </Modal>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Stack
      align="center"
      gap={4}
      p="sm"
      style={{
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: "var(--mantine-radius-md)",
      }}
    >
      <Icon size={16} color="var(--mantine-color-dimmed)" />
      <Text fw={600} size="lg">
        {formatNumber(value)}
      </Text>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
    </Stack>
  );
}

function ReadmeContent({
  readme,
  isLoading,
}: {
  readme: string | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <Stack gap="xs">
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
        <Skeleton height={16} width="60%" />
      </Stack>
    );
  }

  if (!readme) {
    return (
      <Text size="sm" c="dimmed" fs="italic">
        No README found.
      </Text>
    );
  }

  return (
    <ScrollArea h={400}>
      <TypographyStylesProvider>
        <Markdown>{readme}</Markdown>
      </TypographyStylesProvider>
    </ScrollArea>
  );
}
