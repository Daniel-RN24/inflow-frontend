import MetaTablePage from "@/features/meta/components/MetaTablePage";
import { listCategories } from "@/features/meta/api/metaApi";

const columns = [
  { key: "id", header: "ID" },
  { key: "nombre", header: "Nombre" },
  { key: "tipo", header: "Tipo" },
];

export default function CategoriesPage() {
  return (
    <MetaTablePage
      title="Categorías"
      description="Categorías de ingresos y egresos"
      fetchFn={listCategories}
      columns={columns}
    />
  );
}