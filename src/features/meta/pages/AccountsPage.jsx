import MetaTablePage from "@/features/meta/components/MetaTablePage";
import { listAccounts } from "@/features/meta/api/metaApi";
import { formatCurrency } from "@/lib/format/currency";

const columns = [
  { key: "id", header: "ID" },
  { key: "nombre", header: "Nombre" },
  { key: "tipo", header: "Tipo" },
  {
    key: "saldo_inicial",
    header: "Saldo inicial",
    align: "right",
    render: (row) => formatCurrency(row.saldo_inicial),
  },
];

export default function AccountsPage() {
  return (
    <MetaTablePage
      title="Cuentas"
      description="Cuentas bancarias y tipos de dinero"
      fetchFn={listAccounts}
      columns={columns}
    />
  );
}