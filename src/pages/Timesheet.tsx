import React from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import TimesheetForm from "@/components/timesheet/TimesheetForm";
import MobileTimesheetForm from "@/components/timesheet/MobileTimesheetForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Timesheet: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className="container px-2 sm:px-6 py-6 animate-fade-in">
      <BreadcrumbNav />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="font-bold text-gradient text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Timesheet
          </h1>
          <div className="text-sm text-muted-foreground px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>Week: {getWeekRangeText()}</span>
          </div>
        </div>

        <Card className="px-2 py-4 sm:px-4 sm:py-6">
          <CardHeader className="px-2 sm:px-4">
            <CardTitle>Time Tracking</CardTitle>
            <CardDescription>
              Record time spent on your assigned tasks and projects. Compare
              actual time against planned estimates.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-4">
            {isMobile ? <MobileTimesheetForm /> : <TimesheetForm />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const getWeekRangeText = () => {
  const today = new Date();
  const day = today.getDay(); // 0-6, where 0 is Sunday

  // Calculate the date of Monday (start of week) and Sunday (end of week)
  const monday = new Date(today);
  monday.setDate(today.getDate() - day + (day === 0 ? -6 : 1)); // Adjust for Sunday

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Format dates as MMM D (e.g., "Apr 5")
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return `${formatDate(monday)} - ${formatDate(sunday)}`;
};

export default Timesheet;
