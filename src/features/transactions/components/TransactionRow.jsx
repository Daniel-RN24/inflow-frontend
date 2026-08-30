import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format/currency";

export default function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}) {
  const esIngreso = transaction.conceptos?.categorias?.tipo === "Ingreso";

  return (
    <TableRow>
      <TableCell>
        <div className="font-semibold">{transaction.descripcion}</div>
        <div className="text-xs text-muted-foreground">
          {transaction.conceptos?.nombre}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">
          {transaction.conceptos?.categorias?.nombre}
        </Badge>
      </TableCell>
      <TableCell className="text-center text-muted-foreground">
        {new Date(transaction.fecha).toLocaleString()}
      </TableCell>
      <TableCell className="text-center text-muted-foreground">
        {transaction.cuentas?.nombre}
      </TableCell>
      <TableCell className="text-center">
        <Badge variant={esIngreso ? "default" : "destructive"}>
          {transaction.conceptos?.categorias?.tipo}
        </Badge>
      </TableCell>
      <TableCell
        className={`text-right font-semibold ${
          esIngreso ? "text-emerald-400" : "text-destructive"
        }`}
      >
        {esIngreso ? "+" : "-"}
        {formatCurrency(transaction.valor)}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon-sm" onClick={onEdit}>
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}