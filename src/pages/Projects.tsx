import React from "react";
import ProjectList from "@/components/projects/ProjectList";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";
import { generateResourceReport } from "../utils/generateReport";

const ProjectsPage: React.FC = () => {
  return (
    // <div className="px-2 sm:container sm:mx-auto py-6 animate-fade-in">
    //   <BreadcrumbNav />
    //   <div className="flex flex-col gap-6">
    //     <div className="flex items-center justify-between flex-wrap gap-2">
    //       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient tracking-tight">
    //         Projects
    //       </h1>

    //       <div className="flex gap-4 flex-wrap">
    //         <Button className="gap-2 text-sm shadow-sm transition-all hover:translate-y-[-1px]">
    //           <PlusCircle className="h-4 w-4" />
    //           New Project
    //         </Button>
    //         {/* <Button
    //           className="shadow-neon transition-all hover:translate-y-[-2px]"
    //           onClick={generateResourceReport}
    //         >
    //           <Download className="h-4 w-4" />
    //           Resource Allocation
    //         </Button> */}
    //       </div>
    //     </div>

    //     <ProjectList />
    //   </div>
    // </div>
    <div className="px-2 sm:container sm:mx-auto py-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <BreadcrumbNav />
        <Button className="gap-2 text-sm shadow-sm transition-all hover:translate-y-[-1px]">
          <PlusCircle className="h-8 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectsPage;
