import { useEffect, useState } from "react";
import { findAllTransactions } from "./api/transactions";
import { TransactionsTable } from "./components/TransactionsTable/TransactionsTable";
import { Transaction } from "./models/Transaction";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(
    () => {
      findAllTransactions()
        .then(trans => setTransactions(trans || []))
    },
    []
  );

  return (
    <TransactionsTable rows={transactions} />
  )
}

export default App
