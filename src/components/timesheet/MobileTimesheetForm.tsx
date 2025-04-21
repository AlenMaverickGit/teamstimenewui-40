import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Save, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { projects, tasks, Task, getUserById } from "@/utils/dummyData";
import { getDayNames, formatTimeHoursMinutes } from "@/utils/timeUtils";
import TimeEntry from "./TimeEntry";

const currentUserId = "user1";
const currentUser = getUserById(currentUserId) || {};
const userProjects = projects.filter((project) =>
  project.teamIds.includes(currentUserId)
);

const getUserProjectTasks = (projectId: string): Task[] =>
  tasks.filter(
    (task) => task.projectId === projectId && task.assigneeId === currentUserId
  );

const generateInitialTimeEntries = () => {
  const timeEntries: { [taskId: string]: { [day: string]: number } } = {};
  const userTasks = tasks.filter((task) => task.assigneeId === currentUserId);

  userTasks.forEach((task) => {
    if (task.timeSpent > 0) {
      timeEntries[task.id] = {};
      let remainingTime = Math.round(task.timeSpent / 60);
      const days = getDayNames();
      const daysCount = Math.floor(Math.random() * 3) + 2;
      const selectedDays = days
        .sort(() => 0.5 - Math.random())
        .slice(0, daysCount);
      selectedDays.forEach((day, index) => {
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
  });
  return timeEntries;
};

const DAY_ABBR = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MobileTimesheetForm: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState(
    userProjects[0]?.id || ""
  );
  const [timeEntries, setTimeEntries] = useState(generateInitialTimeEntries());
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const dayNames = getDayNames();

  const currentTasks = useMemo(
    () => getUserProjectTasks(activeProjectId),
    [activeProjectId]
  );

  const currentTask = currentTasks[activeTaskIndex];

  // For summary (all tasks, all projects)
  const totalTimeTracked = useMemo(() => {
    let total = 0;
    Object.values(timeEntries).forEach((taskEntries) => {
      Object.values(taskEntries).forEach((minutes) => {
        total += minutes;
      });
    });
    return total;
  }, [timeEntries]);

  const totalPlannedTime = useMemo(() => {
    let total = 0;
    userProjects.forEach((project) => {
      getUserProjectTasks(project.id).forEach((task) => {
        total += task.estimatedTime;
      });
    });
    return Math.round(total / 60);
  }, []);

  const timesheetSummary = useMemo(() => {
    const variance = totalTimeTracked - totalPlannedTime;
    const percentageComplete =
      totalPlannedTime > 0
        ? Math.round((totalTimeTracked / totalPlannedTime) * 100)
        : 0;
    return { totalTimeTracked, totalPlannedTime, variance, percentageComplete };
  }, [totalTimeTracked, totalPlannedTime]);

  // Navigation handlers
  const handlePrevTask = () => setActiveTaskIndex((i) => Math.max(0, i - 1));
  const handleNextTask = () =>
    setActiveTaskIndex((i) => Math.min(currentTasks.length - 1, i + 1));
  const handlePrevDay = () => setActiveDayIndex((i) => Math.max(0, i - 1));
  const handleNextDay = () =>
    setActiveDayIndex((i) => Math.min(dayNames.length - 1, i + 1));

  const onChangeDay = (minutes: number) => {
    if (!currentTask) return;
    const day = dayNames[activeDayIndex];
    setTimeEntries((prev) => ({
      ...prev,
      [currentTask.id]: {
        ...(prev[currentTask.id] || {}),
        [day]: minutes,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Timesheet Saved",
      description: "Your time entries have been saved successfully.",
    });
  };

  // Responsive: show tabs for projects, swipe cards for tasks, stepper for days, large buttons
  return (
    <form onSubmit={handleSave} className="relative flex flex-col h-auto">
      {/* Sticky Top Summary Bar */}
      <div className="sticky top-0 z-1 bg-background pb-2">
        <Card className="shadow-none border-0 rounded-none">
          <CardContent className="py-2 px-2 grid grid-cols-4 gap-2">
            <div className="text-[11px] text-muted-foreground">Planned</div>
            <div className="text-[11px] text-muted-foreground">Actual</div>
            <div className="text-[11px] text-muted-foreground">Variance</div>
            <div className="text-[11px] text-muted-foreground">Progress</div>
            <div className="text-xs font-bold col-span-1">
              {Math.floor(timesheetSummary.totalPlannedTime / 60)}h{" "}
              {timesheetSummary.totalPlannedTime % 60}m
            </div>
            <div className="text-xs font-bold col-span-1">
              {Math.floor(timesheetSummary.totalTimeTracked / 60)}h{" "}
              {timesheetSummary.totalTimeTracked % 60}m
            </div>
            <div
              className={`text-xs font-bold col-span-1 ${
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
            <div className="text-xs font-bold col-span-1">
              {timesheetSummary.percentageComplete}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Tabs */}
      <div className="w-full flex flex-col sm:flex-row justify-between gap-2 pt-2 pb-4">
        {userProjects.map((project) => (
          <Button
            key={project.id}
            type="button"
            onClick={() => {
              setActiveProjectId(project.id);
              setActiveTaskIndex(0);
              setActiveDayIndex(0);
            }}
            variant={activeProjectId === project.id ? "default" : "secondary"}
            className="flex-1 px-2 py-2 text-xs"
          >
            {project.name}
          </Button>
        ))}
      </div>

      {/* Task Navigation */}
      <div className="flex items-center justify-between pb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeTaskIndex === 0}
          onClick={handlePrevTask}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="font-medium text-sm truncate text-center flex-1 px-2">
          {currentTask?.title || "No tasks"}
          <br />
          <span className="text-xs text-muted-foreground">
            {currentTask?.description}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeTaskIndex === currentTasks.length - 1}
          onClick={handleNextTask}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day Navigation */}
      <div className="flex items-center justify-between pb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeDayIndex === 0}
          onClick={handlePrevDay}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="font-bold text-base text-center flex-1">
          {DAY_ABBR[activeDayIndex]}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeDayIndex === dayNames.length - 1}
          onClick={handleNextDay}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Time Entry Card */}
      <div className="w-full pb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex gap-2 items-center justify-between">
              <span>Log Time</span>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {formatTimeHoursMinutes(currentTask?.estimatedTime || 0)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-col items-center w-full">
              <span className="text-xs text-muted-foreground pb-2">
                {currentTask
                  ? "Enter time spent for this task"
                  : "No task selected"}
              </span>
              <div className="w-[70%] mx-auto">
                <TimeEntry
                  value={
                    timeEntries[currentTask?.id]?.[dayNames[activeDayIndex]] ||
                    0
                  }
                  onChange={onChangeDay}
                  estimatedTime={
                    currentTask
                      ? Math.round(currentTask.estimatedTime / 60 / 7)
                      : 0
                  }
                  completed={currentTask?.isCompleted}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Save Button at the very bottom */}
      <div className="fixed left-0 right-0 bottom-0 z-20 bg-background border-t px-4 py-2">
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full max-w-[95%] shadow-neon px-6 py-2"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Timesheet
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MobileTimesheetForm;
