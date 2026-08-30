import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FilterBar() {
  const [tipo, setTipo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const limpiar = () => {
    setTipo("todos");
    setBusqueda("");
    setCategoria("");
    setOrden("");
    setFechaDesde("");
    setFechaHasta("");
  };

  return (
    <Card className="mb-6 p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {/* Buscador */}
        <div className="relative lg:col-span-4">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar por descripción..."
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
        </div>

        {/* Tipo */}
        <div className="sm:col-span-2 lg:col-span-3">
          <Tabs value={tipo} onValueChange={setTipo}>
            <TabsList className="w-full">
              <TabsTrigger value="todos" className="flex-1">
                Todos
              </TabsTrigger>
              <TabsTrigger value="Ingreso" className="flex-1">
                Ingreso
              </TabsTrigger>
              <TabsTrigger value="Egreso" className="flex-1">
                Egreso
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Categoría */}
        <div className="lg:col-span-2">
          <Select value={categoria || null} onValueChange={setCategoria}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salario">Salario</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="alimentacion">Alimentación</SelectItem>
              <SelectItem value="servicios">Servicios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orden */}
        <div className="lg:col-span-3">
          <Select value={orden || null} onValueChange={setOrden}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fecha-desc">Fecha (Desc)</SelectItem>
              <SelectItem value="monto-max">Monto (Max)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fechas */}
        <div className="sm:col-span-2 lg:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full">
              <Calendar className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                type="date"
                value={fechaDesde}
                onChange={(event) => setFechaDesde(event.target.value)}
              />
            </div>
            <span className="px-1 text-sm text-muted-foreground">a</span>
            <div className="relative w-full">
              <Calendar className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                type="date"
                value={fechaHasta}
                onChange={(event) => setFechaHasta(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Limpiar */}
      <div className="mt-4 flex justify-end">
        <Button variant="link" size="sm" onClick={limpiar}>
          Limpiar filtros
        </Button>
      </div>
    </Card>
  );
}