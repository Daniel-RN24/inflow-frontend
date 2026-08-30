export default function KpiCard({ icon, title, value, tone = "bg-primary/10 text-primary" }) {
  const Icon = icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-primary/20">
      <div className="pointer-events-none absolute -top-10 right-0 size-28 rounded-full bg-linear-to-br from-primary/15 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl shadow-md ${tone}`}>
        <Icon className="size-5" />
      </div>
      <p className="relative mt-5 text-sm font-medium text-muted-foreground">{title}</p>
      <p className="relative mt-1 font-heading text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}