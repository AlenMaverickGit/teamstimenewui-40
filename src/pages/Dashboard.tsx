import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const DashboardPage: React.FC = () => {
  return (
    <div className="px-2 sm:container sm:mx-auto py-6 animate-fade-in">
      <BreadcrumbNav />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground hidden md:block px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
            Last updated: {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
