import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Clock,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle2,
  BarChart,
  PieChart,
  Users,
  Boxes,
  ArrowUpCircle,
} from "lucide-react";
import { projects, tasks, users } from "@/utils/dummyData";
import {
  calculateProgress,
  formatTimeHoursMinutes,
  getStatusFromProgress,
} from "@/utils/timeUtils";
import TeamPerformanceDashboard from "./TeamPerformanceDashboard";
import { useEffect } from "react";
import axios from "axios";
import { fetchClientToken } from "../../services/tokenservicestatic";
import ResourceDashboard from "./ResourceDashboard";

interface Category {
  categoryDesc: string;
  valueDesc: string;
}

const Dashboard: React.FC = () => {
  //Implementation added by durgesh

  //greytHR API 3
  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const clientToken = await fetchClientToken();
      if (clientToken) {
        setToken(clientToken);
      } else {
        console.error("Failed to retrieve client token");
      }
    };

    getToken();
  }, []);
  console.log("token:", token);
  //greytHR API 1
  const [singleEmployee, setSingleEmployee] = useState<any>(null);
  const employeeId = 83;
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${employeeId}`,
          {
            params: { domain: "dcorpbasics.greythr.com" },
          }
        );
        setSingleEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, []);

  //greytHR API 2
  const [designation, setDesignation] = useState<string | null>(null);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryRes = await axios.get(
          `http://localhost:5000/api/employees/${employeeId}/categories`,
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
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchCategory();
  }, []);
  console.log("designation:", designation);

  //End of added implementation

  const [activeView, setActiveView] = useState("overview");

  // Calculate dashboard metrics
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const delayedTasks = tasks.filter((task) => {
    const progress = calculateProgress(task.timeSpent, task.estimatedTime);
    return !task.isCompleted && progress > 100;
  }).length;

  const totalTimeSpent = tasks.reduce((acc, task) => acc + task.timeSpent, 0);

  // Calculate project progress
  const projectProgress = projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const totalTasks = projectTasks.length;
    const completedTasks = projectTasks.filter(
      (task) => task.isCompleted
    ).length;
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      ...project,
      progress,
      totalTasks,
      completedTasks,
    };
  });

  // Find delayed and early completed tasks
  const taskHighlights = tasks
    .map((task) => {
      const progress = calculateProgress(task.timeSpent, task.estimatedTime);
      const status = getStatusFromProgress(progress, task.isCompleted);
      const assignee = users.find((user) => user.id === task.assigneeId);

      return {
        ...task,
        progress,
        status,
        assigneeName: assignee ? assignee.name : "Unassigned",
        projectName:
          projects.find((p) => p.id === task.projectId)?.name ||
          "Unknown Project",
      };
    })
    .filter(
      (task) =>
        task.status === "delayed" ||
        (task.status === "complete" && task.progress < 90)
    )
    .slice(0, 5);

  // Group tasks by assignee for team performance view
  const teamPerformance = users
    .map((user) => {
      const userTasks = tasks.filter((task) => task.assigneeId === user.id);
      const completedTasks = userTasks.filter(
        (task) => task.isCompleted
      ).length;
      const totalEstimatedTime = userTasks.reduce(
        (acc, task) => acc + task.estimatedTime,
        0
      );
      const totalSpentTime = userTasks.reduce(
        (acc, task) => acc + task.timeSpent,
        0
      );
      const efficiencyRate =
        totalEstimatedTime > 0
          ? Math.round((totalEstimatedTime / Math.max(totalSpentTime, 1)) * 100)
          : 100;

      return {
        ...user,
        taskCount: userTasks.length,
        completedTaskCount: completedTasks,
        totalEstimatedTime,
        totalSpentTime,
        efficiencyRate,
      };
    })
    .sort((a, b) => b.taskCount - a.taskCount);

  return (
    <div className="space-y-6">
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <TabsTrigger
            value="overview"
            className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm text-center px-2 py-2"
          >
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="projects"
            className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm text-center px-2 py-2"
          >
            <PieChart className="h-4 w-4" />
            Projects
          </TabsTrigger>

          <TabsTrigger
            value="team"
            className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm text-center px-2 py-2"
          >
            <Users className="h-4 w-4" />
            Team Performance
          </TabsTrigger>

          <TabsTrigger
            value="resource"
            className="flex flex-col md:flex-row items-center justify-center gap-1 text-xs md:text-sm text-center px-2 py-2"
          >
            <Boxes className="h-4 w-4" />
            Resource Allocation
          </TabsTrigger>
        </TabsList>
        <br></br> <br></br> <br></br>
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Summary Cards */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-muted-foreground">Active projects</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
                <CardTitle className="text-sm font-medium">
                  Tasks Completed
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {completedTasks} / {totalTasks}
                </div>
                <Progress
                  value={(completedTasks / totalTasks) * 100}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
                <CardTitle className="text-sm font-medium">
                  Delayed Tasks
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-status-delayed" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{delayedTasks}</div>
                <p className="text-xs text-muted-foreground">
                  Tasks behind schedule
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
                <CardTitle className="text-sm font-medium">
                  Total Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {formatTimeHoursMinutes(totalTimeSpent)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Hours tracked this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Task Highlights */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/20">
              <CardTitle>Task Highlights</CardTitle>
              <CardDescription>
                Tasks that need attention or were completed early
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {taskHighlights.map((task) => (
                  <Alert
                    key={task.id}
                    className={`border-l-4 ${
                      task.status === "delayed"
                        ? "border-l-status-delayed"
                        : "border-l-status-complete"
                    } hover:bg-muted/10 transition-colors rounded-md`}
                  >
                    <div className="flex items-start">
                      {task.status === "delayed" ? (
                        <AlertTriangle className="h-4 w-4 text-status-delayed mr-2 mt-1" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-status-complete mr-2 mt-1" />
                      )}

                      <div className="flex-1 space-y-1">
                        {/* Title and Status Label */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <AlertTitle className="text-base">
                            {task.title}
                          </AlertTitle>
                          <span
                            className={`text-xs rounded-full px-2 py-1 mt-1 sm:mt-0 w-max ${
                              task.status === "delayed"
                                ? "bg-status-delayed/10 text-status-delayed"
                                : "bg-status-complete/10 text-status-complete"
                            }`}
                          >
                            {task.status === "delayed"
                              ? "Delayed"
                              : "Early Completion"}
                          </span>
                        </div>

                        {/* Project & Assignee */}
                        <div className="flex flex-col sm:flex-row sm:items-center text-muted-foreground text-xs mt-1">
                          <div className="flex items-center mb-1 sm:mb-0">
                            <Calendar className="h-3 w-3 mr-1" />
                            {task.projectName}
                          </div>
                          <span className="hidden sm:inline mx-2">•</span>
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {task.assigneeName}
                          </div>
                        </div>

                        {/* Status & Time */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
                          <span className="text-muted-foreground">
                            {task.status === "delayed"
                              ? "Taking longer than estimated"
                              : "Completed ahead of schedule"}
                          </span>
                          <span className="font-medium">
                            {formatTimeHoursMinutes(task.timeSpent)} /{" "}
                            {formatTimeHoursMinutes(task.estimatedTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Alert>
                ))}

                {taskHighlights.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No task highlights to display
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects" className="space-y-6 animate-fade-in">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/20">
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>
                Overall completion status of active projects
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {projectProgress.map((project) => (
                  <div
                    key={project.id}
                    className="space-y-2 p-4 rounded-lg border hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.completedTasks} of {project.totalTasks} tasks
                          completed
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            project.progress === 100
                              ? "bg-status-complete/10"
                              : project.progress >= 50
                              ? "bg-status-inprogress/10"
                              : "bg-muted/20"
                          }`}
                        >
                          <span
                            className={`text-sm font-bold ${
                              project.progress === 100
                                ? "text-status-complete"
                                : project.progress >= 50
                                ? "text-status-inprogress"
                                : "text-muted-foreground"
                            }`}
                          >
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={project.progress}
                      className={`${
                        project.progress === 100
                          ? "bg-status-complete/20"
                          : project.progress >= 50
                          ? "bg-status-inprogress/20"
                          : "bg-muted/30"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="animate-fade-in">
          <TeamPerformanceDashboard />
        </TabsContent>
        <TabsContent value="resource" className="animate-fade-in">
          <ResourceDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
