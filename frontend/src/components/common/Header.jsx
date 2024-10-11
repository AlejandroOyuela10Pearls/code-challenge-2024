import Icon from "./Icon";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Icon icon="fa-solid fa-bars" size="xl" />
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <p className="text-2xl">Device Tracking System</p>
      </NavbarContent>
      <NavbarContent justify="end">
        <Icon icon="fa-solid fa-circle-user" size="xl" />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
