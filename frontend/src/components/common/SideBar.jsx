import Icon from "./Icon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useResponsiveDesign from "../../utils/ResponsiveDesign";
import { useState } from "react";

const SideBar = () => {
  const location = useLocation();
  const isMobile = useResponsiveDesign("mobile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <div
          className="fixed top-15 z-50"
          style={{
            backgroundColor: "rgba(128, 128, 128, 0.6)", 
            padding: "10px",
            borderRadius: "5px",
            color: "white", 
          }}
        >
          <Icon
            icon={isMenuOpen ? "fa-solid fa-arrow-left" : "fa-solid fa-bars"} 
            size="2x"
            className="cursor-pointer"
            onClick={toggleMenu}
            color="white"
          />
        </div>

        <section
          className={`dark:bg-zinc-900 shadow-xl h-full overflow-auto bg-[#ebebeb] z-40 fixed ${
            isMenuOpen ? "w-full" : "w-0"
          } transition-all duration-300 ease-in-out`}
          style={{ width: isMenuOpen ? "100%" : "0" }}
        >
          <div className="flex flex-col h-full justify-between text-[#627078]">
            <div className="flex flex-col">
              <Link to="/" onClick={handleMenuClose}>
                <div
                  className={`flex flex-col items-center py-4 ${
                    location.pathname === "/" ? "bg-[#AAAAAA] text-[#374045]" : ""
                  }`}
                >
                  <Icon icon="fa-solid fa-chart-line" size="lg" className="w-[25px]" />
                  <p className="text-base font-semibold text-[16px] mt-2">Dashboard</p>
                </div>
              </Link>

              <Link to="/devices" onClick={handleMenuClose}>
                <div
                  className={`flex flex-col items-center py-4 ${
                    location.pathname === "/devices" ? "bg-[#AAAAAA] text-[#374045]" : ""
                  }`}
                >
                  <Icon icon="fa-solid fa-laptop" size="lg" className="w-[25px]" />
                  <p className="text-base font-semibold text-[16px] mt-2">Device Management</p>
                </div>
              </Link>

              <Link to="/users" onClick={handleMenuClose}>
                <div
                  className={`flex flex-col items-center py-4 ${
                    location.pathname === "/users" ? "bg-[#AAAAAA] text-[#374045]" : ""
                  }`}
                >
                  <Icon icon="fa-solid fa-users" size="lg" className="w-[25px]" />
                  <p className="text-base font-semibold text-[16px] mt-2">User Management</p>
                </div>
              </Link>

              <Link to="/logs" onClick={handleMenuClose}>
                <div
                  className={`flex flex-col items-center py-4 ${
                    location.pathname === "/logs" ? "bg-[#AAAAAA] text-[#374045]" : ""
                  }`}
                >
                  <Icon icon="fa-solid fa-screwdriver-wrench" size="lg" className="w-[25px]" />
                  <p className="text-base font-semibold text-[16px] mt-2">Maintenance Log</p>
                </div>
              </Link>

              <Link to="/assignments" onClick={handleMenuClose}>
                <div
                  className={`flex flex-col items-center py-4 ${
                    location.pathname === "/assignments" ? "bg-[#AAAAAA] text-[#374045]" : ""
                  }`}
                >
                  <Icon icon="fa-solid fa-house-laptop" size="lg" className="w-[25px]" />
                  <p className="text-base font-semibold text-[16px] mt-2">Assignments</p>
                </div>
              </Link>

              <Link to="/search" onClick={handleMenuClose}>
                <div
                  className={`flex flex-col items-center py-4 ${
                    location.pathname === "/search" ? "bg-[#AAAAAA] text-[#374045]" : ""
                  }`}
                >
                  <Icon icon="fa-solid fa-magnifying-glass" size="lg" className="w-[25px]" />
                  <p className="text-base font-semibold text-[16px] mt-2">Search</p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col items-center py-4">
              <Icon icon="fa-solid fa-gears" size="lg" className="w-[25px]" />
              <p className="text-base font-semibold text-[16px] mt-2">Settings</p>
            </div>
          </div>
        </section>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={handleMenuClose}
          ></div>
        )}
      </>
    );
  } else {
    return (
      <section
        className="dark:bg-zinc-900 shadow-xl h-full overflow-auto bg-[#ebebeb]"
        style={{ width: "250px" }}
      >
        <div className="flex flex-col h-full justify-between text-[#627078]">
          <div className="flex flex-col">
            <Link to="/">
              <div
                className={`flex flex-col items-center py-4 ${
                  location.pathname === "/" ? "bg-[#AAAAAA] text-[#374045]" : ""
                }`}
              >
                <Icon icon="fa-solid fa-chart-line" size="lg" className="w-[25px]" />
                <p className="text-base font-semibold text-[16px] mt-2">Dashboard</p>
              </div>
            </Link>

            <Link to="/devices">
              <div
                className={`flex flex-col items-center py-4 ${
                  location.pathname === "/devices" ? "bg-[#AAAAAA] text-[#374045]" : ""
                }`}
              >
                <Icon icon="fa-solid fa-laptop" size="lg" className="w-[25px]" />
                <p className="text-base font-semibold text-[16px] mt-2">Device Management</p>
              </div>
            </Link>

            <Link to="/users">
              <div
                className={`flex flex-col items-center py-4 ${
                  location.pathname === "/users" ? "bg-[#AAAAAA] text-[#374045]" : ""
                }`}
              >
                <Icon icon="fa-solid fa-users" size="lg" className="w-[25px]" />
                <p className="text-base font-semibold text-[16px] mt-2">User Management</p>
              </div>
            </Link>

            <Link to="/logs">
              <div
                className={`flex flex-col items-center py-4 ${
                  location.pathname === "/logs" ? "bg-[#AAAAAA] text-[#374045]" : ""
                }`}
              >
                <Icon icon="fa-solid fa-screwdriver-wrench" size="lg" className="w-[25px]" />
                <p className="text-base font-semibold text-[16px] mt-2">Maintenance Log</p>
              </div>
            </Link>

            <Link to="/assignments">
              <div
                className={`flex flex-col items-center py-4 ${
                  location.pathname === "/assignments" ? "bg-[#AAAAAA] text-[#374045]" : ""
                }`}
              >
                <Icon icon="fa-solid fa-house-laptop" size="lg" className="w-[25px]" />
                <p className="text-base font-semibold text-[16px] mt-2">Assignments</p>
              </div>
            </Link>

            <Link to="/search">
              <div
                className={`flex flex-col items-center py-4 ${
                  location.pathname === "/search" ? "bg-[#AAAAAA] text-[#374045]" : ""
                }`}
              >
                <Icon icon="fa-solid fa-magnifying-glass" size="lg" className="w-[25px]" />
                <p className="text-base font-semibold text-[16px] mt-2">Search</p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center py-4">
            <Icon icon="fa-solid fa-gears" size="lg" className="w-[25px]" />
            <p className="text-base font-semibold text-[16px] mt-2">Settings</p>
          </div>
        </div>
      </section>
    );
  }
};

export default SideBar;
