import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useCallback, useState } from "react";
import { TransactionModal } from "./TransactionModal";

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (amount: number, category: string) => void;
}

export function CreateTransactionModal({
  isOpen,
  onClose,
  onCreate
}: CreateTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

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

  const onSubmit = useCallback(
    () => {
      onCreate(+amount, category);
      onClose();
    },
    [onCreate, onClose, amount, category]
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
    </TransactionModal>
  )
}