import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format/currency";

export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const esIngreso = transaction.conceptos?.categorias?.tipo === "Ingreso";

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="font-semibold">{transaction.descripcion}</p>
          <p className="text-sm text-muted-foreground">
            {transaction.conceptos?.nombre} •{" "}
            {transaction.conceptos?.categorias?.nombre}
          </p>
        </div>
        <Badge variant={esIngreso ? "default" : "destructive"}>
          {transaction.conceptos?.categorias?.tipo}
        </Badge>
      </CardContent>

      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Cuenta</p>
          <p className="text-sm font-medium">{transaction.cuentas?.nombre}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Fecha</p>
          <p className="text-sm font-medium">
            {new Date(transaction.fecha).toLocaleString()}
          </p>
        </div>
      </CardContent>

      <CardContent className="flex items-center justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">Monto</p>
        <div className="flex items-center gap-1">
          <p
            className={`font-heading text-lg font-bold ${
              esIngreso ? "text-emerald-400" : "text-destructive"
            }`}
          >
            {formatCurrency(transaction.valor)}
          </p>
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
      </CardContent>
    </Card>
  );
}