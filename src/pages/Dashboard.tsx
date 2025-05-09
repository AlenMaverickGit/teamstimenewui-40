
import React from "react";
import { Card } from "@/components/ui/card";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <div className="animate-fade-in w-full">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
        </div>
        
        {/* Main dashboard content */}
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
