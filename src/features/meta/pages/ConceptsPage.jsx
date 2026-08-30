import MetaTablePage from "@/features/meta/components/MetaTablePage";
import { listConceptos } from "@/features/meta/api/metaApi";

const columns = [
  { key: "id", header: "ID" },
  { key: "nombre", header: "Nombre" },
  {
    key: "categoria",
    header: "Categoría",
    render: (row) => row.categorias?.nombre ?? "—",
  },
];

export default function ConceptsPage() {
  return (
    <MetaTablePage
      title="Conceptos"
      description="Conceptos asociados a cada categoría"
      fetchFn={listConceptos}
      columns={columns}
    />
  );
}