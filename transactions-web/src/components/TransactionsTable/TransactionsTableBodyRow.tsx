import { IconButton } from "@mui/material";
import { TransactionStatus } from "../../models/Transaction";
import { StyledTableCell, StyledTableRow } from "../Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from "react";

type TransactionTableBodyRowProps = {
  id: string;
  amount: number;
  category: string;
  status: TransactionStatus,
  date: string,
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TransactionTableBodyRow({
  id,
  amount,
  category,
  status,
  date,
  onEdit,
  onDelete
}: TransactionTableBodyRowProps) {
  const handleOnEdit = useCallback(
    () => onEdit(id),
    [onEdit, id]
  )

  const handleOnDelete = useCallback(
    () => onDelete(id),
    [onDelete, id]
  )

  return (
    <StyledTableRow key={id}>
      <StyledTableCell component="th" scope="row">
        {id}
      </StyledTableCell>
      <StyledTableCell>{amount}</StyledTableCell>
      <StyledTableCell>{category}</StyledTableCell>
      <StyledTableCell>{status}</StyledTableCell>
      <StyledTableCell>{date}</StyledTableCell>
      <StyledTableCell>
        <IconButton
          size="large"
          onClick={handleOnEdit}
        >
          <EditIcon  />
        </IconButton>
        <IconButton
          size="large"
          onClick={handleOnDelete}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  )
}