
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Mail, MapPin, Phone, Link, MessageSquare, Share, FileText, Calendar, 
         BarChart3, CheckCircle2, Clock, User, Star, Edit, Github, Linkedin, Twitter } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const UserProfile: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">My Profile</h1>
          <Button variant="outline" size="sm" className="h-9">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <Card className="md:col-span-1 dashboard-card">
            <CardContent className="p-0">
              {/* Profile Header */}
              <div className="bg-primary/10 p-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                  <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200" alt="User profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mt-4">John Doe</h2>
                <p className="text-sm text-muted-foreground mb-2">Senior Developer</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              
              {/* Profile Contact */}
              <div className="p-6 space-y-4">
                <div className="text-sm font-medium">Contact Information</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm">john.doe@example.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="text-sm">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <Link className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Website</div>
                      <div className="text-sm">johndoe.dev</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Skills */}
                <div>
                  <div className="text-sm font-medium mb-3">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">UI/UX</Badge>
                    <Badge variant="secondary">Agile</Badge>
                  </div>
                </div>
                
                <Separator />
                
                {/* Social Links */}
                <div>
                  <div className="text-sm font-medium mb-3">Social</div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-[#333]/10 text-[#333] hover:bg-[#333]/20">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Right Column - Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Tabs */}
            <Card className="dashboard-card p-0">
              <Tabs defaultValue="overview" className="w-full">
                <CardHeader className="pb-0">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-6">
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">About</h3>
                      <p className="text-muted-foreground text-sm">
                        Senior Developer with over 8 years of experience in web development and project leadership. Passionate about creating clean, accessible, and user-friendly web applications using modern technologies. Advocate for best practices and collaborative team environments.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Work History</h3>
                      <div className="space-y-4">
                        <WorkHistoryItem 
                          position="Senior Front-End Developer"
                          company="TechCorp Inc."
                          duration="2021 - Present"
                          description="Lead developer for the company's flagship SaaS product. Improved performance by 40% and implemented new design system."
                        />
                        
                        <WorkHistoryItem 
                          position="Full Stack Developer"
                          company="WebSolutions"
                          duration="2018 - 2021"
                          description="Worked on multiple client projects using React, Node.js and MongoDB. Led a team of 3 junior developers."
                        />
                        
                        <WorkHistoryItem 
                          position="Junior Developer"
                          company="StartupLabs"
                          duration="2016 - 2018"
                          description="Assisted in building web applications with JavaScript and PHP. Learned agile methodologies and collaborative development."
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Stats</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StatItem 
                          icon={<BarChart3 className="h-4 w-4" />}
                          title="Productivity" 
                          value="92%" 
                          progress={92}
                          color="bg-primary"
                        />
                        
                        <StatItem 
                          icon={<CheckCircle2 className="h-4 w-4" />}
                          title="Completed Tasks" 
                          value="137" 
                          progress={85}
                          color="bg-green-500"
                        />
                        
                        <StatItem 
                          icon={<Clock className="h-4 w-4" />}
                          title="Hours Logged" 
                          value="843.5h" 
                          progress={78}
                          color="bg-orange-500"
                        />
                        
                        <StatItem 
                          icon={<Star className="h-4 w-4" />}
                          title="Performance Rating" 
                          value="4.8/5" 
                          progress={96}
                          color="bg-yellow-500"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4">
                    <h3 className="text-lg font-medium">Recent Activity</h3>
                    <div className="space-y-4">
                      <ActivityItem 
                        icon={<FileText className="h-4 w-4" />}
                        title="Updated the API documentation"
                        time="2 hours ago"
                        description="Added new endpoints and fixed outdated examples"
                      />
                      
                      <ActivityItem 
                        icon={<CheckCircle2 className="h-4 w-4" />}
                        title="Completed the Dashboard redesign task"
                        time="Yesterday"
                        description="Implemented new charts and fixed responsive issues"
                      />
                      
                      <ActivityItem 
                        icon={<MessageSquare className="h-4 w-4" />}
                        title="Commented on a pull request"
                        time="2 days ago"
                        description="Suggested improvements for the authentication flow"
                      />
                      
                      <ActivityItem 
                        icon={<User className="h-4 w-4" />}
                        title="Updated profile information"
                        time="3 days ago"
                        description="Changed job title and added new skills"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects" className="space-y-4">
                    <h3 className="text-lg font-medium">Active Projects</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <ProjectItem 
                        title="Customer Portal Redesign"
                        description="Redesigning the customer portal with improved UX and new features"
                        progress={68}
                        dueDate="Nov 15, 2025"
                      />
                      
                      <ProjectItem 
                        title="Mobile App Development"
                        description="Creating iOS and Android apps using React Native"
                        progress={42}
                        dueDate="Dec 20, 2025"
                      />
                      
                      <ProjectItem 
                        title="API Integration"
                        description="Integrating third-party payment and analytics APIs"
                        progress={94}
                        dueDate="Oct 30, 2025"
                      />
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
            
            {/* Schedule Card */}
            <Card className="dashboard-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ScheduleItem 
                    time="10:00 AM" 
                    title="Weekly Team Standup" 
                    type="meeting"
                  />
                  
                  <ScheduleItem 
                    time="11:30 AM" 
                    title="Project Planning" 
                    type="meeting"
                  />
                  
                  <ScheduleItem 
                    time="2:00 PM" 
                    title="API Documentation Due" 
                    type="deadline"
                  />
                  
                  <ScheduleItem 
                    time="4:00 PM" 
                    title="1:1 with Manager" 
                    type="meeting"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WorkHistoryItemProps {
  position: string;
  company: string;
  duration: string;
  description: string;
}

const WorkHistoryItem: React.FC<WorkHistoryItemProps> = ({ position, company, duration, description }) => (
  <div className="border-l-2 border-primary/20 pl-4 pb-2">
    <h4 className="text-base font-medium">{position}</h4>
    <div className="flex items-center justify-between mb-1">
      <p className="text-sm font-medium text-primary">{company}</p>
      <p className="text-xs text-muted-foreground">{duration}</p>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  progress: number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, title, value, progress, color }) => (
  <div className="p-3 rounded-lg border">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-muted">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className="font-bold">{value}</span>
    </div>
    <Progress value={progress} className="h-1.5 bg-muted/50" indicatorClassName={color} />
  </div>
);

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, description, time }) => (
  <div className="flex gap-4">
    <div className="mt-1 p-2 rounded-full bg-primary/10 text-primary h-8 w-8 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 space-y-1">
      <div className="flex items-start justify-between">
        <p className="font-medium text-sm">{title}</p>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{time}</span>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);

interface ProjectItemProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title, description, progress, dueDate }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-medium">{title}</h4>
      <Badge variant="outline" className="text-xs">
        {dueDate}
      </Badge>
    </div>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-muted-foreground">Progress</span>
      <span className="text-xs font-medium">{progress}%</span>
    </div>
    <Progress value={progress} className="progress-thin">
      <div className="progress-bar bg-primary" style={{ width: `${progress}%` }}></div>
    </Progress>
  </div>
);

interface ScheduleItemProps {
  time: string;
  title: string;
  type: "meeting" | "deadline";
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ time, title, type }) => (
  <div className="flex items-center gap-3">
    <div className="text-center w-16">
      <p className="text-sm font-medium">{time}</p>
    </div>
    <div className={`w-3 h-3 rounded-full ${type === "meeting" ? "bg-primary" : "bg-orange-500"}`}></div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground capitalize">{type}</p>
    </div>
  </div>
);

export default UserProfile;
