import "./App.css";
import TutorialList from "./components/TutorialList";
import LandingPage from "./components/LandingPage";
import CreateUser from "./components/CreateUser";
import UserPanel from "./components/UserPanel";
import UserDetails from "./components/UserDetails";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: any) => {
        // Only retry on 500 errors, max 3 times
        if (error?.message?.includes("500") || error?.status === 500) {
          return failureCount < 3;
        }
        return false;
      },
      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 10000),
    },
    mutations: {
      retry: (failureCount: number, error: any) => {
        // Only retry on 500 errors, max 3 times
        if (error?.message?.includes("500") || error?.status === 500) {
          return failureCount < 3;
        }
        return false;
      },
      retryDelay: 10000,
    },
  },
});

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<string>("login");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    if (view.startsWith("user-details-")) {
      const userId = view.replace("user-details-", "");
      setSelectedUserId(userId);
      setCurrentView("user-details");
    } else {
      setSelectedUserId(null);
      setCurrentView(view);
    }
  };

  const renderView = () => {
    if (!isAuthenticated) {
      if (currentView === "create-user") {
        return <CreateUser onNavigate={handleNavigate} />;
      }
      return <LandingPage onNavigate={handleNavigate} />;
    }

    switch (currentView) {
      case "tutorials":
        return <TutorialList onNavigate={handleNavigate} />;
      case "user-panel":
        return <UserPanel onNavigate={handleNavigate} />;
      case "user-details":
        return (
          <UserDetails onNavigate={handleNavigate} userId={selectedUserId} />
        );
      default:
        return <TutorialList onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigate} />
      {renderView()}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
