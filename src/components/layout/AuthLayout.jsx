import { Outlet, Link } from "react-router-dom";
import { CircleDollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-10">
      {/* Fondo con gradiente y brillos */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(70%_100%_at_50%_0%,color-mix(in_oklch,var(--brand-1)_22%,transparent),transparent)]" />
      <div className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-700/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 size-48 rounded-full bg-cyan-400/10 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]" />

      <div className="relative flex w-full max-w-md flex-col">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md shadow-blue-500/40">
            <CircleDollarSign className="size-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Fintrack</span>
        </Link>

        <Card className="glass animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out shadow-2xl shadow-primary/10 ring-1 ring-border/60">
          <Outlet />
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fintrack. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}