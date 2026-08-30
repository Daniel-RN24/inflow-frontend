import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import Alerta from "@/components/shared/Alerta";
import * as authApi from "@/features/auth/api/authApi";
import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { minLength } from "@/lib/validation/validators";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const [checking, setChecking] = useState(true);
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    let cancelled = false;

    const validateToken = async () => {
      try {
        await authApi.checkResetToken(token);
        if (!cancelled) setTokenValido(true);
      } catch (error) {
        if (cancelled) return;
        setAlerta({ msg: error.message, error: true });
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    validateToken();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const res = await authApi.resetPassword(token, password);
      setPasswordChanged(true);
      setAlerta({ msg: res.msg, error: false });
    } catch (error) {
      setAlerta({ msg: error.message, error: true });
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <AuthFormHeader
        icon={LockKeyhole}
        title="Nueva contraseña"
        description={
          tokenValido
            ? "Define una nueva contraseña para tu cuenta."
            : "El token ha expirado o no es válido."
        }
      />

      {tokenValido && !passwordChanged ? (
        <CardContent>
          <Alerta alerta={alerta} />

          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <PasswordInput
                id="password"
                label="Contraseña"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <PasswordInput
                id="repetirPassword"
                label="Repetir contraseña"
                autoComplete="new-password"
                value={repetirPassword}
                onChange={(event) => setRepetirPassword(event.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting || !tokenValido}
              className="mt-2 w-full"
            >
              {submitting ? "Guardando..." : "Guardar contraseña"}
            </Button>
          </form>
        </CardContent>
      ) : (
        <CardContent>
          <Alerta alerta={alerta} />
        </CardContent>
      )}

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