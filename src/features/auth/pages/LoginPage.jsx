import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alerta from "@/components/shared/Alerta";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { isEmail, notEmpty } from "@/lib/validation/validators";

const INITIAL_FORM = { email: "", password: "" };

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/admin";

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleChange = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmail(form.email)) {
      setAlerta({ msg: "Ingresa un email válido", error: true });
      return;
    }
    if (!notEmpty(form.password)) {
      setAlerta({ msg: "Ingresa tu contraseña", error: true });
      return;
    }

    setSubmitting(true);
    setAlerta({});

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <AuthFormHeader
        icon={LogIn}
        title="Inicia sesión"
        description="Accede a tu panel para gestionar tus finanzas."
      />

      <CardContent>
        <Alerta alerta={alerta} />

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                to="/olvide-password"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Olvidé mi contraseña
              </Link>
            </div>
            <PasswordInput
              id="password"
              value={form.password}
              onChange={handleChange("password")}
            />
          </div>

          <Button type="submit" disabled={submitting} className="mt-2 w-full">
            {submitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-3 px-0 pb-0">
        <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>o</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/registrarse"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}