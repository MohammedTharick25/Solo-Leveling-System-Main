import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterProvider } from "./contexts/CharacterContext";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import CharacterCreation from "./pages/CharacterCreation";
import Quests from "./pages/Quests";
import Inventory from "./pages/Inventory";
import Guild from "./pages/Guild";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CharacterProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/character" element={<CharacterCreation />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/guild" element={<Guild />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CharacterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
