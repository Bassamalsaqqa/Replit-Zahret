import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import GetInvolved from "@/pages/GetInvolved";
import News from "@/pages/News";
import NewsArticle from "@/pages/NewsArticle";
import Transparency from "@/pages/Transparency";
import Donate from "@/pages/Donate";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import ThankYou from "@/pages/ThankYou";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={Programs} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route path="/news" component={News} />
        <Route path="/news/:slug" component={NewsArticle} />
        <Route path="/transparency" component={Transparency} />
        <Route path="/donate" component={Donate} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/thank-you" component={ThankYou} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
