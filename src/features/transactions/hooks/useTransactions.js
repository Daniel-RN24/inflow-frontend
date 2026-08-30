import { useContext } from "react";
import { TransactionsUiContext } from "@/features/transactions/context/transactionsUiContext";

export function useTransactions() {
  const context = useContext(TransactionsUiContext);
  if (!context) {
    throw new Error(
      "useTransactions debe usarse dentro de un <TransactionsUiProvider>",
    );
  }
  return context;
}