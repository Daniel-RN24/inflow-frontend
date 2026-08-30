import { Loader2 } from "lucide-react";

/** Loader de pantalla completa, usado como fallback de lazy load y guards. */
export default function Spinner({ label = "Cargando..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background"
    >
      <Loader2 className="size-6 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}