import { AlertDialog } from "../AlertDialog/AlertDialog";

type DeleteTransactionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTransactionDialog({
  isOpen,
  onClose,
  onConfirm,
}: DeleteTransactionDialogProps) {
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete transaction"
      text="Are you sure you want to delete transaction"
    />
  )
}