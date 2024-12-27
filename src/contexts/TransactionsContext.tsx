import { createContext, useEffect, useState} from 'react';

interface Transaction {
  id: number;
 description: string;
 type: 'income' | 'outcome';
 price: number;
  category: string;
  createdAt: string;
}

interface TransactionContexType {
  transactions: Transaction[];
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext<TransactionContexType>(
  {} as TransactionContexType
);

export function TransactionProvider({ children }: TransactionProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
    async function loadTransactions() {
      const response = await fetch('http://localhost:3333/transactions');
      const data = await response.json();
      setTransactions(data);
    }
  
    useEffect(() => {
      loadTransactions();
       }, []);
  

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}