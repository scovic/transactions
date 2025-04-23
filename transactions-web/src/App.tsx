import { useEffect, useState } from "react";
import { createTransaction, deleteTransaction, findAllTransactions, updateTransaction } from "./api/transactions";
import { TransactionsTable } from "./components/TransactionsTable";
import { Transaction } from "./models/Transaction";
import { Box, Button } from "@mui/material";
import { CreateTransactionModal } from "./components/TransactionModal/CreateTransactionModal";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog/DeleteTransactionDialog";
import { UpdateTransactionModal } from "./components/TransactionModal/UpdateTransacitionModal";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);



  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(
    () => {
      findAllTransactions()
        .then(trans => setTransactions(trans || []))
    },
    []
  );

  const onEdit = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    setSelectedTransaction(transaction || null);
    setIsUpdateModalOpen(true);
  }

  const onDelete = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    setSelectedTransaction(transaction || null);
    setIsDeleteDialogOpen(true);
  }

  const onDeleteConfirmation = async () => {
    if (!selectedTransaction) return;

    await deleteTransaction(selectedTransaction.id);
    setSelectedTransaction(null);
    setIsDeleteDialogOpen(false);
    setTransactions(
      transactions => transactions.filter(t => t.id !== selectedTransaction.id)
    )
  }

  const onCreate = async (amount: number, category: string) => {
    const transaction = await createTransaction({
      amount,
      category
    })

    setTransactions(trans => [...trans, transaction]);
  }

  const onUpdate = async (updatedTransaction: Transaction) => {
    const transaction = await updateTransaction(updatedTransaction);

    setTransactions(trans => (
      trans.map(t => {
        if (t.id === transaction.id) {
          return transaction
        }

        return t
      })
    ));
    setSelectedTransaction(null);
  }

  const onUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedTransaction(null);
  }

  const onDeleteTransactionDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTransaction(null);
  }

  return (
    <Box sx={{ p: 1}}>
      <Button
        sx={{ mb: 2 }}
        size="small"
        variant="contained"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create
      </Button>
      <TransactionsTable
        rows={transactions} 
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={onCreate}
      />

      <UpdateTransactionModal
        isOpen={isUpdateModalOpen && !!selectedTransaction}
        selectedTransaction={selectedTransaction}
        onClose={onUpdateModalClose}
        onUpdate={onUpdate}
      />
      
      <DeleteTransactionDialog
        isOpen={isDeleteDialogOpen && !!selectedTransaction}
        onClose={onDeleteTransactionDialogClose}
        onConfirm={onDeleteConfirmation}
      />
    </Box>
  )
}

export default App
