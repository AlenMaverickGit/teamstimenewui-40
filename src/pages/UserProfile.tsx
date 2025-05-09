
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Mail, MapPin, Phone, Link, Heart, MessageSquare, Share, FileText, User, Calendar, BarChart3 } from "lucide-react";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const UserProfile: React.FC = () => {
  return (
    <div className="px-4 sm:container sm:mx-auto py-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <BreadcrumbNav />
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - profile info */}
          <div className="w-full md:w-1/3">
            <Card className="overflow-hidden border shadow-sm">
              <div className="bg-primary/5 p-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" alt="Avatar" />
                </Avatar>
                <h2 className="text-xl font-bold mt-4">Fen Chiu Mao</h2>
                <p className="text-sm text-muted-foreground">UI/UX Designer & Developer</p>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Follow
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <p className="text-xl font-bold">1.4k</p>
                    <p className="text-xs text-muted-foreground">Stars</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">2.8k</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">437</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Bio</h3>
                    <p className="text-sm text-muted-foreground">
                      Redhead, Innovator, Saviour of Mankind, Hopeless Romantic, Attractive 20-something Yogurt Enthusiast...
                      <Button variant="link" className="p-0 h-auto text-primary text-sm">Read more</Button>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Location</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Bay Area, San Francisco, CA</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>fenchiumao@example.com</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>(+1) 555-123-4567</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Link className="h-4 w-4 mr-2" />
                        <span>fenchiumao.com</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/5">HTML5</Badge>
                      <Badge variant="outline" className="bg-primary/5">CSS</Badge>
                      <Badge variant="outline" className="bg-primary/5">React</Badge>
                      <Badge variant="outline" className="bg-primary/5">jQuery</Badge>
                      <Badge variant="outline" className="bg-primary/5">Angular</Badge>
                      <Badge variant="outline" className="bg-primary/5">WordPress</Badge>
                      <Badge variant="outline" className="bg-primary/5">Photoshop</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - activity and work */}
          <div className="w-full md:w-2/3 space-y-6">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="activity">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="work">
                  <FileText className="h-4 w-4 mr-2" />
                  Work Experience
                </TabsTrigger>
                <TabsTrigger value="connections">
                  <User className="h-4 w-4 mr-2" />
                  Connections
                </TabsTrigger>
              </TabsList>
              
              {/* Activity tab */}
              <TabsContent value="activity" className="space-y-6">
                {/* Update status card */}
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" alt="Avatar" />
                      </Avatar>
                      <div className="flex-1">
                        <textarea 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none placeholder:text-muted-foreground" 
                          placeholder="Share an update..." 
                          rows={2}
                        ></textarea>
                        <div className="flex justify-between mt-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              File
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Event
                            </Button>
                          </div>
                          <Button size="sm">Post</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Activities */}
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Latest Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Activity 1 */}
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <img src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=200" alt="Avatar" />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Dyanne Aceron</p>
                            <p className="text-sm text-muted-foreground">Product Manager</p>
                          </div>
                          <span className="text-xs text-muted-foreground">5 hours ago</span>
                        </div>
                        <p className="mt-2 text-sm">
                          Our team is expanding again. We are looking for a Product Manager and Software Engineer to drive our new aspects of our capital projects.
                        </p>
                        <div className="mt-2 p-4 border rounded-md bg-muted/5">
                          <p className="text-sm font-medium">We're hiring of Product Manager</p>
                          <p className="text-sm text-muted-foreground">Full-time, $60,000 - $80,000 annual</p>
                          <p className="text-sm text-muted-foreground">Bay Area, San Francisco, CA</p>
                        </div>
                        <div className="flex gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Heart className="h-4 w-4 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Activity 2 */}
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" alt="Avatar" />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Fen Chiu Mao</p>
                            <p className="text-sm text-muted-foreground">UI/UX Designer & Developer</p>
                          </div>
                          <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <p className="mt-2 text-sm">
                          Just finished the new dashboard design for the TeamsTime project. Check out the analytics visualizations!
                        </p>
                        <div className="mt-2 rounded-md overflow-hidden border">
                          <img 
                            src="public/lovable-uploads/a8438a88-c00c-4c04-b9ab-2a516e337c82.png" 
                            alt="Dashboard preview" 
                            className="w-full h-auto" 
                          />
                        </div>
                        <div className="flex gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Heart className="h-4 w-4 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Work tab */}
              <TabsContent value="work" className="space-y-6">
                <Card className="border shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Work Experience</CardTitle>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Add New
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Job 1 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md shrink-0">
                        <BarChart3 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Area Sales Manager</h3>
                        <p className="text-sm text-muted-foreground">ThemePixels, Inc., Bay Area, San Francisco, CA</p>
                        <p className="text-sm text-muted-foreground">December 2016 - Present</p>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-sm pl-2">
                          <li>Reaching the targets and goals set for my area.</li>
                          <li>Servicing the needs of my existing customers.</li>
                          <li>Maintaining relationships with existing customers for repeat business.</li>
                          <li>Developing new business opportunities in my area.</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Job 2 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md shrink-0">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">UI/UX Designer</h3>
                        <p className="text-sm text-muted-foreground">ArtStation Studios, San Francisco, CA</p>
                        <p className="text-sm text-muted-foreground">January 2014 - November 2016</p>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-sm pl-2">
                          <li>Created wireframes and prototypes for web and mobile applications.</li>
                          <li>Collaborated with development teams to implement design solutions.</li>
                          <li>Conducted user research and usability testing.</li>
                          <li>Maintained and evolved the company's design system.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md shrink-0">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bachelor of Fine Arts, Graphic Design</h3>
                        <p className="text-sm text-muted-foreground">San Francisco State University</p>
                        <p className="text-sm text-muted-foreground">2010 - 2014</p>
                        <p className="mt-2 text-sm">Graduated with honors. Focused on digital design and interactive media.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Connections tab */}
              <TabsContent value="connections" className="space-y-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>People Also Viewed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Connection 1 */}
                      <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted/5 transition-colors">
                        <Avatar className="h-10 w-10">
                          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200" alt="Avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Roy Recamadas</p>
                          <p className="text-xs text-muted-foreground">UI/UX Designer & Developer</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                      
                      {/* Connection 2 */}
                      <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted/5 transition-colors">
                        <Avatar className="h-10 w-10">
                          <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200" alt="Avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Raymart Serencio</p>
                          <p className="text-xs text-muted-foreground">Full-Stack Developer</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                      
                      {/* Connection 3 */}
                      <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted/5 transition-colors">
                        <Avatar className="h-10 w-10">
                          <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200" alt="Avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Rolando Paloso Jr</p>
                          <p className="text-xs text-muted-foreground">Licensed Architect</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                      
                      {/* Connection 4 */}
                      <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted/5 transition-colors">
                        <Avatar className="h-10 w-10">
                          <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200" alt="Avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Robert Restificar</p>
                          <p className="text-xs text-muted-foreground">Business Analyst</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
