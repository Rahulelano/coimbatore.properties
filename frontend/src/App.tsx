import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";
import Areas from "./pages/Areas";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import PropertyForm from "./pages/admin/PropertyForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AgentRegister from "./pages/agent/AgentRegister";
import AgentLogin from "./pages/agent/AgentLogin";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentProfile from "./pages/agent/AgentProfile";
import UserDashboard from "./pages/user/UserDashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";

import BackgroundMusic from "@/components/BackgroundMusic";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BackgroundMusic />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/cities" element={<Areas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/properties/new" element={<PropertyForm />} />
          <Route path="/admin/properties/edit/:id" element={<PropertyForm />} />

          {/* Agent Routes */}
          <Route path="/agent/register" element={<AgentRegister />} />
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/profile" element={<AgentProfile />} />

          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
