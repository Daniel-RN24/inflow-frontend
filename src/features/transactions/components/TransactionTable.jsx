import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionRow from "@/features/transactions/components/TransactionRow";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-linear-to-r from-primary/10 via-muted/40 to-muted/40">
            <TableHead className="text-muted-foreground">Descripción</TableHead>
            <TableHead className="text-muted-foreground">Categoría</TableHead>
            <TableHead className="text-center text-muted-foreground">Fecha</TableHead>
            <TableHead className="text-center text-muted-foreground">Cuenta</TableHead>
            <TableHead className="text-center text-muted-foreground">Tipo</TableHead>
            <TableHead className="text-center text-muted-foreground">Monto</TableHead>
            <TableHead className="text-right text-muted-foreground"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={() => onEdit(transaction)}
              onDelete={() => onDelete(transaction)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}