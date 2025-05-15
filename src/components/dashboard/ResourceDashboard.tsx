
import React, { useState } from "react";
import { Download, UsersRound, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateResourceReport } from "../../utils/generateReport";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResourceAllocation = {
  project: string;
  employeeName: string;
  role: string;
  startDate: string;
  endDate: string;
  rate: number;
  cost: number;
};

const mockData: ResourceAllocation[] = [
  {
    project: "Whizible Version 24",
    employeeName: "John Doe",
    role: "Project Manager",
    startDate: "01-01-2024",
    endDate: "31-12-2024",
    rate: 120.0,
    cost: 240000.0,
  },
  {
    project: "Session Project",
    employeeName: "Jane Smith",
    role: "UI/UX Designer",
    startDate: "15-01-2024",
    endDate: "30-09-2024",
    rate: 95.0,
    cost: 152000.0,
  },
  {
    project: "Client Portal",
    employeeName: "Michael Brown",
    role: "Frontend Developer",
    startDate: "01-02-2024",
    endDate: "31-10-2024",
    rate: 110.0,
    cost: 176000.0,
  },
  {
    project: "Mobile App Redesign",
    employeeName: "Emily Wilson",
    role: "UX Researcher",
    startDate: "15-02-2024",
    endDate: "30-07-2024",
    rate: 90.0,
    cost: 108000.0,
  },
  {
    project: "E-commerce Platform",
    employeeName: "David Johnson",
    role: "Backend Developer",
    startDate: "01-03-2024",
    endDate: "31-08-2024",
    rate: 115.0,
    cost: 138000.0,
  },
  {
    project: "CRM Integration",
    employeeName: "Sarah Williams",
    role: "Business Analyst",
    startDate: "15-03-2024",
    endDate: "15-11-2024",
    rate: 105.0,
    cost: 157500.0,
  },
  {
    project: "AI Chatbot",
    employeeName: "Alex Chen",
    role: "ML Engineer",
    startDate: "01-04-2024",
    endDate: "31-10-2024",
    rate: 130.0,
    cost: 195000.0,
  },
  {
    project: "Data Visualization Dashboard",
    employeeName: "Morgan Lee",
    role: "Data Scientist",
    startDate: "15-04-2024",
    endDate: "15-09-2024",
    rate: 125.0,
    cost: 156250.0,
  },
  {
    project: "Payment Gateway Integration",
    employeeName: "Chris Taylor",
    role: "Full Stack Developer",
    startDate: "01-05-2024",
    endDate: "30-11-2024",
    rate: 118.0,
    cost: 177000.0,
  },
  {
    project: "Whizible Version 24",
    employeeName: "Priya Patel",
    role: "QA Engineer",
    startDate: "15-01-2024",
    endDate: "31-12-2024",
    rate: 90.0,
    cost: 180000.0,
  },
  {
    project: "Session Project",
    employeeName: "James Wilson",
    role: "Backend Developer",
    startDate: "01-02-2024",
    endDate: "30-09-2024",
    rate: 115.0,
    cost: 172500.0,
  },
  {
    project: "Client Portal",
    employeeName: "Linda Garcia",
    role: "UI Designer",
    startDate: "15-02-2024",
    endDate: "31-10-2024",
    rate: 95.0,
    cost: 142500.0,
  },
];

// Helper for grouping by project
const groupByProject = (data: ResourceAllocation[]) => {
  const map: Record<string, ResourceAllocation[]> = {};
  data.forEach(item => {
    if (!map[item.project]) map[item.project] = [];
    map[item.project].push(item);
  });
  return map;
};

const groupedProjects = groupByProject(mockData);

const ResourceDashboard: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projectList = Object.entries(groupedProjects);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/10 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <UsersRound className="mr-2 h-4 w-4 text-primary" />
            Project-Wise Resource Allocation
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="text-xs shadow-sm"
            onClick={generateResourceReport}
          >
            <Download className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="h-[460px] relative">
            <Table className="w-full table-fixed text-sm text-left border-separate border-spacing-0">
              <TableHeader className="sticky top-0 z-10 border-b">
                <TableRow className="bg-muted/10">
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Project</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Employee Name</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Role</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Start Date</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">End Date</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Rate ($)</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Cost ($)</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
            <ScrollArea className="h-[428px] w-full">
              <Table className="w-full table-fixed text-sm text-left">
                <TableBody>
                  {mockData.map((entry, index) => (
                    <TableRow key={index} className="hover:bg-muted/5 transition-colors">
                      <TableCell className="px-3 py-2 text-xs">{entry.project}</TableCell>
                      <TableCell className="px-3 py-2 text-xs">{entry.employeeName}</TableCell>
                      <TableCell className="px-3 py-2 text-xs">{entry.role}</TableCell>
                      <TableCell className="px-3 py-2 text-xs">{entry.startDate}</TableCell>
                      <TableCell className="px-3 py-2 text-xs">{entry.endDate}</TableCell>
                      <TableCell className="px-3 py-2 text-xs font-mono">{entry.rate.toFixed(2)}</TableCell>
                      <TableCell className="px-3 py-2 text-xs font-mono">{entry.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>

        {/* Mobile Accordion Grouped by Project */}
        <div className="block md:hidden p-3 space-y-2">
          {projectList.map(([project, employees], idx) => (
            <div key={project} className="border rounded-lg shadow-sm transition-all">
              <button
                className="w-full flex justify-between items-center px-3 py-2 text-left text-xs font-medium text-foreground bg-muted/10 rounded-t-lg"
                onClick={() => toggleAccordion(idx)}
              >
                <span className="truncate">{project}</span>
                <span className="text-xs">{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="p-2 animate-fade-in space-y-2 bg-card rounded-b-lg">
                  {employees.map((entry, eIdx) => (
                    <div
                      key={eIdx}
                      className="rounded-md bg-muted/5 border border-border/30 shadow-sm p-2 flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-block rounded-full bg-primary/10 p-1.5">
                          <User className="w-3 h-3 text-primary" />
                        </span>
                        <div>
                          <p className="font-medium text-xs">{entry.employeeName}</p>
                          <p className="text-[10px] text-muted-foreground">{entry.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-1 text-[10px] text-muted-foreground mt-1">
                        <span className="font-medium">
                          {entry.startDate} - {entry.endDate}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <div className="flex-1 flex items-center min-w-[100px] text-[10px]">
                          <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-700 font-medium rounded-sm mr-1">
                            Rate
                          </span>
                          <span className="font-mono text-xs text-blue-800">
                            ${entry.rate.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex-1 flex items-center min-w-[100px] text-[10px]">
                          <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 font-medium rounded-sm mr-1">
                            Cost
                          </span>
                          <span className="font-mono text-xs text-green-800">
                            ${entry.cost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceDashboard;
