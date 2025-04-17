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
import AppHeader from "./components/AppHeader";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="flex-1">
            <Routes>
              {/* <Route path="/" element={<Navigate to="/timesheet" replace />} /> */}
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetails />} />
              <Route path="/team" element={<TeamMembers />} />
              <Route path="/timesheet" element={<Timesheet />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Dashboard from "./pages/Dashboard";
// import Projects from "./pages/Projects";
// import ProjectDetails from "./pages/ProjectDetails";
// import TeamMembers from "./pages/TeamMembers";
// import Timesheet from "./pages/Timesheet";
// import AppHeader from "./components/AppHeader";
// import Login from "./pages/Login";

// const queryClient = new QueryClient();

// const AppLayout = () => {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/";

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!isLoginPage && <AppHeader />}
//       <main className="flex-1">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/projects/:projectId" element={<ProjectDetails />} />
//           <Route path="/team" element={<TeamMembers />} />
//           <Route path="/timesheet" element={<Timesheet />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AppLayout />
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
