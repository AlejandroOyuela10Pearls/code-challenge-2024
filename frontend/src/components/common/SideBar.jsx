import Icon from "./Icon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useResponsiveDesign from "../../utils/ResponsiveDesign"; 

const SideBar = () => {
  const location = useLocation();
  const isMobile = useResponsiveDesign("mobile"); 

  return (
    <section
      className="dark:bg-zinc-900 shadow-xl h-full overflow-auto bg-[#ebebeb]"
      style={{ width: isMobile ? "60px" : "250px" }} 
    >
      <div className="flex flex-col h-full justify-between text-[#627078]">
        <div className="flex flex-col">
          <Link to="/">
            <div
              className={`flex flex-col items-center py-4 ${
                location.pathname === "/" ? "bg-[#AAAAAA] text-[#374045]" : ""
              }`}
            >
              <Icon
                icon="fa-solid fa-chart-line"
                size="lg"
                className="w-[25px]"
              />
              {!isMobile && (
                <p className="text-base font-semibold text-[16px] mt-2">
                  Dashboard
                </p>
              )}
            </div>
          </Link>

          <Link to="/devices">
            <div
              className={`flex flex-col items-center py-4 ${
                location.pathname === "/devices"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon icon="fa-solid fa-laptop" size="lg" className="w-[25px]" />
              {!isMobile && (
                <p className="text-base font-semibold text-[16px] mt-2">
                  Device Management
                </p>
              )}
            </div>
          </Link>

          <Link to="/users">
            <div
              className={`flex flex-col items-center py-4 ${
                location.pathname === "/users"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon icon="fa-solid fa-users" size="lg" className="w-[25px]" />
              {!isMobile && (
                <p className="text-base font-semibold text-[16px] mt-2">
                  User Management
                </p>
              )}
            </div>
          </Link>

          <Link to="/logs">
            <div
              className={`flex flex-col items-center py-4 ${
                location.pathname === "/logs"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon
                icon="fa-solid fa-screwdriver-wrench"
                size="lg"
                className="w-[25px]"
              />
              {!isMobile && (
                <p className="text-base font-semibold text-[16px] mt-2">
                  Maintenance Log
                </p>
              )}
            </div>
          </Link>

          <Link to="/assignments">
            <div
              className={`flex flex-col items-center py-4 ${
                location.pathname === "/assignments"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon
                icon="fa-solid fa-house-laptop"
                size="lg"
                className="w-[25px]"
              />
              {!isMobile && (
                <p className="text-base font-semibold text-[16px] mt-2">
                  Assignments
                </p>
              )}
            </div>
          </Link>

          <Link to="/search">
            <div
              className={`flex flex-col items-center py-4 ${
                location.pathname === "/search"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon
                icon="fa-solid fa-magnifying-glass"
                size="lg"
                className="w-[25px]"
              />
              {!isMobile && (
                <p className="text-base font-semibold text-[16px] mt-2">
                  Search
                </p>
              )}
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center py-4">
          <Icon icon="fa-solid fa-gears" size="lg" className="w-[25px]" />
          {!isMobile && (
            <p className="text-base font-semibold text-[16px] mt-2">Settings</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SideBar;
