import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Transaction, TransactionStatus } from "../../models/Transaction";
import { TransactionModal } from "./TransactionModal";
import { useCallback, useEffect, useState } from "react";
import { capitalize } from "../../utils/string";

type UpdateTransactionModalProps = {
  isOpen: boolean;
  selectedTransaction: Transaction | null;
  onClose: () => void;
  onUpdate: (updatedTransaction: Transaction) => void;
}

export function UpdateTransactionModal({
  isOpen,
  selectedTransaction,
  onClose,
  onUpdate
}: UpdateTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(TransactionStatus.PENDING);

  useEffect(
    () => {
      if (!selectedTransaction) return;

      setAmount(selectedTransaction.amount.toString())
      setCategory(selectedTransaction.category)
      setStatus(selectedTransaction.status);
    },
    [selectedTransaction]
  )

  const onAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => (
      setAmount(event.target.value)
    ),
    []
  )

  const onCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => (
      setCategory(event.target.value)
    ),
    []
  )

  const onStatusChange = useCallback(
    (event: SelectChangeEvent) => (
      setStatus(event.target.value as TransactionStatus)
    ),
    []
  )
  
  const onSubmit = useCallback(
    () => {
      if (!selectedTransaction) return;

      const updatedTransaction = {
        ...selectedTransaction,
        amount: +amount,
        category,
        status
      }
      console.log(updatedTransaction)
      onUpdate(updatedTransaction);
      onClose()
    },
    [onUpdate, onClose, amount, category, status, selectedTransaction]
  )
  
  return (
    <TransactionModal
      title="Create transaction"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <FormControl size="small" fullWidth  sx={{ mb: 2 }}>
        <InputLabel htmlFor="input-amount">Amount</InputLabel>
        <OutlinedInput
          id="input-amount"
          value={amount}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
          required
          onChange={onAmountChange}
        />
      </FormControl>

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel htmlFor="input-category">Category</InputLabel>
        <OutlinedInput
          id="input-category"
          value={category}
          label="Category"
          required
          onChange={onCategoryChange}
        />
      </FormControl>

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-status">Status</InputLabel>
        <Select
          labelId="select-status"
          id="select-status"
          value={status}
          label="Status"
          onChange={onStatusChange}
        >
          <MenuItem value={TransactionStatus.PENDING}>
          {capitalize(TransactionStatus.PENDING)}
          </MenuItem>
          <MenuItem value={TransactionStatus.COMPLETED}>
            {capitalize(TransactionStatus.COMPLETED)}
          </MenuItem>
        </Select>
      </FormControl>
    </TransactionModal>
  )
}