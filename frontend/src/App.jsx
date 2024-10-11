import "./App.css";

import PageLoading from "./components/common/PageLoading";
import AppRoutes from "./App.routes";

import { Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoading fixed />}>
        <NextUIProvider>
          <AppRoutes />
        </NextUIProvider>
      </Suspense>
    </Router>
  );
}

export default App;
