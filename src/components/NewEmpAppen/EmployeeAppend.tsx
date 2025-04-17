import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Employee {
  employeeId: number;
  name: string;
  email: string;
  // Add other fields if needed
}

interface EmployeeAppendProps {
  employee: Employee;
}

interface Category {
  categoryDesc: string;
  valueDesc: string;
}

const EmployeeAppend: React.FC<EmployeeAppendProps> = ({ employee }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotoAndDesignation = async () => {
      try {
        // Fetch photo
        const photoRes = await axios.get(
          `http://localhost:5000/api/employees/${employee.employeeId}/photo`,
          {
            params: { domain: "dcorpbasics.greythr.com" },
          }
        );
        if (photoRes.data.empPhoto) {
          setPhoto(`data:image/jpeg;base64,${photoRes.data.empPhoto}`);
        }

        // Fetch categories
        const categoryRes = await axios.get(
          `http://localhost:5000/api/employees/${employee.employeeId}/categories`,
          {
            params: { domain: "dcorpbasics.greythr.com" },
          }
        );

        const categories: Category[] = categoryRes.data;

        const designationCategory = categories.find(
          (cat) => cat.categoryDesc === "Designation"
        );

        if (designationCategory) {
          setDesignation(designationCategory.valueDesc);
        }
      } catch (err) {
        console.error(`Error fetching data for ${employee.name}:`, err);
      }
    };

    fetchPhotoAndDesignation();
  }, [employee.employeeId]);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            {photo ? (
              <AvatarImage src={photo} alt={employee.name} />
            ) : (
              <AvatarFallback>
                {employee.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{employee.name}</p>
            <p className="text-xs text-muted-foreground">{employee.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{designation ?? "—"}</TableCell>
      <TableCell>—</TableCell>
      <TableCell>—</TableCell>
      <TableCell>—</TableCell>
      <TableCell>—</TableCell>
    </TableRow>
  );
};

export default EmployeeAppend;
