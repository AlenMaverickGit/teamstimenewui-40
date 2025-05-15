import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Clock, User, Users } from "lucide-react";
import {
  getProjectById,
  getTasksByProjectId,
  getUserById,
} from "@/utils/dummyData";
import {
  calculateProgress,
  formatTimeHoursMinutes,
  getStatusColor,
  getStatusFromProgress,
  getStatusText,
} from "@/utils/timeUtils";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import { format } from "date-fns";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  if (!projectId) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Project ID is missing</AlertDescription>
      </Alert>
    );
  }

  const project = getProjectById(projectId);

  if (!project) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Project not found</AlertDescription>
      </Alert>
    );
  }

  const projectTasks = getTasksByProjectId(projectId);
  const projectTeam = project.teamIds
    .map((id) => getUserById(id))
    .filter(Boolean);

  const completedTasks = projectTasks.filter((task) => task.isCompleted);
  const progress =
    projectTasks.length > 0
      ? Math.round((completedTasks.length / projectTasks.length) * 100)
      : 0;

  const totalEstimatedTime = projectTasks.reduce(
    (acc, task) => acc + task.estimatedTime,
    0
  );
  const totalSpentTime = projectTasks.reduce(
    (acc, task) => acc + task.timeSpent,
    0
  );

  const goBack = () => {
    navigate("/projects");
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={goBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div> */}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className={`${
                progress === 100
                  ? "bg-status-complete text-white"
                  : "bg-status-inprogress text-white"
              }`}
            >
              {progress}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Timeline</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
                  {format(new Date(project.endDate), "MMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Team Members</p>
                <p className="text-sm text-muted-foreground">
                  {projectTeam.length} members assigned
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Time Tracking</p>
                <p className="text-sm text-muted-foreground">
                  {formatTimeHoursMinutes(totalSpentTime)} /{" "}
                  {formatTimeHoursMinutes(totalEstimatedTime)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Client</h3>
                    <p className="text-muted-foreground">
                      {project.clientName}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Progress</h3>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted rounded-md p-4">
                          <p className="text-sm text-muted-foreground">
                            Total Tasks
                          </p>
                          <p className="text-2xl font-bold">
                            {projectTasks.length}
                          </p>
                        </div>

                        <div className="bg-muted rounded-md p-4">
                          <p className="text-sm text-muted-foreground">
                            Completed
                          </p>
                          <p className="text-2xl font-bold">
                            {completedTasks.length}
                          </p>
                        </div>

                        <div className="bg-muted rounded-md p-4">
                          <p className="text-sm text-muted-foreground">
                            Time Spent
                          </p>
                          <p className="text-2xl font-bold">
                            {formatTimeHoursMinutes(totalSpentTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Recent Activity</h3>
                    <div className="space-y-3 mt-2">
                      {projectTasks
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .slice(0, 3)
                        .map((task) => {
                          const progress = calculateProgress(
                            task.timeSpent,
                            task.estimatedTime
                          );
                          const status = getStatusFromProgress(
                            progress,
                            task.isCompleted
                          );
                          const assignee = getUserById(task.assigneeId);

                          return (
                            <div
                              key={task.id}
                              className={`p-3 rounded-md border-l-4 ${getStatusColor(
                                status
                              ).replace("bg-", "border-")}`}
                            >
                              <div className="flex justify-between">
                                <p className="font-medium">{task.title}</p>
                                <Badge variant="outline">
                                  {getStatusText(status)}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <User className="h-3 w-3 mr-1" />
                                <span>{assignee?.name || "Unassigned"}</span>
                                <span className="mx-2">•</span>
                                <Clock className="h-3 w-3 mr-1" />
                                <span>
                                  {formatTimeHoursMinutes(task.timeSpent)} /{" "}
                                  {formatTimeHoursMinutes(task.estimatedTime)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Project Tasks</h2>
            <Button onClick={() => setIsTaskFormOpen(true)}>Add Task</Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {projectTasks.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No tasks found for this project.
                  </p>
                </CardContent>
              </Card>
            ) : (
              projectTasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Team Members</h2>
            <Button>Add Team Member</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTeam.map((member) => (
              <Card key={member?.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={member?.avatarUrl}
                        alt={member?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{member?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member?.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Task Form Dialog */}
      <TaskFormDialog
        open={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        projectId={projectId}
      />
    </div>
  );
};

export default ProjectDetails;
