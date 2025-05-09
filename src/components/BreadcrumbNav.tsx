
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbNavProps {
  projectName?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ projectName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map path segments to readable titles
  const getDisplayName = (pathname: string): string => {
    switch (pathname) {
      case 'dashboard':
        return 'Dashboard';
      case 'projects':
        return 'Projects';
      case 'team':
        return 'Team Members';
      case 'timesheet':
        return 'Timesheet';
      case 'profile':
        return 'Profile';
      default:
        return projectName || pathname.charAt(0).toUpperCase() + pathname.slice(1);
    }
  };

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-2" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link to="/dashboard" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-3.5 w-3.5 mr-2" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={pathname} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
              {isLast ? (
                <span className="font-medium text-foreground">
                  {getDisplayName(pathname)}
                </span>
              ) : (
                <Link 
                  to={routeTo} 
                  className="hover:text-primary transition-colors"
                >
                  {getDisplayName(pathname)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
