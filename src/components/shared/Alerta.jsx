import { useCallback, useEffect, useState } from "react";
import { AlertCircleIcon, CheckCircle2Icon, XIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

/**
 * Alerta reutilizable.
 *
 * - Con `autoCloseMs` se cierra sola (con animación) y llama a `onClose`.
 * - Sin `autoCloseMs` equivale a una alerta estática informativa.
 */
export default function Alerta({ alerta, onClose, autoCloseMs }) {
  const [closing, setClosing] = useState(false);
  const [prevAlerta, setPrevAlerta] = useState(alerta);

  if (alerta !== prevAlerta) {
    setPrevAlerta(alerta);
    setClosing(false);
  }

  const handleClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    if (!autoCloseMs || !alerta?.msg) return;
    const timer = setTimeout(handleClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [autoCloseMs, alerta, handleClose]);

  if (!alerta?.msg) return null;

  const isError = alerta.error ?? true;
  const Icon = isError ? AlertCircleIcon : CheckCircle2Icon;

  return (
    <Alert
      variant={isError ? "destructive" : "default"}
      role="alert"
      aria-live={isError ? "assertive" : "polite"}
      onAnimationEnd={() => {
        if (closing) onClose?.();
      }}
      className={cn(
        "relative pr-10",
        isError
          ? "bg-destructive/10 text-destructive"
          : "bg-primary/10 text-primary",
        closing
          ? "animate-out fade-out slide-out-to-top-2 fill-mode-forwards duration-200"
          : "animate-in fade-in slide-in-from-top-2 duration-300",
      )}
    >
      <Icon className="h-4 w-4" />
      <AlertTitle>{alerta.msg}</AlertTitle>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar alerta"
        className="absolute top-2 right-2 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
      >
        <XIcon className="size-4" />
      </button>
    </Alert>
  );
}