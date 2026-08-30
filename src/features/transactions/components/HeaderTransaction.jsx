import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";

export default function HeaderTransaction() {
  const { openCreate } = useTransactions();

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          Transacciones
        </h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Historial completo de movimientos
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button className="cursor-pointer" variant="outline">
          <Download data-icon="inline-start" />
          Exportar CSV
        </Button>
        <Button className="cursor-pointer" onClick={openCreate}>
          <Plus data-icon="inline-start" />
          Nueva Transacción
        </Button>
      </div>
    </div>
  );
}