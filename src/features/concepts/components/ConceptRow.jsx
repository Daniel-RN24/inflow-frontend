import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useConcepts } from "../hooks/useConcepts";
import { Button } from "@/components/ui/button";

const ConceptRow = ({ concept }) => {
  const { openEdit } = useConcepts();
  return (
    <TableRow>
      <TableCell>{concept.categorias.tipo}</TableCell>
      <TableCell>{concept.nombre}</TableCell>
      <TableCell>{concept.categorias.nombre}</TableCell>
      <TableCell>
        <div className="flex gap-3">
          <Button
            className="cursor-"
            onClick={() => openEdit(concept)}
            size="icon-sm"
            variant="ghost"
          >
            <Pencil className="text-sm" />
          </Button>

          <Button size="icon-sm" variant="ghost">
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ConceptRow;
