
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
import { getTasksByAssigneeId, users } from "@/utils/dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeAppend from "../../components/NewEmpAppen/EmployeeAppend";
import { getAvatarColor, getRoleColor, getWorkloadStatusColor } from "@/utils/userStyles";

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
      <CardContent className="px-0 sm:px-6">
        <div className="overflow-x-auto">
          {/* Desktop view - Full table */}
          <div className="hidden sm:block">
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
                {usersWithStats.map((user) => (
                  <TeamMemberRow key={user.id} user={user} />
                ))}
                {/* {employees.map((employee) => (
                  <EmployeeAppend key={employee.employeeId} employee={employee} />
                ))} */}
              </TableBody>
            </Table>
          </div>
          
          {/* Mobile view - Card style */}
          <div className="grid grid-cols-1 gap-4 sm:hidden px-4">
            {usersWithStats.map((user) => (
              <MobileTeamMemberCard key={user.id} user={user} />
            ))}
          </div>
        </div>
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
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className={getAvatarColor(initials)}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={getRoleColor(user.role)}
        >
          {user.role}
        </Badge>
      </TableCell>
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
        <Badge variant="outline" className={getWorkloadStatusColor(workloadStatus)}>
          {workloadStatus.charAt(0).toUpperCase() + workloadStatus.slice(1)}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

// Mobile card view for team members
const MobileTeamMemberCard: React.FC<TeamMemberRowProps> = ({ user }) => {
  const getWorkloadStatus = () => {
    if (user.delayedTasks > 1) return "overloaded";
    if (user.totalTasks > 5) return "busy";
    if (user.totalTasks > 0) return "normal";
    return "available";
  };

  const workloadStatus = getWorkloadStatus();
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className={getAvatarColor(initials)}>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Badge variant="outline" className={getWorkloadStatusColor(workloadStatus)}>
          {workloadStatus.charAt(0).toUpperCase() + workloadStatus.slice(1)}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Role</p>
          <Badge
            variant="outline"
            className={`mt-1 ${getRoleColor(user.role)}`}
          >
            {user.role}
          </Badge>
        </div>
        
        <div>
          <p className="text-muted-foreground">Tasks</p>
          <p className="font-medium">
            {user.completedTasks}/{user.totalTasks}
            {user.delayedTasks > 0 && (
              <Badge variant="outline" className="ml-2 bg-status-delayed text-white text-xs">
                {user.delayedTasks} delayed
              </Badge>
            )}
          </p>
        </div>
        
        <div>
          <p className="text-muted-foreground">Time Logged</p>
          <p className="font-medium">
            {formatTimeHoursMinutes(user.totalTimeSpent)}
            <span className="text-xs text-muted-foreground">
              / {formatTimeHoursMinutes(user.totalEstimatedTime)}
            </span>
          </p>
        </div>
        
        <div>
          <p className="text-muted-foreground">Completion</p>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <Progress value={user.completionRate} className="h-2 flex-grow mr-2" />
              <span className="text-xs">{user.completionRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
