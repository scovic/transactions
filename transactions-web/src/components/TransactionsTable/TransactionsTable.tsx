import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { StyledTableCell } from "../Table/StyledTableCell"
import { StyledTableRow } from "../Table/StyledTableRow"

const headers = [
  "Id",
  "Amount",
  "Category",
  "Status",
  "Date"
]

type TransactionsTableRow = {
  id: string;
  amount: number;
  category: string;
  status: 'pending' | 'completed'
  date: string;
}

type TransactionsTableProps = {
  rows: TransactionsTableRow[]
}

export function TransactionsTable({ rows }: TransactionsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size='small' sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
          {headers.map(head => (
            <StyledTableCell>{head}</StyledTableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}