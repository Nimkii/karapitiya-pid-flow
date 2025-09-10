import { useState } from "react";
import {
  Search,
  QrCode,
  Scan,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { validatePID } from "@/lib/pid";
import { useToast } from "@/hooks/use-toast";

interface TopBarProps {
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function TopBar({ title, breadcrumbs }: TopBarProps) {
  const [pidSearch, setPidSearch] = useState("");
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePidSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pidSearch.trim()) return;

    const validation = validatePID(pidSearch.trim());

    if (validation.isValid) {
      toast({
        title: "PID Found",
        description: `Navigating to patient ${pidSearch}`,
      });
      // Navigate to patient profile
      // router.push(`/patients/${pidSearch}`);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid PID",
        description: validation.error || "Please check the PID format",
      });
    }
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="md:hidden" />

          <div className="hidden md:block">
            {breadcrumbs ? (
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {index > 0 && (
                      <span className="text-muted-foreground">/</span>
                    )}
                    {crumb.href ? (
                      <a
                        href={crumb.href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-foreground font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            ) : title ? (
              <h1 className="text-lg font-semibold">{title}</h1>
            ) : null}
          </div>
        </div>

        {/* Center - PID Search */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handlePidSearch} className="relative">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter PID or scan (e.g. KTH-2508-00073-6)"
                  value={pidSearch}
                  onChange={(e) => setPidSearch(e.target.value)}
                  className="pl-10 pr-4 h-9"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 px-3"
                title="Scan QR Code"
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 p-0"
              >
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    Urgent: Bed W05-12 needs attention
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Patient KTH-2508-00045-2 • 5 min ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Lab results ready</p>
                  <p className="text-xs text-muted-foreground">
                    FBC report for PID KTH-2508-00032-8 • 15 min ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New admission pending</p>
                  <p className="text-xs text-muted-foreground">
                    Ward W03 • 1 hour ago
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.username || "User"} {user?.role && `(${user.role})`}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
