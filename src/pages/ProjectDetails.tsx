
import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetails from '@/components/projects/ProjectDetails';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { projects } from '@/utils/dummyData';

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.id === projectId);
  
  return (
    <div className="container py-6 animate-fade-in">
      <BreadcrumbNav projectName={project?.name} />
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gradient">{project?.name}</h1>
        <ProjectDetails />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
