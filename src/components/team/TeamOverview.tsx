import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { User } from "@/utils/dummyData";
import {
  calculateProgress,
  formatTimeHoursMinutes,
  getStatusFromProgress,
} from "@/utils/timeUtils";
import { tasks, users, getTasksByAssigneeId } from "@/utils/dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeAppend from "../../components/NewEmpAppen/EmployeeAppend";

const TeamOverview: React.FC = () => {
  //Code added by Durgesh Dalvi
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employees",
          {
            params: { domain: null },
          }
        );
        setEmployees(response.data.data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    getEmployees();
  }, []);

  //End of code added
  // Enhance user data with statistics
  const usersWithStats = users.map((user) => {
    const userTasks = getTasksByAssigneeId(user.id);

    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter((task) => task.isCompleted).length;
    const delayedTasks = userTasks.filter((task) => {
      const progress = calculateProgress(task.timeSpent, task.estimatedTime);
      const status = getStatusFromProgress(progress, task.isCompleted);
      return status === "delayed";
    }).length;

    const totalTimeSpent = userTasks.reduce(
      (acc, task) => acc + task.timeSpent,
      0
    );
    const totalEstimatedTime = userTasks.reduce(
      (acc, task) => acc + task.estimatedTime,
      0
    );

    return {
      ...user,
      totalTasks,
      completedTasks,
      delayedTasks,
      totalTimeSpent,
      totalEstimatedTime,
      completionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Overview</CardTitle>
        <CardDescription>
          Track your team's progress and workload
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Time Logged</TableHead>
              <TableHead>Completion Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {usersWithStats.map((user) => (
              <TeamMemberRow key={user.id} user={user} />
            ))} */}
            {employees.map((employee) => (
              <EmployeeAppend key={employee.employeeId} employee={employee} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface TeamMemberRowProps {
  user: User & {
    totalTasks: number;
    completedTasks: number;
    delayedTasks: number;
    totalTimeSpent: number;
    totalEstimatedTime: number;
    completionRate: number;
  };
}

const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ user }) => {
  const getWorkloadStatus = () => {
    if (user.delayedTasks > 1) return "overloaded";
    if (user.totalTasks > 5) return "busy";
    if (user.totalTasks > 0) return "normal";
    return "available";
  };

  const workloadStatus = getWorkloadStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overloaded":
        return "bg-status-delayed text-white";
      case "busy":
        return "bg-amber-500 text-white";
      case "normal":
        return "bg-status-inprogress text-white";
      case "available":
        return "bg-status-complete text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        {user.completedTasks}/{user.totalTasks}
        {user.delayedTasks > 0 && (
          <Badge
            variant="outline"
            className="ml-2 bg-status-delayed text-white"
          >
            {user.delayedTasks} delayed
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {formatTimeHoursMinutes(user.totalTimeSpent)}
        <span className="text-xs text-muted-foreground ml-1">
          / {formatTimeHoursMinutes(user.totalEstimatedTime)}
        </span>
      </TableCell>
      <TableCell>
        <div className="w-full">
          <Progress value={user.completionRate} className="h-2" />
          <p className="text-xs text-right mt-1">{user.completionRate}%</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getStatusColor(workloadStatus)}>
          {workloadStatus.charAt(0).toUpperCase() + workloadStatus.slice(1)}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default TeamOverview;
