
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, BarChart3, CheckCircle2, Calendar, Clock, FileText, AlertTriangle } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart, Legend } from "recharts";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  // Sample data for the charts
  const revenueData = [
    { name: 'Jan', revenue: 1200, target: 1000 },
    { name: 'Feb', revenue: 1900, target: 1300 },
    { name: 'Mar', revenue: 1500, target: 1400 },
    { name: 'Apr', revenue: 2200, target: 1800 },
    { name: 'May', revenue: 2700, target: 2000 },
    { name: 'Jun', revenue: 3000, target: 2200 },
    { name: 'Jul', revenue: 2800, target: 2400 },
    { name: 'Aug', revenue: 3300, target: 2600 },
    { name: 'Sep', revenue: 3600, target: 2800 },
    { name: 'Oct', revenue: 3850, target: 3000 },
    { name: 'Nov', revenue: 4000, target: 3200 },
    { name: 'Dec', revenue: 4200, target: 3400 },
  ];

  const retentionData = [
    { name: 'Jan', active: 800, churned: 200 },
    { name: 'Feb', active: 950, churned: 180 },
    { name: 'Mar', active: 1000, churned: 220 },
    { name: 'Apr', active: 1200, churned: 240 },
    { name: 'May', active: 1300, churned: 260 },
    { name: 'Jun', active: 1400, churned: 220 },
  ];

  return (
    <div className="animate-fade-in w-full">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="h-9">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
        
        {/* Key metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Conversion Rate" 
            value="0.81%" 
            trend="1.2%"
            trendUp={true}
            subtitle="than last week"
            icon={<BarChart3 className="h-5 w-5" />}
          />
          <MetricCard 
            title="Unique Purchases" 
            value="3,137"
            trend="0.7%"
            trendUp={false}
            subtitle="than last week"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <MetricCard 
            title="Avg. Order Value" 
            value="$306.20"
            trend="0.3%"
            trendUp={false}
            subtitle="than last week"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <MetricCard 
            title="Order Quantity" 
            value="1,650"
            trend="2.1%"
            trendUp={true}
            subtitle="than last week"
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Revenue Growth */}
          <Card className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <h2 className="text-lg font-semibold mb-1">Monthly Revenue Growth</h2>
                <p className="text-sm text-muted-foreground">Monthly revenue generated over time</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$620,076</div>
                <p className="text-xs text-muted-foreground">Total MRR Growth</p>
              </div>
            </div>
            <div className="h-[300px] mt-4">
              <ChartContainer config={{
                revenue: { theme: { light: '#3B82F6', dark: '#3B82F6' } },
                target: { theme: { light: '#93C5FD', dark: '#93C5FD' } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#93C5FD" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="target" stroke="#93C5FD" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span>Actual Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                <span>Target Revenue</span>
              </div>
            </div>
          </Card>

          {/* Customer Retention */}
          <Card className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <h2 className="text-lg font-semibold mb-1">Customer Retention</h2>
                <p className="text-sm text-muted-foreground">Number of customers with active subscription</p>
              </div>
              <div className="flex space-x-4">
                <div className="text-right">
                  <div className="text-base font-bold text-green-500">$1,680.50</div>
                  <p className="text-xs text-muted-foreground">EXPANSIONS</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-red-500">$1,520.00</div>
                  <p className="text-xs text-muted-foreground">CANCELLATIONS</p>
                </div>
              </div>
            </div>
            <div className="h-[300px] mt-4">
              <ChartContainer config={{
                active: { theme: { light: '#3B82F6', dark: '#3B82F6' } },
                churned: { theme: { light: '#FB7185', dark: '#FB7185' } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={retentionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="active" name="Active Customers" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="churned" name="Churned Customers" fill="#FB7185" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Card>
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
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, trendUp, subtitle, icon }) => {
  return (
    <Card className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        <div className="dashboard-card-icon">{icon}</div>
      </div>
      <div className="dashboard-card-value">{value}</div>
      <div className="dashboard-card-footer">
        <span className={`flex items-center font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trendUp ? <ArrowUpCircle className="h-3 w-3 mr-1" /> : <ArrowDownCircle className="h-3 w-3 mr-1" />}
          {trend}
        </span>
        <span className="ml-1">{subtitle}</span>
      </div>
      <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${trendUp ? 'bg-green-500' : 'bg-red-500'} rounded-full`} 
          style={{ width: `${Math.random() * 60 + 20}%` }}
        ></div>
      </div>
    </Card>
  );
};

export default DashboardPage;
