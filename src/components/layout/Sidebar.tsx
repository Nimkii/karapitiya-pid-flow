import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Search,
  Building2,
  BedDouble,
  ClipboardList,
  FileText,
  Settings,
  UserCog,
  BarChart3,
  Shield,
  Stethoscope,
  Activity,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

// Mock current user - in production this would come from auth context
const currentUser = {
  role: 'registrar_clerk' as UserRole,
  name: 'Dr. Kumari Perera',
  ward: 'W01'
};

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: string;
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'registrar_clerk', 'ward_doctor', 'nurse']
  },
  {
    title: 'Register Patient',
    url: '/patients/register',
    icon: UserPlus,
    roles: ['registrar_clerk']
  },
  {
    title: 'Patient Search',
    url: '/patients',
    icon: Search,
    roles: ['admin', 'registrar_clerk', 'ward_doctor', 'nurse']
  },
  {
    title: 'New Admission',
    url: '/admissions/new',
    icon: BedDouble,
    roles: ['registrar_clerk']
  },
  {
    title: 'Current Admissions',
    url: '/admissions',
    icon: Building2,
    roles: ['admin', 'registrar_clerk', 'ward_doctor', 'nurse']
  },
  {
    title: 'Create Order',
    url: '/orders/create',
    icon: ClipboardList,
    roles: ['ward_doctor']
  },
  {
    title: 'Task Queue',
    url: '/orders/tasks',
    icon: Activity,
    roles: ['nurse'],
    badge: '12' // Mock pending tasks
  },
  {
    title: 'Medical Records',
    url: '/records',
    icon: FileText,
    roles: ['admin', 'ward_doctor', 'nurse']
  }
];

const adminItems: NavItem[] = [
  {
    title: 'User Management',
    url: '/admin/users',
    icon: UserCog,
    roles: ['admin']
  },
  {
    title: 'Ward Management',
    url: '/admin/wards',
    icon: Building2,
    roles: ['admin']
  },
  {
    title: 'Audit Logs',
    url: '/admin/audit',
    icon: Shield,
    roles: ['admin']
  },
  {
    title: 'Reports',
    url: '/admin/reports',
    icon: BarChart3,
    roles: ['admin']
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    return isActive(path)
      ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground';
  };

  const filteredNavItems = navigationItems.filter(item =>
    item.roles.includes(currentUser.role)
  );

  const filteredAdminItems = adminItems.filter(item =>
    item.roles.includes(currentUser.role)
  );

  return (
    <Sidebar className={cn(
      'border-r border-border transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <SidebarContent className="p-0">
        {/* Header */}
        <div className={cn(
          'flex items-center border-b border-border px-4 py-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Karapitiya PRMS</h2>
                <p className="text-xs text-muted-foreground">Teaching Hospital</p>
              </div>
            </div>
          )}
          <SidebarTrigger className="h-8 w-8" />
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {currentUser.role.replace('_', ' ')}
                  {currentUser.ward && ` • ${currentUser.ward}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                        getNavClassName(item.url)
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        {filteredAdminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                          getNavClassName(item.url)
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <span className="flex-1">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}