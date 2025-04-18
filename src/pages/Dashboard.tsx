
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const DashboardPage: React.FC = () => {
  return (
    <div className="container py-6 animate-fade-in">
      <BreadcrumbNav />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-responsive-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-responsive-sm text-muted-foreground hidden md:block px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
