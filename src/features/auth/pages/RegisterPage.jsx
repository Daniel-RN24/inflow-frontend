import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alerta from "@/components/shared/Alerta";
import * as authApi from "@/features/auth/api/authApi";
import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { isEmail, minLength, notEmpty } from "@/lib/validation/validators";

const INITIAL_FORM = {
  nombre: "",
  email: "",
  password: "",
  repetirPassword: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleChange = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nombre, email, password, repetirPassword } = form;

    if (!notEmpty(nombre)) {
      setAlerta({ msg: "El nombre es obligatorio", error: true });
      return;
    }
    if (!isEmail(email)) {
      setAlerta({ msg: "Ingresa un email válido", error: true });
      return;
    }
    if (!minLength(password, 6)) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    setSubmitting(true);
    setAlerta({});

    try {
      await authApi.register({ nombre, email, password, roles_id: 2 });
      setAlerta({ msg: "Cuenta creada correctamente", error: false });
      setForm(INITIAL_FORM);
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <AuthFormHeader
        icon={UserPlus}
        title="Crea tu cuenta"
        description="Completa el formulario para comenzar a gestionar tus finanzas."
      />

      <CardContent>
        <Alerta alerta={alerta} />

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              autoComplete="name"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange("nombre")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange("email")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange("password")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="repetirPassword">Repetir contraseña</Label>
            <PasswordInput
              id="repetirPassword"
              autoComplete="new-password"
              value={form.repetirPassword}
              onChange={handleChange("repetirPassword")}
            />
          </div>

          <Button type="submit" disabled={submitting} className="mt-2 w-full">
            {submitting ? "Creando cuenta..." : "Registrarme"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="px-0 pb-0">
        <p className="w-full text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}