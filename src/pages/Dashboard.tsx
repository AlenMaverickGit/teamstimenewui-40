
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Printer, FileText, Settings } from "lucide-react";

const DashboardPage: React.FC = () => {
  return (
    <div className="px-4 sm:container sm:mx-auto py-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <BreadcrumbNav />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
              Welcome to Dashboard
            </h1>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="h-9">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="default" size="sm" className="h-9">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Key metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Conversion Rate" 
            value="0.81%" 
            trend="1.2%"
            trendUp={true}
            subtitle="than last week"
          />
          <MetricCard 
            title="Tasks Completed" 
            value="3,137"
            trend="0.7%"
            trendUp={false}
            subtitle="than last week"
          />
          <MetricCard 
            title="Avg. Task Time" 
            value="$306.20"
            trend="0.3%"
            trendUp={false}
            subtitle="than last week"
          />
          <MetricCard 
            title="Total Projects" 
            value="1,650"
            trend="2.1%"
            trendUp={true}
            subtitle="than last week"
          />
        </div>
        
        {/* Main dashboard content */}
        <Dashboard />
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  subtitle: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, trendUp, subtitle }) => {
  return (
    <Card className="overflow-hidden border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-baseline">
          <div className="text-2xl font-bold">{value}</div>
          <span className={`ml-2 text-xs ${trendUp ? 'text-green-500' : 'text-red-500'} font-medium`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <div className="mt-4 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
          <div 
            className={`h-full ${trendUp ? 'bg-green-500' : 'bg-red-500'} rounded-full`} 
            style={{ width: `${Math.random() * 60 + 20}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
