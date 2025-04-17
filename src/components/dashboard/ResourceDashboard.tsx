
import React, { useState } from "react";
import { Download, UsersRound } from "lucide-react";
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

const ResourceDashboard: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <UsersRound className="mr-2 h-5 w-5 text-primary" />
          Project-wise Resource Allocation
        </h2>
        <Button
          className="shadow-neon transition-all hover:translate-y-[-2px]"
          onClick={generateResourceReport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="rounded-xl border border-gray-200 hidden md:block overflow-hidden">
        <div className="h-[500px] relative">
          <div className="sticky top-0 bg-card z-10 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Project</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employee Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Start Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">End Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rate ($)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cost ($)</th>
                </tr>
              </thead>
            </table>
          </div>
          <ScrollArea className="h-[450px]">
            <table className="w-full">
              <tbody>
                {mockData.map((entry, index) => (
                  <tr 
                    key={index} 
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle">{entry.project}</td>
                    <td className="p-4 align-middle">{entry.employeeName}</td>
                    <td className="p-4 align-middle">{entry.role}</td>
                    <td className="p-4 align-middle">{entry.startDate}</td>
                    <td className="p-4 align-middle">{entry.endDate}</td>
                    <td className="p-4 align-middle">{entry.rate.toFixed(2)}</td>
                    <td className="p-4 align-middle">{entry.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Accordion View */}
      <div className="block md:hidden space-y-4 mt-4">
        {mockData.map((entry, index) => (
          <div key={index} className="border rounded-xl shadow-sm transition">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800 bg-[#f6f7ff] rounded-t-xl"
              onClick={() => toggleAccordion(index)}
            >
              <span>{entry.project}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-sm bg-white space-y-1">
                <p>
                  <strong>Employee:</strong> {entry.employeeName}
                </p>
                <p>
                  <strong>Role:</strong> {entry.role}
                </p>
                <p>
                  <strong>Start Date:</strong> {entry.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {entry.endDate}
                </p>
                <p>
                  <strong>Rate:</strong> ${entry.rate.toFixed(2)}
                </p>
                <p>
                  <strong>Cost:</strong> ${entry.cost.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceDashboard;
