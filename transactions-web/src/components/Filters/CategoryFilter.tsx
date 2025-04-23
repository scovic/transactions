import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { capitalize } from "../../utils/string";
import { useCallback } from "react";

type CategoryFilterProps = {
  selectedCategory: string;
  categories: string[];
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onChange
}: CategoryFilterProps) {

  const handleOnChange = useCallback(
    (event: SelectChangeEvent) => (
      onChange(event.target.value)
    ),
    [onChange]
  )

  return (
    <FormControl size="small" fullWidth sx={{ mb: 2 }}>
      <InputLabel id="select-category-filter">Filter by category</InputLabel>
      <Select
        labelId="select-category-filter"
        id="select-category-filter"
        value={selectedCategory}
        label="Filter by category"
        onChange={handleOnChange}
      >
        <MenuItem value='none'>
          None
        </MenuItem>
        {categories.map(category => (
          <MenuItem value={category}>
            {capitalize(category)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}