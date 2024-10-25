import PageLoading from "./components/common/PageLoading";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      return (
        <div className="w-full h-[100vh] absolute">
          <PageLoading fixed />
        </div>
      );
    }

    if (isAuthenticated) {
      navigate("/");
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, navigate]);

  return null;
};

export default LoginRedirect;
