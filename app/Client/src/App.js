import "./App.css";
import TutorialList from "./components/TutorialList";
import LandingPage from "./components/LandingPage";
import CreateUser from "./components/CreateUser";
import UserPanel from "./components/UserPanel";
import UserDetails from "./components/UserDetails";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
    mutations: {
      retry: 3,
      retryDelay: 10000,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/tutorials" element={<TutorialList />} />
                <Route path="/user-panel" element={<UserPanel />} />
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/user-details/:userId" element={<UserDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
