import "./App.css";

import AppRoutes from "./App.routes";
import RouterWrapper from "./components/RouterWrapper";
import PageLoading from "./components/common/PageLoading";

import { useState, Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Outlet } from "react-router-dom";

function App() {
  const [globalLoading, setGlobalLoading] = useState(false);

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
