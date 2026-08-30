import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format/currency";

export default function SummaryCardsTransaction({ ingresos, egresos, balance }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Total Ingresos
            </p>
            <p className="font-heading mt-1 text-2xl font-bold">
              {formatCurrency(ingresos)}
            </p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/40 transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="size-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Total Egresos
            </p>
            <p className="font-heading mt-1 text-2xl font-bold">
              {formatCurrency(egresos)}
            </p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/40 transition-transform duration-300 group-hover:scale-110">
            <ArrowDownRight className="size-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
        <CardContent className="flex items-center justify-between gap-4 p-6">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Balance
            </p>
            <p className="font-heading mt-1 text-2xl font-bold">
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-md shadow-blue-500/40 transition-transform duration-300 group-hover:scale-110">
            <Wallet className="size-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}