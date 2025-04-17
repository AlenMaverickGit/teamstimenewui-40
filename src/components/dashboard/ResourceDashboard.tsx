import React, { useState } from "react";
import { Download, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateResourceReport } from "../../utils/generateReport";

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
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#f6f7ff]">
            <tr className="text-gray-800 text-sm font-semibold border-b border-gray-300">
              {[
                "Project",
                "Employee Name",
                "Role",
                "Start Date",
                "End Date",
                "Rate ($)",
                "Cost ($)",
              ].map((title) => (
                <th
                  key={title}
                  className="sticky top-[72px] bg-[#f6f7ff] z-10 px-4 py-3 text-left"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {mockData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{entry.project}</td>
                <td className="px-4 py-3">{entry.employeeName}</td>
                <td className="px-4 py-3">{entry.role}</td>
                <td className="px-4 py-3">{entry.startDate}</td>
                <td className="px-4 py-3">{entry.endDate}</td>
                <td className="px-4 py-3 ">{entry.rate.toFixed(2)}</td>
                <td className="px-4 py-3 ">{entry.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
