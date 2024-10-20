import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

//const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const UserManagement = lazy(() => import("./components/Users/UserManagement"));
const DeviceManagement = lazy(() =>
  import("./components/devices/DevicesIndex")
);
const MaintenanceLog = lazy(() => import("./components/MaintenanceLog"));

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
      <Route path="/assignments" element={<p>Assignments is comming</p>} />
      <Route path="/search" element={<p>Search is comming</p>} />
    </Routes>
  );
};

export default AppRoutes;
