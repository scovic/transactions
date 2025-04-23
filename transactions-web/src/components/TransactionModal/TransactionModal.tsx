import { Box, Button, Modal, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export type CreateTransactionModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export function TransactionModal({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
}: PropsWithChildren<CreateTransactionModalProps>) {

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography sx={{ mb: 1 }} variant="h5" component="h2">
          {title}
        </Typography>
        <Box sx={{ py: 2}}>
          {children}
        </Box>
       
        <Button
          size="small"
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          style={{ marginLeft: '0.5rem' }}
          size="small"
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}