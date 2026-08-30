import { Link } from "react-router-dom";
import { Banknote, Loader2, Scale, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Alerta from "@/components/shared/Alerta";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import KpiCard from "@/features/dashboard/components/KpiCard";
import RecentTransactionsTable from "@/features/dashboard/components/RecentTransactionsTable";
import FinancialChart from "@/features/dashboard/charts/FinancialChart";
import PieChart from "@/features/dashboard/charts/PieChart";
import BarComparativa from "@/features/dashboard/charts/BarComparativa";
import { formatCurrency } from "@/lib/format/currency";

function LoadingDashboard() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  );
}

export default function DashboardPage() {
  const { data, error, loading } = useDashboardData();
  const cargando = loading && !data;

  const resumenAnual = data?.resumenAnual ?? {};
  const resumenMensual = data?.resumenMensual;
  const balanceMensual = data?.balanceMensual;
  const gastosPorCategoria = data?.gastosPorCategoria;
  const ultimasTransacciones = data?.ultimasTransacciones ?? [];

  return (
    <main className="flex flex-1 flex-col p-6 sm:p-8">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Analiza tus gráficas y toma decisiones financieras
          </p>
        </div>

        {error && <Alerta alerta={{ msg: error.message, error: true }} />}

        {cargando ? (
          <LoadingDashboard />
        ) : (
          <>
            {/* KPI Grid */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                icon={TrendingUp}
                title="Ingresos del mes"
                value={formatCurrency(resumenAnual.ingresos)}
                tone="bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/40"
              />
              <KpiCard
                icon={TrendingDown}
                title="Egresos del mes"
                value={formatCurrency(resumenAnual.egresos)}
                tone="bg-linear-to-br from-rose-500 to-red-600 text-white shadow-rose-500/40"
              />
              <KpiCard
                icon={Scale}
                title="Balance"
                value={formatCurrency(resumenAnual.balance)}
                tone="bg-gradient-brand text-white shadow-blue-500/40"
              />
              <KpiCard
                icon={Banknote}
                title="Tasa de Ahorro"
                value="51.8%"
                tone="bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/40"
              />
            </section>

            {/* Middle Section: Charts */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-10">
              {/* Area/Line Chart (60%) */}
              <Card className="lg:col-span-6">
                <CardHeader>
                  <CardTitle className="text-lg">Evolución de flujo de caja</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {resumenMensual && balanceMensual && (
                      <FinancialChart
                        labels={resumenMensual.labels}
                        ingresos={resumenMensual.datasets[0].data}
                        egresos={resumenMensual.datasets[1].data}
                        balance={balanceMensual.datasets[0].data}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Donut Chart (40%) */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="text-lg">Gastos por categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    {gastosPorCategoria && (
                      <PieChart
                        labels={gastosPorCategoria.labels}
                        datasets={gastosPorCategoria.datasets}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Bottom Section */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Grouped Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comparativa mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    {resumenMensual && (
                      <BarComparativa
                        labels={resumenMensual.labels}
                        ingresos={resumenMensual.datasets[0].data}
                        egresos={resumenMensual.datasets[1].data}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions Table */}
              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Últimas transacciones</CardTitle>
                  <Button
                    variant="link"
                    className="px-0"
                    render={<Link to="/admin/transacciones">Ver todo</Link>}
                  />
                </CardHeader>
                <CardContent>
                  {ultimasTransacciones.length > 0 ? (
                    <RecentTransactionsTable transactions={ultimasTransacciones} />
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      Aún no hay transacciones registradas.
                    </p>
                  )}
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </main>
  );
}