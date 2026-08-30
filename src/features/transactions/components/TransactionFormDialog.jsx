import { useEffect, useState } from "react";
import {
  AlignLeft,
  CalendarDays,
  Landmark,
  Loader2,
  Receipt,
  Tag,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import * as transactionsApi from "@/features/transactions/api/transactionsApi";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import Alerta from "@/components/shared/Alerta";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/format/currency";

function TransactionForm({ transaction, conceptsSelect, accountsSelect, onCancel, onSaved }) {
  const [descripcion, setDescripcion] = useState(transaction?.descripcion || "");
  const [valor, setValor] = useState(transaction?.valor || 0);
  const [cuenta, setCuenta] = useState(
    transaction?.cuentas_id != null ? String(transaction.cuentas_id) : "",
  );
  const [tipoTransaccion, setTipoTransaccion] = useState(
    transaction?.conceptos?.categorias?.tipo || null,
  );
  const [concepto, setConcepto] = useState(
    transaction?.conceptos_id != null ? String(transaction.conceptos_id) : "",
  );
  const [fecha, setFecha] = useState(
    transaction?.fecha ? new Date(transaction.fecha).toISOString().split("T")[0] : "",
  );
  const [alerta, setAlerta] = useState({});
  const [guardando, setGuardando] = useState(false);

  const conceptosFiltrados = conceptsSelect.filter((item) =>
    tipoTransaccion ? item.categorias?.tipo === tipoTransaccion : true,
  );

  const selectTipo = (nuevoTipo) => {
    setTipoTransaccion(nuevoTipo);
    if (concepto) {
      const item = conceptsSelect.find((c) => String(c.id) === String(concepto));
      if (item && item.categorias?.tipo !== nuevoTipo) {
        setConcepto("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([descripcion.trim(), concepto, cuenta, fecha.trim()].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (valor <= 0) {
      setAlerta({ msg: "El valor debe ser mayor que 0", error: true });
      return;
    }

    const payload = {
      fecha,
      descripcion,
      valor: parseInt(valor),
      conceptos_id: parseInt(concepto),
      cuentas_id: parseInt(cuenta),
    };

    setGuardando(true);
    setAlerta({});

    try {
      if (transaction) {
        await transactionsApi.updateTransaction(transaction.id, payload);
      } else {
        await transactionsApi.createTransaction(payload);
      }

      setAlerta({
        msg: transaction
          ? "Transacción actualizada"
          : "Transacción aprobada",
        error: false,
      });

      setTimeout(onSaved, 1200);
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
      setGuardando(false);
    }
  };

  const { msg } = alerta;
  const placeholderConcepto =
    conceptosFiltrados.length === 0 && tipoTransaccion
      ? `Sin conceptos de ${tipoTransaccion.toLowerCase()}`
      : "Seleccione un concepto";

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      {/* Cuerpo */}
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {/* Tipo de transacción */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1.5">
          <button
            type="button"
            aria-pressed={tipoTransaccion === "Ingreso"}
            onClick={() => selectTipo("Ingreso")}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              tipoTransaccion === "Ingreso"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-muted-foreground hover:bg-background hover:text-foreground"
            }`}
          >
            <TrendingUp className="size-4" />
            Ingreso
          </button>
          <button
            type="button"
            aria-pressed={tipoTransaccion === "Egreso"}
            onClick={() => selectTipo("Egreso")}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              tipoTransaccion === "Egreso"
                ? "bg-destructive text-white shadow-sm"
                : "text-muted-foreground hover:bg-background hover:text-foreground"
            }`}
          >
            <TrendingDown className="size-4" />
            Egreso
          </button>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <div className="relative">
            <AlignLeft className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="descripcion"
              placeholder="Ej: Pago de nómina"
              type="text"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Valor */}
        <div className="space-y-2">
          <Label htmlFor="valor">Valor</Label>
          <div className="relative">
            <span className="font-heading pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-2xl font-bold text-primary">
              $
            </span>
            <Input
              id="valor"
              type="number"
              step="1000"
              min="0"
              placeholder="0"
              value={valor}
              onChange={(event) =>
                setValor(event.target.value === "" ? 0 : parseInt(event.target.value))
              }
              className="h-14 pl-10 text-2xl font-bold"
            />
          </div>
          {valor > 0 && (
            <p className="text-xs text-muted-foreground">
              Equivale a{" "}
              <span className="font-medium text-foreground">
                {formatCurrency(valor)}
              </span>
            </p>
          )}
        </div>

        {/* Cuenta y Fecha */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cuenta">Cuenta</Label>
            <div className="relative">
              <Landmark className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
              <Select value={cuenta || null} onValueChange={setCuenta}>
                <SelectTrigger className="w-full pl-9" id="cuenta">
                  <SelectValue placeholder="Seleccione una cuenta" />
                </SelectTrigger>
                <SelectContent>
                  {accountsSelect.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(event) => setFecha(event.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Concepto */}
        <div className="space-y-2">
          <Label htmlFor="concepto">Concepto</Label>
          <div className="relative">
            <Tag className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <Select
              value={concepto || null}
              onValueChange={(value) => {
                setConcepto(value);
                const item = conceptsSelect.find(
                  (c) => String(c.id) === String(value),
                );
                setTipoTransaccion(item?.categorias?.tipo || null);
              }}
            >
              <SelectTrigger className="w-full pl-9" id="concepto">
                <SelectValue placeholder={placeholderConcepto} />
              </SelectTrigger>
              <SelectContent>
                {conceptosFiltrados.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {msg && <Alerta alerta={alerta} />}
      </div>

      {/* Footer */}
      <div className="flex shrink-0 items-center justify-end gap-3 border-t bg-muted/50 px-6 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={guardando}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={guardando}>
          {guardando && (
            <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
          )}
          {transaction ? "Guardar cambios" : "Guardar transacción"}
        </Button>
      </div>
    </form>
  );
}

export default function TransactionFormDialog({ transaction, onSaved }) {
  const { open, mode, close } = useTransactions();
  const [conceptsSelect, setConceptsSelect] = useState([]);
  const [accountsSelect, setAccountsSelect] = useState([]);

  useEffect(() => {
    let active = true;

    const loadOptions = async () => {
      try {
        const [concepts, accounts] = await Promise.all([
          transactionsApi.listConcepts(),
          transactionsApi.listAccounts(),
        ]);
        if (!active) return;
        setConceptsSelect(concepts);
        setAccountsSelect(accounts);
      } catch {
        // Los selects se mantienen vacíos; el aviso de validación guía al usuario.
      }
    };

    loadOptions();

    return () => {
      active = false;
    };
  }, []);

  const handleSaved = () => {
    onSaved?.();
    close();
  };

  const mostrado = open && mode !== "delete";

  return (
    <Dialog
      open={mostrado}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        {/* Header */}
        <header className="relative flex shrink-0 items-center justify-between gap-4 overflow-hidden bg-gradient-brand px-6 py-5">
          <div className="pointer-events-none absolute -top-16 -left-10 size-48 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 -bottom-16 size-40 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <Receipt className="size-5" />
            </div>
            <div>
              <DialogTitle className="font-heading text-lg leading-tight font-semibold text-white">
                {transaction ? "Editar transacción" : "Nueva transacción"}
              </DialogTitle>
              <p className="mt-0.5 text-sm text-white/75">
                {transaction
                  ? "Actualiza la información del movimiento"
                  : "Registra un nuevo movimiento en tu cuenta"}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={close}
            aria-label="Cerrar"
            className="relative shrink-0 text-white hover:bg-white/15 hover:text-white"
          >
            <X />
          </Button>
        </header>

        <TransactionForm
          key={mostrado ? transaction?.id ?? "nueva" : "cerrado"}
          transaction={mostrado ? transaction : null}
          conceptsSelect={conceptsSelect}
          accountsSelect={accountsSelect}
          onCancel={close}
          onSaved={handleSaved}
        />
      </DialogContent>
    </Dialog>
  );
}