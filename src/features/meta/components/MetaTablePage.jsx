import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Alerta from "@/components/shared/Alerta";
import { useAsync } from "@/lib/hooks/useAsync";

/**
 * Página simple de listado para recursos de catálogo
 * (categorías, conceptos y cuentas).
 */
export default function MetaTablePage({ title, description, fetchFn, columns }) {
  const { data, error, loading } = useAsync(fetchFn);
  const rows = data ?? [];

  return (
    <main className="flex flex-1 flex-col p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm font-medium text-muted-foreground">{description}</p>
        )}
      </div>

      {error && <Alerta alerta={{ msg: error.message, error: true }} />}

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No hay registros disponibles.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-linear-to-r from-primary/10 via-muted/40 to-muted/40">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={column.align === "right" ? "text-right text-muted-foreground" : "text-muted-foreground"}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.align === "right" ? "text-right font-semibold" : undefined}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}