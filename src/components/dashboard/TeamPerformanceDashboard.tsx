import React from "react";
import { getTeamStatistics, getProjectStatistics } from "@/utils/dummyData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { formatTimeHoursMinutes } from "@/utils/timeUtils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UsersRound,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Clock,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const TeamPerformanceDashboard: React.FC = () => {
  const teamStats = getTeamStatistics();
  const projectStats = getProjectStatistics();

  // Format data for efficiency chart
  const efficiencyData = teamStats.teamStats
    .filter((member) => member.totalTasks > 0)
    .map((member) => ({
      name: member.name,
      efficiency: member.efficiency,
      role: member.role,
      actualTime: Math.round(member.actualTime / 3600), // Convert to hours
      plannedTime: Math.round(member.plannedTime / 3600), // Convert to hours
    }));

  // Format data for project completion pie chart
  const projectCompletionData = projectStats.map((project) => ({
    name: project.projectName,
    value: project.completionRate,
    totalTasks: project.totalTasks,
    completedTasks: project.completedTasks,
  }));

  // Format data for time tracking (planned vs actual)
  const timeComparisonData = projectStats.map((project) => ({
    name: project.projectName,
    planned: Math.round(project.plannedTime / 3600), // Convert to hours
    actual: Math.round(project.actualTime / 3600), // Convert to hours
    variance: Math.round((project.actualTime - project.plannedTime) / 3600), // Convert to hours
  }));

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamStats.teamStats.length}
            </div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamStats.completedTasks} / {teamStats.totalTasks}
            </div>
            <Progress value={teamStats.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Planned Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTimeHoursMinutes(teamStats.totalPlannedTime)}
            </div>
            <p className="text-xs text-muted-foreground">Total planned time</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Actual Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTimeHoursMinutes(teamStats.totalActualTime)}
            </div>
            <p className="text-xs text-muted-foreground">Total time spent</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid grid-cols-2 max-w-[400px] mb-4">
          <TabsTrigger value="charts" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center">
            <UsersRound className="mr-2 h-4 w-4" />
            Team Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Efficiency Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
                  Team Efficiency
                </CardTitle>
                <CardDescription>
                  Comparing planned vs actual time spent
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      efficiency: {
                        theme: { light: "#3b82f6", dark: "#60a5fa" },
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={efficiencyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          tickMargin={25}
                        />
                        <YAxis
                          label={{
                            value: "Efficiency %",
                            angle: -90,
                            position: "insideLeft",
                            offset: -10,
                          }}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-md">
                                  <div className="font-medium">
                                    {payload[0].payload.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {payload[0].payload.role}
                                  </div>
                                  <div className="mt-1 grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="text-xs text-muted-foreground">
                                        Planned:
                                      </div>
                                      <div className="font-medium">
                                        {payload[0].payload.plannedTime}h
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">
                                        Actual:
                                      </div>
                                      <div className="font-medium">
                                        {payload[0].payload.actualTime}h
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <div className="text-xs text-muted-foreground">
                                      Efficiency:
                                    </div>
                                    <div
                                      className={`font-medium ${
                                        payload[0].payload.efficiency > 100
                                          ? "text-green-500"
                                          : payload[0].payload.efficiency < 90
                                          ? "text-red-500"
                                          : "text-amber-500"
                                      }`}
                                    >
                                      {payload[0].payload.efficiency}%
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="efficiency"
                          fill="var(--color-efficiency)"
                          barSize={30}
                          radius={[4, 4, 0, 0]}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Project Completion Chart */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
                  Project Completion
                </CardTitle>
                <CardDescription>
                  Task completion rate by project
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectCompletionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectCompletionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-md">
                                <div className="font-medium">
                                  {payload[0].payload.name}
                                </div>
                                <div className="mt-1">
                                  <div className="text-xs text-muted-foreground">
                                    Tasks:
                                  </div>
                                  <div className="font-medium">
                                    {payload[0].payload.completedTasks} /{" "}
                                    {payload[0].payload.totalTasks} completed
                                  </div>
                                </div>
                                <div className="mt-1">
                                  <div className="text-xs text-muted-foreground">
                                    Completion:
                                  </div>
                                  <div className="font-medium">
                                    {payload[0].payload.value.toFixed(0)}%
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Time Comparison Chart */}
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                  Time Variance By Project
                </CardTitle>
                <CardDescription>
                  Planned hours vs actual hours spent
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      planned: { theme: { light: "#3b82f6", dark: "#60a5fa" } },
                      actual: { theme: { light: "#10b981", dark: "#34d399" } },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={timeComparisonData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          tickMargin={25}
                        />
                        <YAxis
                          label={{
                            value: "Hours",
                            angle: -90,
                            position: "insideLeft",
                            offset: -10,
                          }}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const variance = payload[0].payload.variance;
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-md">
                                  <div className="font-medium">
                                    {payload[0].payload.name}
                                  </div>
                                  <div className="mt-1 grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="text-xs text-muted-foreground">
                                        Planned:
                                      </div>
                                      <div className="font-medium">
                                        {payload[0].payload.planned}h
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">
                                        Actual:
                                      </div>
                                      <div className="font-medium">
                                        {payload[0].payload.actual}h
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-1">
                                    <div className="text-xs text-muted-foreground">
                                      Variance:
                                    </div>
                                    <div
                                      className={`font-medium ${
                                        variance > 0
                                          ? "text-red-500"
                                          : variance < 0
                                          ? "text-green-500"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {variance > 0 ? "+" : ""}
                                      {variance}h
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="planned"
                          fill="var(--color-planned)"
                          name="Planned Hours"
                          barSize={20}
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="actual"
                          fill="var(--color-actual)"
                          name="Actual Hours"
                          barSize={20}
                          radius={[4, 4, 0, 0]}
                        />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Individual team member metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamStats.teamStats
                  .filter((member) => member.totalTasks > 0)
                  .sort((a, b) => b.totalTasks - a.totalTasks)
                  .map((member) => (
                    <div
                      key={member.userId}
                      className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={member.avatarUrl}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.role}
                            </div>
                          </div>
                        </div>
                        {/* <Badge variant={member.efficiency >= 100 ? "success" : member.efficiency >= 90 ? "warning" : "destructive"}>
                          {member.efficiency}% Efficiency
                        </Badge> */}
                        <Badge
                          variant={
                            member.efficiency >= 100
                              ? "default"
                              : member.efficiency >= 90
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {member.efficiency}% Efficiency
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Tasks
                          </div>
                          <div className="font-medium">
                            {member.completedTasks} / {member.totalTasks}{" "}
                            completed
                          </div>
                          <Progress
                            value={member.completionRate}
                            className="mt-2 h-2"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Time
                          </div>
                          <div className="font-medium">
                            {formatTimeHoursMinutes(member.actualTime)} /{" "}
                            {formatTimeHoursMinutes(member.plannedTime)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {member.actualTime > member.plannedTime
                              ? `${formatTimeHoursMinutes(
                                  member.actualTime - member.plannedTime
                                )} over estimate`
                              : `${formatTimeHoursMinutes(
                                  member.plannedTime - member.actualTime
                                )} under estimate`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPerformanceDashboard;
