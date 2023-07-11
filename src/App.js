import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router";
import "./App.css";
import LogInPage from "./components/app-paths/auth-page/LogInPage";
import MainPage from "./components/app-paths/MainPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="discord-clone" element={<LogInPage />} />
          <Route path="discord-clone/main/*" element={<MainPage />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
