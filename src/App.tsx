
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
import Users from "./pages/Users";
import AppHeader from "./components/AppHeader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import InvitedSignup from "./pages/InvitedSignup";
import VerifyInviteOTP from "./pages/VerifyInviteOTP";

const queryClient = new QueryClient();

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("access_token");
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Routes>
              {/* Auth Routes - No Header */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/invited-signup" element={<InvitedSignup />} />
              <Route path="/verify-invite-otp" element={<VerifyInviteOTP />} />
              
              {/* App Routes - With Header */}
              <Route
                path="/dashboard"
                element={
                  <AuthenticatedRoute>
                    <>
                      <AppHeader />
                      <main className="flex-1">
                        <Dashboard />
                      </main>
                    </>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <AuthenticatedRoute>
                    <>
                      <AppHeader />
                      <main className="flex-1">
                        <Projects />
                      </main>
                    </>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/projects/:projectId"
                element={
                  <AuthenticatedRoute>
                    <>
                      <AppHeader />
                      <main className="flex-1">
                        <ProjectDetails />
                      </main>
                    </>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <AuthenticatedRoute>
                    <>
                      <AppHeader />
                      <main className="flex-1">
                        <TeamMembers />
                      </main>
                    </>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/timesheet"
                element={
                  <AuthenticatedRoute>
                    <>
                      <AppHeader />
                      <main className="flex-1">
                        <Timesheet />
                      </main>
                    </>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <AuthenticatedRoute>
                    <>
                      <AppHeader />
                      <main className="flex-1">
                        <Users />
                      </main>
                    </>
                  </AuthenticatedRoute>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
