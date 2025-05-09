
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Clock,
  Users,
  User,
  Settings,
  Menu,
  ChevronLeft,
  LogOut,
  ClipboardList,
  Home,
  Bell,
  PanelRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "sidebar",
        collapsed && !showMobileMenu ? "sidebar-collapsed" : "",
        isMobile && !showMobileMenu ? "-translate-x-full" : "translate-x-0"
      )}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className={cn("flex items-center", collapsed && !showMobileMenu ? "justify-center" : "justify-between")}>
            {(!collapsed || showMobileMenu) && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">TeamsTime</span>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={toggleSidebar}
            >
              {collapsed && !showMobileMenu ? <PanelRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="sidebar-content">
          {/* Main Navigation */}
          <nav>
            <div className={cn("mb-2 px-3", collapsed && !showMobileMenu ? "text-center" : "text-left")}>
              {(!collapsed || showMobileMenu) && (
                <p className="sidebar-section">Navigation</p>
              )}
            </div>
            
            <SidebarLink 
              to="/dashboard" 
              icon={<BarChart3 size={20} />} 
              text="Dashboard" 
              active={isActive('/dashboard')}
              collapsed={collapsed && !showMobileMenu}
            />
            
            <SidebarLink 
              to="/projects" 
              icon={<Clock size={20} />} 
              text="Projects" 
              active={isActive('/projects')}
              collapsed={collapsed && !showMobileMenu}
            />

            <SidebarLink 
              to="/team" 
              icon={<Users size={20} />} 
              text="Team" 
              active={isActive('/team')}
              collapsed={collapsed && !showMobileMenu}
            />

            <SidebarLink 
              to="/timesheet" 
              icon={<ClipboardList size={20} />} 
              text="Timesheet" 
              active={isActive('/timesheet')}
              collapsed={collapsed && !showMobileMenu}
            />
            
            <div className={cn("mt-6 mb-2 px-3", collapsed && !showMobileMenu ? "text-center" : "text-left")}>
              {(!collapsed || showMobileMenu) && (
                <p className="sidebar-section">Account</p>
              )}
            </div>

            <SidebarLink 
              to="/profile" 
              icon={<User size={20} />} 
              text="Profile" 
              active={isActive('/profile')}
              collapsed={collapsed && !showMobileMenu}
            />

            <SidebarLink 
              to="/settings" 
              icon={<Settings size={20} />} 
              text="Settings" 
              active={isActive('/settings')}
              collapsed={collapsed && !showMobileMenu}
            />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300",
        !collapsed && !isMobile ? "ml-64" : "",
        collapsed && !isMobile ? "ml-16" : ""
      )}>
        {/* Top Navbar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background shadow-nav">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                <Menu size={20} />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-xl hidden sm:block">Teams<span className="text-primary">Time</span></h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell size={18} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-accent/50 cursor-pointer" asChild>
                  <Link to="/profile" className="flex w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/50 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="hover:bg-accent/50 text-destructive hover:text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text, active, collapsed }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "sidebar-link",
        active && "active",
        collapsed ? "justify-center px-0" : ""
      )}
    >
      <span className="text-inherit">{icon}</span>
      {!collapsed && <span>{text}</span>}
    </Link>
  );
};

export default Sidebar;
