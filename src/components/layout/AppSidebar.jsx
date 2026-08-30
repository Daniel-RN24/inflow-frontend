import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Receipt,
  Tag,
  FolderTree,
  Wallet,
  ChevronDown,
  CircleDollarSignIcon,
  LogOutIcon,
  CircleUser,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

const NAV_ITEMS = [
  { name: "Dashboard", url: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Transacciones", url: "/admin/transacciones", icon: Receipt },
  { name: "Conceptos", url: "/admin/conceptos", icon: Tag },
  { name: "Categorias", url: "/admin/categorias", icon: FolderTree },
  { name: "Cuentas", url: "/admin/cuentas", icon: Wallet },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const isActive = (url, exact = false) =>
    exact ? pathname === url : pathname.startsWith(url);

  return (
    <Sidebar className="border-sidebar-border" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              render={
                <Link to="/admin" onClick={handleNavClick}>
                  <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-brand text-white ring-1 ring-white/10">
                    <CircleDollarSignIcon className="size-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate text-base font-semibold text-sidebar-foreground">
                      Fintrack
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/55">
                      Panel admin
                    </span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-sidebar-foreground/45">
            Gestión económica
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    size="lg"
                    isActive={isActive(item.url, item.exact)}
                    className="relative text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground after:absolute after:top-1/2 after:left-0 after:h-5 after:w-1 after:-translate-y-1/2 after:rounded-r-full after:bg-sidebar-primary after:opacity-0 after:transition-opacity data-active:after:opacity-100"
                    render={
                      <Link onClick={handleNavClick} to={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CircleUser />
                    <span className="truncate">{user?.nombre}</span>
                    <ChevronDown className="ml-auto group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent
                side="top"
                className="border-sidebar-border bg-sidebar text-sidebar-foreground"
              >
                <DropdownMenuItem>
                  <a href="/admin/perfil">Perfil</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOutIcon />
                  <button className="cursor-pointer" onClick={logout}>
                    Cerrar sesión
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}