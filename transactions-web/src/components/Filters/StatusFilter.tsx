import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";
import { capitalize } from "../../utils/string";
import { StatusFilterOption } from "./types";

type StatusFilterProps = {
  selectedFilterOption: StatusFilterOption;
  onChange: (option: StatusFilterOption) => void;
}

export function StatusFilter({
  selectedFilterOption,
  onChange,
}: StatusFilterProps) {

  const handleOnChange = useCallback(
    (event: SelectChangeEvent) => (
      onChange(event.target.value as StatusFilterOption)
    ),
    [onChange]
  )

  return (
    <FormControl size="small" fullWidth sx={{ mb: 2 }}>
      <InputLabel id="select-status-filter">Filter by status</InputLabel>
      <Select
        labelId="select-status-filter"
        id="select-status-filter"
        value={selectedFilterOption}
        label="Filter by status"
        onChange={handleOnChange}
      >
        <MenuItem value={StatusFilterOption.ALL}>
          {capitalize(StatusFilterOption.ALL)}
        </MenuItem>
        <MenuItem value={StatusFilterOption.PENDING}>
          {capitalize(StatusFilterOption.PENDING)}
        </MenuItem>
        <MenuItem value={StatusFilterOption.COMPLETED}>
          {capitalize(StatusFilterOption.COMPLETED)}
        </MenuItem>
      </Select>
    </FormControl>
  )
}