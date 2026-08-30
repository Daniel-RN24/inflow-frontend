import { Outlet } from "react-router-dom";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";

export default function PrivateLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="glass sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/60 px-4 sm:px-6">
          <SidebarTrigger />
        </header>

        <div className="relative flex min-h-svh flex-1 flex-col overflow-hidden bg-background">
          {/* Brillos decorativos del fondo */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_oklch,var(--brand-1)_9%,transparent),transparent)]" />
          <div className="pointer-events-none absolute -right-24 top-40 size-96 rounded-full bg-brand-2/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 top-2/3 size-96 rounded-full bg-brand-1/10 blur-3xl" />

          <div className="relative z-10 flex flex-1 flex-col">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}