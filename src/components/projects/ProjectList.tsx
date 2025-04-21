import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Users,
  ArrowRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Project,
  projects,
  getTasksByProjectId,
  users,
} from "@/utils/dummyData";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Add calculated fields to projects
  const projectsWithStats = projects.map((project) => {
    const projectTasks = getTasksByProjectId(project.id);
    const totalTasks = projectTasks.length;
    const completedTasks = projectTasks.filter(
      (task) => task.isCompleted
    ).length;
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const teamMembers = project.teamIds
      .map((id) => users.find((user) => user.id === id))
      .filter(Boolean);

    return {
      ...project,
      progress,
      totalTasks,
      completedTasks,
      teamMembers,
    };
  });

  // Filter projects based on search query
  const filteredProjects = projectsWithStats.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/30 border-b p-4">
        <div className="flex flex-row items-center justify-between gap-2">
          {/* Search bar takes 80% */}
          <div className="relative flex-grow basis-[80%] flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects or clients..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter button takes remaining 20% */}
          <div className="flex-shrink-0 basis-[20%] flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 w-full max-w-[120px] flex items-center justify-center"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem>Complete</DropdownMenuItem>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Not Started</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Progress (High-Low)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead className="hidden md:table-cell">Client</TableHead>
                <TableHead className="hidden md:table-cell">Timeline</TableHead>
                <TableHead className="hidden md:table-cell">Team</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-1 p-4">
                      <p className="text-sm text-muted-foreground">
                        No projects found
                      </p>
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          onClick={() => setSearchQuery("")}
                          className="mt-2 text-sm"
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProjectRowProps {
  project: Project & {
    progress: number;
    totalTasks: number;
    completedTasks: number;
    teamMembers: any[];
  };
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  const startDateFormatted = format(new Date(project.startDate), "MMM d, yyyy");
  const endDateFormatted = format(new Date(project.endDate), "MMM d, yyyy");

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-status-complete text-white";
    if (progress > 70) return "bg-status-inprogress text-white";
    if (progress > 30) return "bg-yellow-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <TableRow className="group">
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <Link
            to={`/projects/${project.id}`}
            className="hover:text-primary transition-colors"
          >
            {project.name}
          </Link>
          <div className="md:hidden flex items-center text-xs text-muted-foreground mt-1">
            <span className="mr-2">{project.clientName}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            {project.completedTasks}/{project.totalTasks} tasks
          </span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {project.clientName}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {startDateFormatted} - {endDateFormatted}
          </span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{project.teamMembers.length} members</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-full max-w-24 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(
                project.progress
              )}`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <Badge
            variant="outline"
            className={`${getProgressColor(project.progress)}`}
          >
            {project.progress}%
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="opacity-70 group-hover:opacity-100"
        >
          <Link to={`/projects/${project.id}`}>
            <span className="sr-only">View details for {project.name}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectList;
