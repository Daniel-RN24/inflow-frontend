import { Loader2 } from "lucide-react";
import Alerta from "@/components/shared/Alerta";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { useTransactionsData } from "@/features/transactions/hooks/useTransactionsData";
import HeaderTransaction from "@/features/transactions/components/HeaderTransaction";
import FilterBar from "@/features/transactions/components/FilterBar";
import SummaryCardsTransaction from "@/features/transactions/components/SummaryCardsTransaction";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import TransactionCards from "@/features/transactions/components/TransactionCards";
import PaginationFooter from "@/features/transactions/components/PaginationFooter";
import TransactionFormDialog from "@/features/transactions/components/TransactionFormDialog";
import DeleteTransactionDialog from "@/features/transactions/components/DeleteTransactionDialog";

export default function TransactionsPage() {
  const { mode, selected, openEdit, openDelete } = useTransactions();
  const { transactions, meta, stats, page, setPage, loading, error, refresh } =
    useTransactionsData();

  return (
    <main className="flex flex-1 flex-col p-6 sm:p-8">
      {/* Modales de transacción */}
      <TransactionFormDialog
        transaction={mode === "edit" ? selected : null}
        onSaved={refresh}
      />
      <DeleteTransactionDialog transaction={selected} onDeleted={refresh} />

      {/* Header */}
      <HeaderTransaction />

      {error && <Alerta alerta={{ msg: error.message, error: true }} />}

      {/* Filtros */}
      <FilterBar />

      {/* Resumen */}
      <SummaryCardsTransaction
        ingresos={stats.ingresos}
        egresos={stats.egresos}
        balance={stats.balance}
      />

      {loading && transactions.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Vista móvil tipo cards */}
          <div className="space-y-4 md:hidden">
            <TransactionCards
              transactions={transactions}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          </div>

          {/* Tabla en Desktop */}
          <div className="hidden md:block">
            <TransactionTable
              transactions={transactions}
              onEdit={openEdit}
              onDelete={openDelete}
            />
            <PaginationFooter meta={meta} page={page} setPage={setPage} />
          </div>
        </>
      )}
    </main>
  );
}