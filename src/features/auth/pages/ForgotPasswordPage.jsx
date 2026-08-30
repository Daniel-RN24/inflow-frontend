import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alerta from "@/components/shared/Alerta";
import * as authApi from "@/features/auth/api/authApi";
import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import { isEmail } from "@/lib/validation/validators";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmail(email)) {
      setAlerta({ msg: "Ingresa un email válido", error: true });
      return;
    }

    setSubmitting(true);
    setAlerta({});

    try {
      const res = await authApi.forgotPassword(email);
      setEnviado(true);
      setAlerta({ msg: res.msg, error: false });
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <AuthFormHeader
        icon={MessageSquareText}
        title="Recupera tu contraseña"
        description="Te enviaremos un email con las instrucciones para restaurarla."
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || enviado}
            className="mt-2 w-full"
          >
            {submitting
              ? "Enviando..."
              : enviado
                ? "Enviado"
                : "Enviar instrucciones"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="px-0 pb-0">
        <p className="w-full text-center text-sm text-muted-foreground">
          <Link
            to="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Volver al inicio de sesión
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}