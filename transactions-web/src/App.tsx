import { useEffect, useMemo, useState } from "react";
import { createTransaction, deleteTransaction, findAllTransactions, updateTransaction } from "./api/transactions";
import { TransactionsTable } from "./components/TransactionsTable";
import { Transaction } from "./models/Transaction";
import { Box, Button } from "@mui/material";
import { CreateTransactionModal } from "./components/TransactionModal/CreateTransactionModal";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog/DeleteTransactionDialog";
import { UpdateTransactionModal } from "./components/TransactionModal/UpdateTransactionModal";
import { StatusFilter, StatusFilterOption, CategoryFilter } from "./components/Filters";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [statusFilter, setStatusFilter] = useState(StatusFilterOption.ALL);
  const [categoryFilter, setCategoryFilter] = useState<string>('none');

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


  const handleStatusFilterChange = (statusFilter: StatusFilterOption) => {
    setStatusFilter(statusFilter);
  }
  
  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category)
  }

  const categories = useMemo(
    () => {
      const categoriesSet = new Set<string>();
      transactions.forEach(tr => {
        categoriesSet.add(tr.category);
      });

      return Array.from(categoriesSet);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions.length]
  )

  const filteredTransactions = transactions.filter(tr => {
    if (statusFilter === StatusFilterOption.ALL && categoryFilter === 'none') return true;

    if (statusFilter !== StatusFilterOption.ALL && categoryFilter === 'none') {
      return tr.status.toString() === statusFilter.toString();
    }

    if (statusFilter === StatusFilterOption.ALL && categoryFilter !== 'none') {
      return tr.category === categoryFilter
    }

    return tr.category === categoryFilter && tr.status.toString() === statusFilter.toString();
  })

  return (
    <Box sx={{ p: 1}}>
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{ mb: 2 }}
          size="small"
          variant="contained"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create
        </Button>
        <Box sx={{ ml: 1, width: '25%'}}>
          <StatusFilter
            selectedFilterOption={statusFilter}
            onChange={handleStatusFilterChange}
          />
        </Box >
        <Box sx={{ ml: 1, width: '25%' }}>
          <CategoryFilter
            categories={categories}
            selectedCategory={categoryFilter}
            onChange={handleCategoryFilterChange}
          />
        </Box>
      </Box>
      <TransactionsTable
        rows={filteredTransactions} 
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
