import Icon from "./Icon";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <section className="dark:bg-zinc-900 shadow-xl min-w-60 w-60 h-full overflow-auto bg-[#ebebeb]">
      <div className="flex flex-col h-full justify-between text-[#627078]">
        <div className="flex flex-col">
          <Link to="/">
            <div
              className={`flex gap-2 py-3 px-3 ${
                location.pathname === "/" ? "bg-[#AAAAAA] text-[#374045]" : ""
              }`}
            >
              <Icon
                icon="fa-solid fa-chart-line"
                size="lg"
                className="w-[25px]"
              />
              <p className="text-base font-semibold text-[16px]">Dashboard</p>
            </div>
          </Link>
          <Link to="/devices">
            <div
              className={`flex gap-2 py-3 px-3 ${
                location.pathname === "/devices"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon icon="fa-solid fa-laptop" size="lg" className="w-[25px]" />
              <p className="text-base font-semibold text-[16px]">
                Device Management
              </p>
            </div>
          </Link>
          <Link to="/users">
            <div
              className={`flex gap-2 py-3 px-3 ${
                location.pathname === "/users"
                  ? "bg-[#AAAAAA] text-[#374045]"
                  : ""
              }`}
            >
              <Icon icon="fa-solid fa-users" size="lg" className="w-[25px]" />
              <p className="text-base font-semibold text-[16px]">
                User Management
              </p>
            </div>
          </Link>
          <Link to="/logs">
            <div
              className={`flex gap-2 py-3 px-3 ${
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
              <p className="text-base font-semibold text-[16px]">
                Maintenance Log
              </p>
            </div>
          </Link>
          <Link to="/assignments">
            <div
              className={`flex gap-2 py-3 px-3 ${
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
              <p className="text-base font-semibold text-[16px]">Assignments</p>
            </div>
          </Link>
          <Link to="/search">
            <div
              className={`flex gap-2 py-3 px-3 ${
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
              <p className="text-base font-semibold text-[16px]">Search</p>
            </div>
          </Link>
        </div>
        <div className="grid gap-8">
          <div className="flex gap-2 py-3 px-3">
            <Icon icon="fa-solid fa-gears" size="lg" className="w-[25px]" />
            <p className="text-base font-semibold text-[16px]">Settings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
