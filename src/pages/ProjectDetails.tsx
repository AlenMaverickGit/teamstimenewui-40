import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetails from "@/components/projects/ProjectDetails";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { projects } from "@/utils/dummyData";

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  return (
    // <div className="container py-6 animate-fade-in">
    //   <BreadcrumbNav projectName={project?.name} />
    //   <div className="flex flex-col gap-6">
    //     <div className="flex items-center justify-between flex-wrap gap-2">
    //       <h1 className="text-2xl md:text-3xl font-bold text-gradient block md:hidden">
    //         {project?.name}
    //       </h1>
    //       <p className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 tracking-tight ml-auto">
    //         Last updated: {new Date().toLocaleDateString()}
    //       </p>
    //     </div>
    //     <ProjectDetails />
    //   </div>
    // </div>

    <div className="container py-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <BreadcrumbNav projectName={project?.name} />
        <p className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 tracking-tight">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ProjectDetails />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
