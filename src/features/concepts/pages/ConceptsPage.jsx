import { Card } from "@/components/ui/card";
import HeaderConcept from "../components/HeaderConcept";
import { useConcepts } from "../hooks/useConcepts";
import { useConceptsData } from "../hooks/useConceptsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function ConceptsPage() {
  const { mode, selected, openEdit, openDelete, open } = useConcepts();
  const { page, setPage, concepts, setConcepts, error, loading, meta } =
    useConceptsData();
  return (
    <main className="flex flex-1 flex-col p-6 sm:p-8">
      <HeaderConcept />

      {loading && concepts.length == 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {concepts.map((concept) => 
              <TableRow key={concept.id}>
                <TableCell>{concept.categorias.tipo}</TableCell>
                <TableCell>{concept.nombre}</TableCell>
                <TableCell>{concept.categorias.nombre}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
