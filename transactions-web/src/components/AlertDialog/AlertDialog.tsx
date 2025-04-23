import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type AlertDialogProps = {
  isOpen: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function AlertDialog({
  isOpen,
  title,
  text,
  onClose,
  onConfirm
}: AlertDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button 
          color="error"
          variant="contained"
          onClick={onConfirm} 
          autoFocus 
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}