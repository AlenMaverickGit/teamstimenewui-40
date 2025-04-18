import React, { useState } from "react";
import { Download, Filter, UsersRound } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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

const ResourceDashboard: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-responsive-xl font-semibold text-gray-800 flex items-center">
          <UsersRound className="mr-2 h-5 w-5 text-primary" />
          Project-Wise Resource Allocation
        </h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[400px]">
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">Filter Resources</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Filter options will be implemented here.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button
            className="shadow-neon transition-all hover:translate-y-[-2px] flex-shrink-0"
            onClick={generateResourceReport}
            size={isMobile ? "sm" : "default"}
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-xl border border-gray-200 hidden md:block overflow-hidden">
        <div className="h-[500px] relative">
          <div className="sticky top-0 z-20 bg-card w-full">
            <Table className="w-full table-fixed text-responsive-sm text-left">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%] px-4 py-3">Project</TableHead>
                  <TableHead className="w-[20%] px-4 py-3">Employee</TableHead>
                  <TableHead className="w-[15%] px-4 py-3">Role</TableHead>
                  <TableHead className="w-[12.5%] px-4 py-3">Start Date</TableHead>
                  <TableHead className="w-[12.5%] px-4 py-3">End Date</TableHead>
                  <TableHead className="w-[10%] px-4 py-3">Rate ($)</TableHead>
                  <TableHead className="w-[10%] px-4 py-3">Cost ($)</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          <ScrollArea className="h-[468px]">
            <Table className="w-full table-fixed text-responsive-sm text-left">
              <TableBody>
                {mockData.map((entry, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="w-[20%] px-4 py-3">{entry.project}</TableCell>
                    <TableCell className="w-[20%] px-4 py-3">
                      {entry.employeeName}
                    </TableCell>
                    <TableCell className="w-[15%] px-4 py-3">{entry.role}</TableCell>
                    <TableCell className="w-[12.5%] px-4 py-3">
                      {entry.startDate}
                    </TableCell>
                    <TableCell className="w-[12.5%] px-4 py-3">{entry.endDate}</TableCell>
                    <TableCell className="w-[10%] px-4 py-3">
                      {entry.rate.toFixed(2)}
                    </TableCell>
                    <TableCell className="w-[10%] px-4 py-3">
                      {entry.cost.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden sm:block md:hidden">
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <ScrollArea className="h-[500px]">
            <table className="w-full text-responsive-sm text-left">
              <thead className="sticky top-0 bg-card z-10">
                <tr>
                  <th className="px-3 py-3">Project / Employee</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Dates</th>
                  <th className="px-3 py-3">Cost ($)</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((entry, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-muted/30">
                    <td className="px-3 py-3">
                      <div className="font-medium">{entry.project}</div>
                      <div className="text-sm text-muted-foreground">{entry.employeeName}</div>
                    </td>
                    <td className="px-3 py-3">{entry.role}</td>
                    <td className="px-3 py-3">
                      <div>{entry.startDate}</div>
                      <div>to {entry.endDate}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div>Rate: ${entry.rate.toFixed(2)}</div>
                      <div className="font-semibold">${entry.cost.toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Accordion View */}
      <div className="block sm:hidden space-y-4 mt-4">
        {mockData.map((entry, index) => (
          <div key={index} className="border rounded-xl shadow-sm transition">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 bg-[#f6f7ff] rounded-t-xl"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex flex-col">
                <span className="text-responsive-base truncate max-w-[200px]">{entry.project}</span>
                <span className="text-responsive-sm text-muted-foreground truncate max-w-[200px]">
                  {entry.employeeName}
                </span>
              </div>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-responsive-sm bg-white space-y-2 rounded-b-xl divide-y divide-gray-100">
                <div className="pb-2">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="font-medium">{entry.role}</p>
                </div>
                <div className="py-2 flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Start</p>
                    <p>{entry.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">End</p>
                    <p>{entry.endDate}</p>
                  </div>
                </div>
                <div className="py-2 flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p>${entry.rate.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                    <p className="font-semibold">${entry.cost.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceDashboard;
