import PageLoading from "./common/PageLoading";
import Header from "./common/Header";
import SideBar from "./common/SideBar";
import LogoutModal from "./LogoutModal";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../services/redux-toolkit/slices/userSlice";
import { fetchUsers } from "../services/users";
import { useAuth0 } from "@auth0/auth0-react";

const RouterWrapper = ({ globalLoading, children }) => {
  const dispatch = useDispatch();

  const { user } = useAuth0();

  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (user) {
      //checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const { email } = user;
    try {
      const usersList = await fetchUsers();
      const targetUser = usersList.find(
        (x) => x.email === email && x.role === "Support User"
      );
      if (targetUser) {
        dispatch(setUser(targetUser));
      } else {
        setShowLogout(true);
      }
    } catch (error) {
      logoutWithRedirect();
    }
  };

  return (
    <div className="flex flex-col items-center h-[100vh] w-full">
      {showLogout ? (
        <LogoutModal />
      ) : (
        <>
          <Header />
          <div className="flex w-full h-full">
            <SideBar />
            {globalLoading ? (
              <div className="w-full h-[100vh] absolute">
                <PageLoading fixed />
              </div>
            ) : (
              children
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RouterWrapper;
