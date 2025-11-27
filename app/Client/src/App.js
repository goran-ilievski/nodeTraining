import "./App.css";
import TutorialList from "./components/TutorialList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TutorialList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
