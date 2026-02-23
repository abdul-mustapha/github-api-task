import { useState } from "react";
import { Group, TextInput, Select, CloseButton } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { Search } from "lucide-react";
import type { SearchParams, SortOption } from "@/types";

interface SearchFormProps {
  params: SearchParams;
  onChange: (params: SearchParams) => void;
  onClear: () => void;
}

const languages = [
  { value: "", label: "All languages" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
];

const sortOptions = [
  { value: "best-match", label: "Best match" },
  { value: "stars", label: "Most stars" },
  { value: "forks", label: "Most forks" },
  { value: "updated", label: "Recently updated" },
];

export function SearchForm({ params, onChange, onClear }: SearchFormProps) {
  const [inputValue, setInputValue] = useState(params.query);

  const debouncedQueryChange = useDebouncedCallback((query: string) => {
    onChange({ ...params, query: query.trim() });
  }, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedQueryChange(value);
  };

  const handleClear = () => {
    setInputValue("");
    onClear();
  };

  return (
    <Group gap="sm" align="flex-end" wrap="wrap">
      <TextInput
        placeholder="Search repositories..."
        leftSection={<Search size={16} />}
        rightSection={
          inputValue ? <CloseButton size="sm" onClick={handleClear} /> : null
        }
        value={inputValue}
        onChange={(e) => handleInputChange(e.currentTarget.value)}
        size="sm"
        style={{ flex: 1, minWidth: 200 }}
      />

      <Select
        data={languages}
        value={params.language}
        onChange={(val) => onChange({ ...params, language: val ?? "" })}
        size="sm"
        w={160}
        allowDeselect={false}
      />

      <Select
        data={sortOptions}
        value={params.sort}
        onChange={(val) =>
          onChange({ ...params, sort: (val as SortOption) ?? "best-match" })
        }
        size="sm"
        w={170}
        allowDeselect={false}
      />
    </Group>
  );
}
