import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

export default function PaginationFooter({ meta, page, setPage }) {
  if (!meta || meta.total === 0) return null;

  return (
    <div className="flex flex-col gap-4 rounded-b-xl border border-t-0 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total)} de{" "}
        {meta.total} transacciones
      </p>

      <Pagination className="justify-start sm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={!meta.hasPrevPage}
              onClick={() => setPage((current) => current - 1)}
              aria-label="Página anterior"
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>

          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <Button
                variant={n === page ? "outline" : "ghost"}
                size="icon-sm"
                onClick={() => setPage(n)}
                className={
                  n === page
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : ""
                }
              >
                {n}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={!meta.hasNextPage}
              onClick={() => setPage((current) => current + 1)}
              aria-label="Página siguiente"
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}