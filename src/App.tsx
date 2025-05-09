
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import TeamMembers from "./pages/TeamMembers";
import Timesheet from "./pages/Timesheet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import CreatePassword from "./pages/CreatePassword";
import UserProfile from "./pages/UserProfile";
import AppHeader from "./components/AppHeader";

const queryClient = new QueryClient();

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("access_token");
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes - No Layout */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/create-password" element={<CreatePassword />} />
            
            {/* App Routes - With Header Layout */}
            <Route path="/dashboard" element={
              <AuthenticatedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </AuthenticatedRoute>
            } />
            
            <Route path="/projects" element={
              <AuthenticatedRoute>
                <AppLayout>
                  <Projects />
                </AppLayout>
              </AuthenticatedRoute>
            } />
            
            <Route path="/projects/:projectId" element={
              <AuthenticatedRoute>
                <AppLayout>
                  <ProjectDetails />
                </AppLayout>
              </AuthenticatedRoute>
            } />
            
            <Route path="/team" element={
              <AuthenticatedRoute>
                <AppLayout>
                  <TeamMembers />
                </AppLayout>
              </AuthenticatedRoute>
            } />
            
            <Route path="/timesheet" element={
              <AuthenticatedRoute>
                <AppLayout>
                  <Timesheet />
                </AppLayout>
              </AuthenticatedRoute>
            } />
            
            <Route path="/profile" element={
              <AuthenticatedRoute>
                <AppLayout>
                  <UserProfile />
                </AppLayout>
              </AuthenticatedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
