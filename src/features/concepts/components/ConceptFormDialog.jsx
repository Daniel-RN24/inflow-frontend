import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useConcepts } from "../hooks/useConcepts";
import { List, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { listCategories } from "@/features/transactions/api/transactionsApi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import Alerta from "@/components/shared/Alerta";
import { createConcept, updateConcept } from "../api/conceptsApi";

const ConceptForm = ({ concept, onCancel, onSaved }) => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [selectCategoria, setSelectCategoria] = useState(undefined);
  const [guardando, setGuardando] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      setCategorias(await listCategories());
    };

    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !selectCategoria) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    const payload = {
      nombre,
      categorias_id: parseInt(selectCategoria),
    };

    setGuardando(true);
    setAlerta({});

    try {
      if (concept) {
        await updateConcept(concept.id, payload);
      } else {
        await createConcept(payload);
      }

      setAlerta({
        msg: concept ? "Concepto actualizado" : "Concepto creado",
        error: false,
      });

      setTimeout(onSaved, 1200);
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5">
        <div className="my-5">
          <Label className="my-2">Nombre</Label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre"
          />
        </div>
        <div className="my-5">
          <Label className="my-2">Categoria</Label>
          <NativeSelect
            value={selectCategoria}
            onChange={(e) => setSelectCategoria(e.target.value)}
            className="w-full"
          >
            <NativeSelectOption>Seleccione una categoria</NativeSelectOption>
            {categorias.map((categoria) => (
              <NativeSelectOption key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <div className="my-2">
          {alerta.msg && <Alerta alerta={alerta}></Alerta>}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-3 border-t bg-muted/50 px-6 py-4">
        <Button
          className="cursor-pointer"
          onClick={onCancel}
          variant="secondary"
        >
          Cancelar
        </Button>
        <Button className="cursor-pointer" type="submit">
          {concept ? "Guardar cambios" : "Guardar concepto"}
        </Button>
      </div>
    </form>
  );
};

const ConceptFormDialog = ({ concept, onSaved }) => {
  const { open, close } = useConcepts();

  function handleSaved() {
    onSaved?.();
    close();
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className={
          "flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-x"
        }
      >
        <header className="relative flex shrink-0 items-center justify-between gap-4 overflow-hidden bg-gradient-brand px-6 py-5">
          <div className="relative flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <List className="size-5" />
            </div>
            <div>
              <DialogTitle className="font-heading text-lg leading-tight font-semibold text-white">
                {concept ? "Editar concepto" : "Nuevo concepto"}
              </DialogTitle>
              <p className="mt-0.5 text-sm text-white/75">
                {concept
                  ? "Actualiza la información del movimiento"
                  : "Registra concepto para administrar tus transacciones"}
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
        <ConceptForm concept={concept} onCancel={close} onSaved={handleSaved} />
      </DialogContent>
    </Dialog>
  );
};

export default ConceptFormDialog;
