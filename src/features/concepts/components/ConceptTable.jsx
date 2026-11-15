import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import ConceptRow from "./ConceptRow";

const ConceptTable = ({ concepts }) => {
  return (
    <div className="bg-card rounded-t-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-linear-to-r from-primary/10 via-muted/40 to-muted/40">
            <TableHead>Tipo</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {concepts.map((concept) => (
            <ConceptRow key={concept.id} concept={concept} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConceptTable;
