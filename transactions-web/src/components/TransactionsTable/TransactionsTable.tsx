import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { StyledTableCell } from "../Table/StyledTableCell"
import { TransactionStatus } from "../../models/Transaction";
import { TransactionTableBodyRow } from "./TransactionsTableBodyRow";

const headers = [
  "Id",
  "Amount",
  "Category",
  "Status",
  "Date",
]

type TransactionsTableRow = {
  id: string;
  amount: number;
  category: string;
  status: TransactionStatus;
  date: string;
}

type TransactionsTableProps = {
  rows: TransactionsTableRow[]
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TransactionsTable({ rows, onEdit, onDelete }: TransactionsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size='small' sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {headers.map(head => (
              <StyledTableCell key={head}>{head}</StyledTableCell>
            ))}
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TransactionTableBodyRow
              key={row.id}
              id={row.id}
              amount={row.amount}
              category={row.category}
              status={row.status}
              date={row.date}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}