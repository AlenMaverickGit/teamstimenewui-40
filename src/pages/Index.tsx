
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Clock, 
  Users, 
  ArrowRight, 
  Globe, 
  Shield, 
  Award,
  Zap
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const Index = () => {
  return (
    <div className="flex flex-col">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 md:py-28 relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Work Smarter, Track Better</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              Powerful timesheet solution for global teams to track tasks, monitor progress, and deliver projects on time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 font-bold button-glow">
                <Link to="/dashboard">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
            
            {/* Hero image */}
            <div className="mt-12 md:mt-16 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl glass-effect border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&crop=entropy&fit=crop" 
                alt="Global team collaboration" 
                className="w-full object-cover object-center"
              />
            </div>
            
            <div className="mt-8 hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 inline-block">
                <p className="text-white/90 text-sm">Trusted by freelancers and companies worldwide</p>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <p className="text-lg font-medium">5,000+ Users</p>
                  <div className="w-px h-6 bg-white/20"></div>
                  <p className="text-lg font-medium">120+ Countries</p>
                  <div className="w-px h-6 bg-white/20"></div>
                  <p className="text-lg font-medium">99.9% Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Built for the Global Gig Economy</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track time, manage projects, and collaborate with your team - no matter where they are in the world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Clock className="h-10 w-10 text-primary mb-4" />}
                title="Simplified Time Tracking"
                description="Track time with one-click timers, offline support, and smart suggestions based on your work patterns."
                imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&crop=entropy&fit=crop"
              />
              <FeatureCard 
                icon={<BarChart3 className="h-10 w-10 text-primary mb-4" />}
                title="Visual Project Insights"
                description="Get real-time data visualizations to identify bottlenecks and celebrate achievements ahead of schedule."
                imageSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&crop=entropy&fit=crop"
              />
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-primary mb-4" />}
                title="Team Collaboration"
                description="Manage workloads, assign tasks, and keep everyone aligned with integrated team communication."
                imageSrc="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&crop=entropy&fit=crop"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <FeatureCard 
                icon={<Globe className="h-10 w-10 text-primary mb-4" />}
                title="Global Accessibility"
                description="Multiple currency support, time zone management, and localization make it perfect for distributed teams."
                className="md:col-span-1"
                imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&crop=entropy&fit=crop"
              />
              <FeatureCard 
                icon={<Shield className="h-10 w-10 text-primary mb-4" />}
                title="Secure & Compliant"
                description="Enterprise-grade security with GDPR, CCPA compliance, and data encryption to protect your information."
                className="md:col-span-1"
                imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&crop=entropy&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Trusted by Professionals Worldwide</h2>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                <CarouselItem className="md:basis-1/3">
                  <TestimonialCard
                    quote="TeamsTime has revolutionized how our agency tracks billable hours. The interface is intuitive and our clients love the transparency."
                    author="Sarah Johnson"
                    role="Marketing Director, CreativeIQ"
                    imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=150&auto=format&crop=faces&fit=crop"
                  />
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <TestimonialCard
                    quote="As a freelancer working with clients in multiple time zones, TeamsTime has been a game-changer for my business operations."
                    author="Miguel Rodriguez"
                    role="Independent Web Developer"
                    imageSrc="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=150&auto=format&crop=faces&fit=crop"
                  />
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <TestimonialCard
                    quote="The analytics features alone have helped us identify workflow inefficiencies that were costing us thousands each month."
                    author="Priya Patel"
                    role="Project Manager, TechFusion"
                    imageSrc="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=150&auto=format&crop=faces&fit=crop"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* CTA Section with App Screenshot */}
        <section className="py-16 bg-gradient-to-r from-primary/90 to-accent text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-6">Ready to transform how you track time?</h2>
                <p className="text-xl mb-8">
                  Join thousands of professionals who use TeamsTime to deliver projects on time and within budget.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 font-bold button-glow">
                    <Link to="/dashboard" className="flex items-center">
                      Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    See Pricing
                  </Button>
                </div>
                <p className="mt-4 text-sm opacity-90">No credit card required. 14-day free trial.</p>
              </div>
              <div className="hidden md:block">
                <div className="glass-effect p-2 rounded-lg shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&crop=entropy&fit=crop" 
                    alt="TeamsTime dashboard" 
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <Clock className="mr-2" />
                <span className="text-xl font-bold">TeamsTime</span>
              </div>
              <p className="text-gray-400 mb-4">
                Modern time tracking for the global workforce.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} TeamsTime. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  imageSrc?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className, imageSrc }) => (
  <div className={`bg-white rounded-lg shadow-md flex flex-col items-center text-center ${className} card-hover`}>
    {imageSrc && (
      <div className="w-full h-40 overflow-hidden rounded-t-lg">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-6">
      {icon}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  imageSrc?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, imageSrc }) => (
  <div className="bg-white rounded-lg p-6 shadow-md h-full">
    <div className="mb-4 text-primary">
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>
    <p className="text-gray-700 mb-4">{quote}</p>
    <div className="border-t border-gray-200 pt-4 mt-auto flex items-center">
      {imageSrc && (
        <div className="mr-3 w-10 h-10 rounded-full overflow-hidden">
          <img src={imageSrc} alt={author} className="w-full h-full object-cover" />
        </div>
      )}
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
);

export default Index;
