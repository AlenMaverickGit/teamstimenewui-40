
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  BarChart3, 
  Users, 
  Menu, 
  X, 
  User,
  Settings,
  HelpCircle,
  LogOut,
  ClipboardList,
  UserCog
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <header className="bg-white/95 border-b border-border/30 shadow-sm sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
              <Clock className="text-primary h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              TeamsTime
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/dashboard" active={isActive('/dashboard')}>
              <BarChart3 className="h-4 w-4 mr-1.5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/projects" active={isActive('/projects')}>
              <Clock className="h-4 w-4 mr-1.5" />
              <span>Projects</span>
            </NavLink>
            <NavLink to="/team" active={isActive('/team')}>
              <Users className="h-4 w-4 mr-1.5" />
              <span>Team</span>
            </NavLink>
            <NavLink to="/timesheet" active={isActive('/timesheet')}>
              <ClipboardList className="h-4 w-4 mr-1.5" />
              <span>Timesheet</span>
            </NavLink>
            <NavLink to="/users" active={isActive('/users')}>
              <UserCog className="h-4 w-4 mr-1.5" />
              <span>Users</span>
            </NavLink>
          </nav>
          
          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-1 hover:bg-muted">
                  <Avatar className="h-8 w-8 border border-border/30">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-lg border border-border/50 shadow-dropdown">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8 border border-border/50">
                    <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-muted focus:bg-muted cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted focus:bg-muted cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted focus:bg-muted cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-muted focus:bg-muted cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground hover:bg-muted">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 bg-card rounded-xl p-3 border border-border/30 shadow-card">
            <nav className="flex flex-col space-y-1">
              <MobileNavLink to="/dashboard" active={isActive('/dashboard')} onClick={toggleMenu}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </MobileNavLink>
              <MobileNavLink to="/projects" active={isActive('/projects')} onClick={toggleMenu}>
                <Clock className="mr-2 h-4 w-4" />
                Projects
              </MobileNavLink>
              <MobileNavLink to="/team" active={isActive('/team')} onClick={toggleMenu}>
                <Users className="mr-2 h-4 w-4" />
                Team
              </MobileNavLink>
              <MobileNavLink to="/timesheet" active={isActive('/timesheet')} onClick={toggleMenu}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Timesheet
              </MobileNavLink>
              <MobileNavLink to="/users" active={isActive('/users')} onClick={toggleMenu}>
                <UserCog className="mr-2 h-4 w-4" />
                Users
              </MobileNavLink>
            </nav>
            <div className="mt-4 flex items-center border-t border-border/20 pt-4">
              <Avatar className="h-8 w-8 mr-2 border border-border/30">
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-foreground border-border/40 hover:bg-muted">
                Profile
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link 
    to={to} 
    className={`relative flex items-center justify-center px-3 py-2 rounded-md transition-colors text-sm ${
      active 
        ? 'text-primary font-medium' 
        : 'text-foreground hover:bg-muted'
    }`}
    aria-label={to.replace('/', '')}
  >
    {children}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transform translate-y-1"></div>
    )}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, active, onClick, children }) => (
  <Link 
    to={to} 
    className={`flex items-center text-foreground transition-colors p-2 rounded-md ${
      active ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default AppHeader;
