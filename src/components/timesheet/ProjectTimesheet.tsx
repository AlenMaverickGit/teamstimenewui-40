import React from "react";
import { Task, Project } from "@/utils/dummyData";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeHoursMinutes } from "@/utils/timeUtils";
import TimeEntry from "./TimeEntry";
import { Badge } from "@/components/ui/badge";

interface ProjectTimesheetProps {
  project: Project;
  tasks: Task[];
  timeEntries: {
    [taskId: string]: {
      [day: string]: number;
    };
  };
  onTimeChange: (taskId: string, day: string, minutes: number) => void;
  dayNames: string[];
}

const ProjectTimesheet: React.FC<ProjectTimesheetProps> = ({
  project,
  tasks,
  timeEntries,
  onTimeChange,
  dayNames,
}) => {
  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground">
        No tasks assigned to you in this project.
      </p>
    );
  }

  // Calculate the estimated time per day (simple division across the week)
  const getEstimatedTimePerDay = (totalEstimatedTime: number): number => {
    return Math.round(totalEstimatedTime / 60 / 7); // Convert to minutes and divide by days in week
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-sm text-muted-foreground w-1/4">
                  Task
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm text-muted-foreground w-1/6">
                  <div className="flex items-center gap-2">
                    Planned Time
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Total
                    </Badge>
                  </div>
                </th>
                {dayNames.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-3 text-center font-medium text-sm text-muted-foreground"
                  >
                    <div className="flex flex-col items-center">
                      <span>{day}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        (Actual)
                      </span>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-medium text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    Actual Time
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Total
                    </Badge>
                  </div>
                </th>
                <th className="px-4 py-3 text-center font-medium text-sm text-muted-foreground">
                  Variance
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const taskEntries = timeEntries[task.id] || {};
                const totalMinutes = Object.values(taskEntries).reduce(
                  (sum, mins) => sum + mins,
                  0
                );
                const estimatedTimeInMinutes = Math.round(
                  task.estimatedTime / 60
                );
                const variance = totalMinutes - estimatedTimeInMinutes;
                const estimatedTimePerDay = getEstimatedTimePerDay(
                  task.estimatedTime
                );

                return (
                  <tr key={task.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-4">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {task.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">
                        {formatTimeHoursMinutes(task.estimatedTime)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        (~{estimatedTimePerDay}m/day)
                      </div>
                    </td>

                    {dayNames.map((day) => (
                      <td key={`${task.id}-${day}`} className="px-4 py-4">
                        <TimeEntry
                          value={taskEntries[day] || 0}
                          onChange={(minutes) =>
                            onTimeChange(task.id, day, minutes)
                          }
                          estimatedTime={estimatedTimePerDay}
                          completed={task.isCompleted}
                        />
                      </td>
                    ))}

                    <td className="px-4 py-4 text-center">
                      <span className="font-medium">
                        {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`font-medium ${
                          variance > 0
                            ? "text-orange-500"
                            : variance < 0
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        {variance > 0 ? "+" : ""}
                        {Math.floor(variance / 60)}h {Math.abs(variance % 60)}m
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimesheet;
