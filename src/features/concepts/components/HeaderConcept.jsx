import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConcepts } from "../hooks/useConcepts";

export default function HeaderConcept() {
  const { openCreate } = useConcepts();

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          Conceptos
        </h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Historial completo de conceptos
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button className="cursor-pointer" onClick={openCreate}>
          <Plus data-icon="inline-start" />
          Nuevo Concepto
        </Button>
      </div>
    </div>
  );
}
