import { useCallback, useMemo, useState } from "react";
import { TransactionsUiContext } from "@/features/transactions/context/transactionsUiContext";

export function TransactionsUiProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);

  const openCreate = useCallback(() => {
    setMode("create");
    setSelected(null);
    setOpen(true);
  }, []);

  const openEdit = useCallback((transaction) => {
    setMode("edit");
    setSelected(transaction);
    setOpen(true);
  }, []);

  const openDelete = useCallback((transaction) => {
    setMode("delete");
    setSelected(transaction);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setMode(null);
    setSelected(null);
  }, []);

  const value = useMemo(
    () => ({ open, mode, selected, openCreate, openEdit, openDelete, close }),
    [open, mode, selected, openCreate, openEdit, openDelete, close],
  );

  return (
    <TransactionsUiContext.Provider value={value}>
      {children}
    </TransactionsUiContext.Provider>
  );
}