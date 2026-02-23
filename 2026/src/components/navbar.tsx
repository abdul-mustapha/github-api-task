import { Group, Text } from "@mantine/core";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <Group
      justify="space-between"
      h={56}
      px="md"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid var(--mantine-color-default-border)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Group gap="xs">
        <Github size={20} />
        <Text fw={600}>GitHub Search</Text>
      </Group>
      <ThemeToggle />
    </Group>
  );
}
