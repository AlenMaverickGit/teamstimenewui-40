
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { projects, tasks, Task, Project, getUserById } from "@/utils/dummyData";
import ProjectTimesheet from "./ProjectTimesheet";
import { getDayNames, formatTimeHoursMinutes } from "@/utils/timeUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Save } from "lucide-react";

// Get current user (for demo purposes, we'll use a fixed user)
const currentUserId = "user1";
const currentUser = getUserById(currentUserId);

// Get projects assigned to the current user
const userProjects = projects.filter((project) =>
  project.teamIds.includes(currentUserId)
);

// Get tasks for each project assigned to the user
const getUserProjectTasks = (projectId: string): Task[] => {
  return tasks.filter(
    (task) => task.projectId === projectId && task.assigneeId === currentUserId
  );
};

// Generate some initial time entries for demo purposes
const generateInitialTimeEntries = () => {
  const timeEntries: { [taskId: string]: { [day: string]: number } } = {};

  // Get tasks for the current user
  const userTasks = tasks.filter((task) => task.assigneeId === currentUserId);

  // For each task, generate some random time entries
  userTasks.forEach((task) => {
    if (task.timeSpent > 0) {
      timeEntries[task.id] = {};

      // Distribute the timeSpent across different days
      let remainingTime = Math.round(task.timeSpent / 60); // Convert to minutes
      const days = getDayNames();

      // For tasks that are completed or in progress, add time entries
      if (task.isCompleted || task.timeSpent > 0) {
        // Add time to 2-4 random days
        const daysCount = Math.floor(Math.random() * 3) + 2;
        const selectedDays = days
          .sort(() => 0.5 - Math.random())
          .slice(0, daysCount);

        selectedDays.forEach((day, index) => {
          // Distribute time unevenly
          let timeForDay;
          if (index === selectedDays.length - 1) {
            timeForDay = remainingTime;
          } else {
            timeForDay = Math.floor(
              (remainingTime / (selectedDays.length - index)) *
                (Math.random() * 0.5 + 0.75)
            );
          }

          timeEntries[task.id][day] = timeForDay;
          remainingTime -= timeForDay;
        });
      }
    }
  });

  return timeEntries;
};

interface TimeEntryData {
  [taskId: string]: {
    [day: string]: number; // Time in minutes
  };
}

const TimesheetForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(userProjects[0]?.id || "");
  const [timeEntries, setTimeEntries] = useState<TimeEntryData>(
    generateInitialTimeEntries()
  );
  const { handleSubmit } = useForm();

  const dayNames = getDayNames();

  const onSubmit = () => {
    // In a real app, this would send the data to a backend
    console.log("Submitted time entries:", timeEntries);
    toast({
      title: "Timesheet Saved",
      description: "Your time entries have been saved successfully.",
    });
  };

  const handleTimeChange = (taskId: string, day: string, minutes: number) => {
    setTimeEntries((prev) => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        [day]: minutes,
      },
    }));
  };

  // Calculate total time tracked for the week
  const totalTimeTracked = useMemo(() => {
    let total = 0;
    Object.values(timeEntries).forEach((taskEntries) => {
      Object.values(taskEntries).forEach((minutes) => {
        total += minutes;
      });
    });
    return total;
  }, [timeEntries]);

  // Calculate total planned time for all tasks
  const totalPlannedTime = useMemo(() => {
    let total = 0;
    userProjects.forEach((project) => {
      getUserProjectTasks(project.id).forEach((task) => {
        total += task.estimatedTime;
      });
    });
    return Math.round(total / 60); // Convert to minutes
  }, []);

  const timesheetSummary = useMemo(() => {
    const variance = totalTimeTracked - totalPlannedTime;
    const percentageComplete =
      totalPlannedTime > 0
        ? Math.round((totalTimeTracked / totalPlannedTime) * 100)
        : 0;

    return { totalTimeTracked, totalPlannedTime, variance, percentageComplete };
  }, [totalTimeTracked, totalPlannedTime]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="col-span-1 md:col-span-3 shadow-sm border-border/40">
          <CardHeader className="pb-2 px-3 py-2.5">
            <CardTitle className="text-sm flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3 px-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-card shadow-sm border border-border/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">
                  Planned Time
                </div>
                <div className="text-xl font-semibold">
                  {Math.floor(timesheetSummary.totalPlannedTime / 60)}h{" "}
                  {timesheetSummary.totalPlannedTime % 60}m
                </div>
              </div>
              <div className="bg-card shadow-sm border border-border/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Actual Time</div>
                <div className="text-xl font-semibold">
                  {Math.floor(timesheetSummary.totalTimeTracked / 60)}h{" "}
                  {timesheetSummary.totalTimeTracked % 60}m
                </div>
              </div>
              <div className="bg-card shadow-sm border border-border/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Variance</div>
                <div
                  className={`text-xl font-semibold ${
                    timesheetSummary.variance > 0
                      ? "text-orange-500"
                      : timesheetSummary.variance < 0
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {timesheetSummary.variance > 0 ? "+" : ""}
                  {Math.floor(timesheetSummary.variance / 60)}h{" "}
                  {Math.abs(timesheetSummary.variance % 60)}m
                </div>
              </div>
              <div className="bg-card shadow-sm border border-border/30 rounded-lg p-3">
                <div className="text-xs text-muted-foreground">Completion</div>
                <div className="text-xl font-semibold">
                  {timesheetSummary.percentageComplete}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-3 w-full h-auto flex-wrap gap-2">
          {userProjects.map((project) => (
            <TabsTrigger
              key={project.id}
              value={project.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs py-1"
            >
              {project.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {userProjects.map((project) => (
          <TabsContent key={project.id} value={project.id} className="pt-1">
            <ProjectTimesheet
              project={project}
              tasks={getUserProjectTasks(project.id)}
              timeEntries={timeEntries}
              onTimeChange={handleTimeChange}
              dayNames={dayNames}
            />
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="shadow-sm transition-all hover:translate-y-[-1px] text-sm py-1.5"
          size="sm"
        >
          <Save className="mr-1.5 h-3.5 w-3.5" />
          Save Timesheet
        </Button>
      </div>
    </form>
  );
};

export default TimesheetForm;
