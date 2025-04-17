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
      <div className="rounded-xl border border-gray-200 hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Rate ($)</TableHead>
              <TableHead>Cost ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.project}</TableCell>
                <TableCell>{entry.employeeName}</TableCell>
                <TableCell>{entry.role}</TableCell>
                <TableCell>{entry.startDate}</TableCell>
                <TableCell>{entry.endDate}</TableCell>
                <TableCell>{entry.rate.toFixed(2)}</TableCell>
                <TableCell>{entry.cost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
