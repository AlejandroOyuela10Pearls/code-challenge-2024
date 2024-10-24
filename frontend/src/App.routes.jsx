import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

//const Home = lazy(() => import("./components/Home"));
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

const AppRoutes = ({ setGlobalLoading }) => {
  return (
    <Routes>
      <Route
        path="*"
        element={<Dashboard setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/"
        element={<Dashboard setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/devices"
        element={<DeviceManagement setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/users"
        element={<UserManagement setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/logs"
        element={<MaintenanceLog setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/assignments"
        element={<Assignments setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/assignments/:id"
        element={<DeviceAssignments setGlobalLoading={setGlobalLoading} />}
      />
      <Route
        path="/search"
        element={<DeviceSearch setGlobalLoading={setGlobalLoading} />}
      />
    </Routes>
  );
};

export default AppRoutes;
