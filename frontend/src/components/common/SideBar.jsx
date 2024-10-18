import Icon from "./Icon";

import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <section className="dark:bg-zinc-900 shadow-xl w-64 h-full overflow-auto p-6 border-[#ececec] border-r-4 bg-[#ebebeb]">
      <div className="flex flex-col h-full justify-between">
        <div className="grid gap-8">
          <Link to="/">
            <div className="flex items-center gap-4" to="/">
              <Icon icon="fa-solid fa-chart-line" size="xl" />
              <p className="text-base font-semibold">Dashboard</p>
            </div>
          </Link>
          <Link to="/devices">
            <div className="flex items-center gap-4">
              <Icon icon="fa-solid fa-laptop" size="xl" />
              <p className="text-base font-semibold">Device Management</p>
            </div>
          </Link>
          <Link to="/users">
            <div className="flex items-center gap-4">
              <Icon icon="fa-solid fa-users" size="xl" />
              <p className="text-base font-semibold">User Management</p>
            </div>
          </Link>
          <Link to="/logs">
            <div className="flex items-center gap-4">
              <Icon icon="fa-solid fa-screwdriver-wrench" size="xl" />
              <p className="text-base font-semibold">Maintenance Log</p>
            </div>
          </Link>
          <Link to="/assignments">
            <div className="flex items-center gap-4">
              <Icon icon="fa-solid fa-house-laptop" size="xl" />
              <p className="text-base font-semibold">Assignments</p>
            </div>
          </Link>
          <Link to="/search">
            <div className="flex items-center gap-4">
              <Icon icon="fa-solid fa-magnifying-glass" size="xl" />
              <p className="text-base font-semibold">Search</p>
            </div>
          </Link>
        </div>
        <div className="grid gap-8">
          <div className="flex items-center gap-4">
            <Icon icon="fa-solid fa-gears" size="xl" />
            <p className="text-base font-semibold">Settings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
