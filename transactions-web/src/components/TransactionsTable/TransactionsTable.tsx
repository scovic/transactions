import { Box, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { StyledTableCell } from "../Table/StyledTableCell"
import { TransactionStatus } from "../../models/Transaction";
import { TransactionTableBodyRow } from "./TransactionsTableBodyRow";
import { useMemo, useState } from "react";
import { StyledTableRow } from "../Table";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows],
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
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
            {visibleRows.map((row) => (
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
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 61 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}