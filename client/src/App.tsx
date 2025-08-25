import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/home";
import Templates from "./pages/templates";
import Builder from "./pages/builder";
import About from "./pages/about";
import Contact from "./pages/contact";
import Terms from "./pages/terms";
import HowToUse from "./pages/how-to-use";
import Tips from "./pages/tips";
import Pricing from "./pages/pricing";
import Resources from "./pages/resources";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import CoverLetters from "./pages/resources/cover-letters";
import InterviewPrep from "./pages/resources/interview-prep";
import CareerAdvice from "./pages/resources/career-advice";
import NotFound from "./pages/not-found";
import { Navbar } from "@/components/navbar";
import { Footer } from "./components/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/templates/:category?" component={Templates} />
          <Route path="/builder/:templateId?" component={Builder} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={Terms} />
          <Route path="/how-to-use" component={HowToUse} />
          <Route path="/tips" component={Tips} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/resources" component={Resources} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/resources/cover-letters" component={CoverLetters} />
          <Route path="/resources/interview-prep" component={InterviewPrep} />
          <Route path="/resources/career-advice" component={CareerAdvice} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
