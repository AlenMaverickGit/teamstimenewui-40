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
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4 flex-nowrap">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 flex items-center truncate">
          <UsersRound className="mr-2 h-5 w-5 text-primary shrink-0" />
          Project-Wise Resource Allocation
        </h2>
        <Button
          className="ml-4 shadow-neon transition-all hover:translate-y-[-2px] px-3 sm:px-4 py-2 whitespace-nowrap"
          onClick={generateResourceReport}
        >
          <Download className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="rounded-xl border border-gray-200 hidden md:block overflow-hidden">
        <div className="h-[500px] relative">
          <Table className="w-full table-fixed text-sm text-left">
            <TableHeader className="sticky top-[72px] bg-card z-10 shadow-sm">
              <TableRow>
                <TableHead className="bg-card px-4 py-3">Project</TableHead>
                <TableHead className="bg-card px-4 py-3">Employee Name</TableHead>
                <TableHead className="bg-card px-4 py-3">Role</TableHead>
                <TableHead className="bg-card px-4 py-3">Start Date</TableHead>
                <TableHead className="bg-card px-4 py-3">End Date</TableHead>
                <TableHead className="bg-card px-4 py-3">Rate ($)</TableHead>
                <TableHead className="bg-card px-4 py-3">Cost ($)</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-[428px] w-full">
            <Table className="w-full table-fixed text-sm text-left">
              <TableBody>
                {mockData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3">{entry.project}</TableCell>
                    <TableCell className="px-4 py-3">{entry.employeeName}</TableCell>
                    <TableCell className="px-4 py-3">{entry.role}</TableCell>
                    <TableCell className="px-4 py-3">{entry.startDate}</TableCell>
                    <TableCell className="px-4 py-3">{entry.endDate}</TableCell>
                    <TableCell className="px-4 py-3">{entry.rate.toFixed(2)}</TableCell>
                    <TableCell className="px-4 py-3">{entry.cost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Accordion Grouped by Project */}
      <div className="block md:hidden space-y-4 mt-4">
        {projectList.map(([project, employees], idx) => (
          <div key={project} className="border rounded-xl shadow-sm transition">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800 bg-[#f6f7ff] rounded-t-xl"
              onClick={() => toggleAccordion(idx)}
            >
              <span className="truncate">{project}</span>
              <span>{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="p-2 animate-fade-in space-y-3 bg-white rounded-b-xl">
                {employees.map((entry, eIdx) => (
                  <div
                    key={eIdx}
                    className="rounded-lg bg-gradient-to-br from-purple-100/80 to-white/90 border border-purple-200/60 shadow-md p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-block rounded-full bg-primary/10 p-2">
                        <UsersRound className="w-5 h-5 text-primary" />
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 text-base">{entry.employeeName}</p>
                        <p className="text-xs text-muted-foreground font-medium">{entry.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 text-xs text-muted-foreground">
                      <span className="font-medium">
                        Start: <span className="ml-1 text-gray-700">{entry.startDate}</span>
                      </span>
                      <span className="font-medium">
                        End: <span className="ml-1 text-gray-700">{entry.endDate}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex-1 flex items-center min-w-[120px]">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-lg mr-2">
                          Rate
                        </span>
                        <span className="font-mono text-base text-blue-800">
                          ${entry.rate.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex-1 flex items-center min-w-[120px]">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 font-bold text-xs rounded-lg mr-2">
                          Cost
                        </span>
                        <span className="font-mono text-base text-green-800">
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
    </div>
  );
};

export default ResourceDashboard;
