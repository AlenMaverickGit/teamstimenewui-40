
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  ClipboardList
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-gradient-to-r from-primary to-secondary shadow-md sticky top-0 z-10 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors">
              <Clock className="text-white h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-white group-hover:text-white/80 transition-colors">TeamsTime</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/dashboard" active={isActive('/dashboard')}>
              <BarChart3 className="mr-2" />
              Dashboard
            </NavLink>
            <NavLink to="/projects" active={isActive('/projects')}>
              <Clock className="mr-2" />
              Projects
            </NavLink>
            <NavLink to="/team" active={isActive('/team')}>
              <Users className="mr-2" />
              Team
            </NavLink>
            <NavLink to="/timesheet" active={isActive('/timesheet')}>
              <ClipboardList className="mr-2" />
              Timesheet
            </NavLink>
          </nav>
          
          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full p-1 ring-offset-primary">
                  <Avatar className="h-8 w-8 border-2 border-white/30 shadow-neon">
                    <AvatarFallback className="bg-white/10 text-white font-semibold">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-lg border border-border/50 shadow-lg">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8 border border-border/50">
                    <AvatarFallback className="bg-primary/20 text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-accent/20 focus:bg-accent/20 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/20 focus:bg-accent/20 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/20 focus:bg-accent/20 cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-accent/20 focus:bg-accent/20 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-white/10">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 bg-white/5 backdrop-blur-lg rounded-xl p-2 border border-white/10">
            <nav className="flex flex-col space-y-1">
              <MobileNavLink to="/dashboard" active={isActive('/dashboard')} onClick={toggleMenu}>
                <BarChart3 className="mr-2" />
                Dashboard
              </MobileNavLink>
              <MobileNavLink to="/projects" active={isActive('/projects')} onClick={toggleMenu}>
                <Clock className="mr-2" />
                Projects
              </MobileNavLink>
              <MobileNavLink to="/team" active={isActive('/team')} onClick={toggleMenu}>
                <Users className="mr-2" />
                Team
              </MobileNavLink>
              <MobileNavLink to="/timesheet" active={isActive('/timesheet')} onClick={toggleMenu}>
                <ClipboardList className="mr-2" />
                Timesheet
              </MobileNavLink>
            </nav>
            <div className="mt-4 flex items-center border-t border-white/10 pt-4">
              <Avatar className="h-8 w-8 mr-2 border border-white/20">
                <AvatarFallback className="bg-white/10 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-white/70">john@example.com</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
                Profile
              </Button>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
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
    className={`flex items-center text-white hover:text-white/80 transition-colors ${
      active ? 'relative font-bold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[3px] after:bg-white after:rounded-full after:shadow-neon' : 'font-medium'
    }`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, active, onClick, children }) => (
  <Link 
    to={to} 
    className={`flex items-center text-white hover:text-white/80 transition-colors p-2 rounded-lg ${
      active ? 'bg-white/10 backdrop-blur-sm font-bold' : 'font-medium'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default AppHeader;
