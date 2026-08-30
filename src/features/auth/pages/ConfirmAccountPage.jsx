import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import Alerta from "@/components/shared/Alerta";
import * as authApi from "@/features/auth/api/authApi";
import AuthFormHeader from "@/features/auth/components/AuthFormHeader";

export default function ConfirmAccountPage() {
  const { token } = useParams();

  const [checking, setChecking] = useState(true);
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    let cancelled = false;

    const confirm = async () => {
      try {
        await authApi.confirmAccount(token);
        if (!cancelled) {
          setCuentaConfirmada(true);
          setAlerta({
            msg: "Tu cuenta ha sido confirmada, ya puedes iniciar sesión.",
            error: false,
          });
        }
      } catch (error) {
        if (!cancelled) setAlerta({ msg: error.message, error: true });
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    confirm();

    return () => {
      cancelled = true;
    };
  }, [token]);

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
        icon={ShieldCheck}
        title="Confirmación de cuenta"
        description={
          cuentaConfirmada
            ? "Todo listo para que empieces a usar Fintrack."
            : "No pudimos confirmar tu cuenta."
        }
      />

      <CardContent>
        <Alerta alerta={alerta} />
      </CardContent>

      <CardFooter className="px-0 pb-0">
        <p className="w-full text-center text-sm text-muted-foreground">
          <Link
            to="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Ir al inicio de sesión
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}