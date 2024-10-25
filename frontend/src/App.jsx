import "./App.css";

import AppRoutes from "./App.routes";
import RouterWrapper from "./components/RouterWrapper";
import PageLoading from "./components/common/PageLoading";

import { useState, Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [globalLoading, setGlobalLoading] = useState(false);
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] absolute">
        <PageLoading fixed />
      </div>
    );
  }

  return (
    <Router>
      <Suspense>
        <NextUIProvider>
          <RouterWrapper globalLoading={globalLoading}>
            <>
              <AppRoutes setGlobalLoading={setGlobalLoading} />
              <Outlet />
            </>
          </RouterWrapper>
        </NextUIProvider>
      </Suspense>
    </Router>
  );
}

export default App;
