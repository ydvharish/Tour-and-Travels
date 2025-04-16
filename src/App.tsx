import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarProvider } from "@/context/NavbarContext";

import Layout from "@/components/Layout";
import HomePage from "@/pages/Index";
import CarsPage from "@/pages/Cars";
import CarDetailPage from "@/pages/CarDetail";
import BookingPage from "@/pages/Booking";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NavbarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="cars" element={<CarsPage />} />
              <Route path="cars/:id" element={<CarDetailPage />} />
              <Route path="booking/:id" element={<BookingPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </NavbarProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
