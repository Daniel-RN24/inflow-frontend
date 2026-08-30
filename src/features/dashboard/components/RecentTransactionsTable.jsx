import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format/currency";

function Row({ transaction }) {
  const { id, descripcion, fecha, valor, conceptos } = transaction;
  const esIngreso = conceptos?.categorias?.tipo === "Ingreso";
  const categoria = conceptos?.categorias?.nombre ?? "Sin categoría";

  return (
    <TableRow key={id}>
      <TableCell>
        <div className="font-semibold">{descripcion}</div>
        <div className="text-xs text-muted-foreground">{categoria}</div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(fecha).toLocaleDateString()}
      </TableCell>
      <TableCell className={`text-right font-semibold ${esIngreso ? "text-emerald-400" : "text-destructive"}`}>
        {esIngreso ? "+" : "-"}
        {formatCurrency(valor)}
      </TableCell>
    </TableRow>
  );
}

export default function RecentTransactionsTable({ transactions }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Descripción</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <Row key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  );
}