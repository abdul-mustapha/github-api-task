import { Card, Text, Group, Badge, Avatar } from "@mantine/core";
import { Star, GitFork, CircleDot, ExternalLink } from "lucide-react";
import { formatNumber, timeAgo, getLanguageColor } from "@/lib/format";
import type { Repository } from "@/types";

interface RepoCardProps {
  repo: Repository;
  onClick?: () => void;
}

export function RepoCard({ repo, onClick }: RepoCardProps) {
  return (
    <Card
      shadow="xs"
      padding="md"
      radius="md"
      withBorder
      onClick={onClick}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
    >
      <Group justify="space-between" gap="xs" wrap="nowrap" mb="xs">
        <Group gap="xs" wrap="nowrap" style={{ minWidth: 0 }}>
          <Avatar src={repo.owner.avatar_url} size={20} radius="xl" />
          <Text
            size="sm"
            fw={600}
            truncate
            component="a"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {repo.full_name}
          </Text>
        </Group>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ color: "var(--mantine-color-dimmed)", flexShrink: 0 }}
        >
          <ExternalLink size={14} />
        </a>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
        {repo.description || "No description provided."}
      </Text>

      <Group gap="xs" mt="sm" wrap="wrap">
        {repo.language && (
          <Badge
            variant="light"
            size="sm"
            leftSection={
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: getLanguageColor(repo.language),
                }}
              />
            }
          >
            {repo.language}
          </Badge>
        )}
        <Text size="xs" c="dimmed">
          Updated {timeAgo(repo.pushed_at)}
        </Text>
      </Group>

      <Group gap="md" mt="xs">
        <Group gap={4}>
          <Star size={14} color="var(--mantine-color-dimmed)" />
          <Text size="xs" c="dimmed">
            {formatNumber(repo.stargazers_count)}
          </Text>
        </Group>
        <Group gap={4}>
          <GitFork size={14} color="var(--mantine-color-dimmed)" />
          <Text size="xs" c="dimmed">
            {formatNumber(repo.forks_count)}
          </Text>
        </Group>
        {repo.open_issues_count > 0 && (
          <Group gap={4}>
            <CircleDot size={14} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              {formatNumber(repo.open_issues_count)}
            </Text>
          </Group>
        )}
      </Group>
    </Card>
  );
}
