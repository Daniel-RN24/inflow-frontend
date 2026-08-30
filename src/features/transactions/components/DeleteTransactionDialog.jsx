import { useState } from "react";
import { Trash2, TriangleAlert } from "lucide-react";
import * as transactionsApi from "@/features/transactions/api/transactionsApi";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import Alerta from "@/components/shared/Alerta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/format/currency";

export default function DeleteTransactionDialog({ transaction, onDeleted }) {
  const { open, mode, close } = useTransactions();
  const [alerta, setAlerta] = useState({});

  const mostrado = open && mode === "delete";

  const handleClick = async () => {
    if (!transaction) return;

    try {
      await transactionsApi.deleteTransaction(transaction.id);
      setAlerta({ msg: "Transacción eliminada con éxito", error: false });

      setTimeout(() => {
        onDeleted?.();
        close();
      }, 1000);
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
    }
  };

  const { msg } = alerta;
  const esIngreso = transaction?.conceptos?.categorias?.tipo === "Ingreso";

  return (
    <Dialog
      open={mostrado}
      onOpenChange={(isOpen) => {
        if (!isOpen && !msg) close();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <TriangleAlert className="size-6" />
          </div>
          <DialogTitle className="mt-2">
            ¿Eliminar esta transacción?
          </DialogTitle>
          <DialogDescription>
            Esta acción es permanente y no podrá deshacerse. Asegúrate de que
            deseas eliminar este movimiento.
          </DialogDescription>
        </DialogHeader>

        {transaction && (
          <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Descripción
                </p>
                <p className="mt-1 font-heading font-semibold">
                  {transaction.descripcion}
                </p>
              </div>
              <Badge variant={esIngreso ? "default" : "destructive"}>
                {transaction.conceptos.categorias.tipo}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Monto
                </p>
                <p
                  className={`font-heading mt-1 text-lg font-bold ${
                    esIngreso ? "text-emerald-400" : "text-destructive"
                  }`}
                >
                  {esIngreso ? "+" : "-"}
                  {formatCurrency(transaction.valor)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Fecha
                </p>
                <p className="mt-1 font-medium">
                  {new Date(transaction.fecha).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t pt-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Concepto
                </p>
                <p className="mt-1 text-sm">{transaction.conceptos.nombre}</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Categoría
                </p>
                <p className="mt-1 text-sm">
                  {transaction.conceptos.categorias.nombre}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Cuenta
                </p>
                <p className="mt-1 text-sm">{transaction.cuentas.nombre}</p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (!msg) close();
            }}
          >
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleClick}>
            <Trash2 data-icon="inline-start" />
            Sí, eliminar
          </Button>
        </DialogFooter>

        {msg && <Alerta alerta={alerta} />}

        <p className="text-xs text-muted-foreground italic">
          Esta transacción se eliminará de todos tus reportes y estadísticas.
        </p>
      </DialogContent>
    </Dialog>
  );
}