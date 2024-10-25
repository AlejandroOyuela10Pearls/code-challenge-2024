import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import PageLoading from "./components/common/PageLoading";

const PrivateRoute = ({ component: Component, setGlobalLoading }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] absolute">
        <PageLoading fixed />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return isAuthenticated ? (
    <Component setGlobalLoading={setGlobalLoading} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
