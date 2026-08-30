import { LogOut, Mail, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Spinner from "@/components/shared/Spinner";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading || !user) {
    return <Spinner label="Cargando perfil..." />;
  }

  return (
    <main className="flex flex-1 flex-col p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Mi perfil</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Información de tu cuenta
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-md shadow-blue-500/40">
            <User className="size-7" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
              <User className="size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Nombre</p>
                <p className="font-semibold">{user.nombre}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="truncate font-semibold">{user.email}</p>
              </div>
            </div>

            {user.roles?.nombre && (
              <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
                <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Rol</p>
                  <p className="font-semibold">{user.roles.nombre}</p>
                </div>
              </div>
            )}
          </div>

          <Button type="button" variant="destructive" className="w-full" onClick={logout}>
            <LogOut data-icon="inline-start" />
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}