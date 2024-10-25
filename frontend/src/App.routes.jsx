import PrivateRoute from "./PrivateRoute";

import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

//const Home = lazy(() => import("./components/Home"));
const LoginRedirect = lazy(() => import("./LoginRedirect"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const UserManagement = lazy(() => import("./components/Users/UserManagement"));
const DeviceManagement = lazy(() =>
  import("./components/devices/DevicesIndex")
);
const Assignments = lazy(() =>
  import("./components/assignments/AssignmentsIndex")
);
const DeviceAssignments = lazy(() =>
  import("./components/assignments/DeviceAssignmentsIndex")
);
const MaintenanceLog = lazy(() => import("./components/MaintenanceLog"));
const DeviceSearch = lazy(() => import("./components/search/SearchIndex"));
const PageNotFound = lazy(() => import("./components/common/PageNotFound"));

const AppRoutes = ({ setGlobalLoading }) => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="/"
        element={
          <PrivateRoute
            component={Dashboard}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
      <Route path="/login" element={<LoginRedirect />} />
      <Route
        path="/devices"
        element={
          <PrivateRoute
            component={DeviceManagement}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute
            component={UserManagement}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
      <Route
        path="/logs"
        element={
          <PrivateRoute
            component={MaintenanceLog}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
      <Route
        path="/assignments"
        element={
          <PrivateRoute
            component={Assignments}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute
            component={DeviceAssignments}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute
            component={DeviceSearch}
            setGlobalLoading={setGlobalLoading}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
