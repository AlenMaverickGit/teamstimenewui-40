import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const DashboardPage: React.FC = () => {
  return (
    // <div className="px-2 sm:container sm:mx-auto py-4 animate-fade-in">
    //   <BreadcrumbNav />
    //   <div className="flex flex-col gap-5">
    //     <div className="flex items-center justify-between flex-wrap gap-2">
    //       <div className="flex items-center gap-2">
    //         <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gradient block md:hidden">
    //           Dashboard
    //         </h1>
    //       </div>
    //       <p className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 tracking-tight">
    //         Last updated: {new Date().toLocaleDateString()} at{" "}
    //         {new Date().toLocaleTimeString()}
    //       </p>
    //     </div>
    //     <div className="relative">
    //       <Dashboard />
    //     </div>
    //   </div>
    // </div>
    <div className="px-2 sm:container sm:mx-auto py-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <BreadcrumbNav />
        <p className="text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 tracking-tight">
          Last updated: {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
