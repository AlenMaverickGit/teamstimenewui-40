
import React from "react";
import ProjectList from "@/components/projects/ProjectList";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const ProjectsPage: React.FC = () => {
  return (
    <div className="container py-6 animate-fade-in">
      <BreadcrumbNav />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-responsive-3xl font-bold text-gradient">Projects</h1>
          <div className="flex gap-4">
            <Button className="gap-2 shadow-neon transition-all hover:translate-y-[-2px]">
              <PlusCircle className="h-4 w-4" />
              <span className="text-responsive-base">New Project</span>
            </Button>
          </div>
        </div>
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectsPage;
