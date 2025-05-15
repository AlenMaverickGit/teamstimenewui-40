import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbNavProps {
  projectName?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ projectName }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Create breadcrumb items based on current path
  const getBreadcrumbItems = () => {
    const items = [];

    // Home link is always first
    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink asChild>
          <Link to="/">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );

    if (pathSegments.length > 0) {
      items.push(<BreadcrumbSeparator key="sep-home" />);

      // Handle different path segments
      if (pathSegments[0] === "dashboard") {
        items.push(
          <BreadcrumbItem key="dashboard">
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (pathSegments[0] === "projects") {
        items.push(
          <BreadcrumbItem key="projects">
            {pathSegments.length === 1 ? (
              <BreadcrumbPage>Projects</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to="/projects">Projects</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );

        // Add project detail breadcrumb if on project detail page
        if (pathSegments.length > 1 && projectName) {
          items.push(<BreadcrumbSeparator key="sep-project" />);
          items.push(
            <BreadcrumbItem key="project-detail">
              <BreadcrumbPage>{projectName}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        }
      } else if (pathSegments[0] === "team") {
        items.push(
          <BreadcrumbItem key="team">
            <BreadcrumbPage>Team</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (pathSegments[0] === "timesheet") {
        items.push(
          <BreadcrumbItem key="timesheet">
            <BreadcrumbPage>Timesheet</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (pathSegments[0] === "users") {
        items.push(
          <BreadcrumbItem key="users">
            <BreadcrumbPage>User Management</BreadcrumbPage>
          </BreadcrumbItem>
        );
      }
    }

    return items;
  };

  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList className="text-xs">
        {getBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
