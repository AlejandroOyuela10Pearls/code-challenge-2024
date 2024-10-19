import Icon from "../common/Icon";
import React from "react";
import DevicesList from "./DevicesList";
import DevicesDetails from "./DevicesDetails";

import { useState } from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

const DevicesIndex = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  //const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Standard User",
    active: true,
  });

  /*const handleSaveUser = () => {
    if (selectedUser) {
      setDevices((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      setDevices((prevUsers) => [
        ...prevUsers,
        { id: devices.length + 1, ...newUser },
      ]);
    }
    onOpenChange();
    setSelectedUser(null);
    setNewUser({ name: "", email: "", role: "Standard User", active: true });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    onOpen();
  };

  const handleToggleStatus = (userId) => {
    setDevices((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  };*/

  return (
    <div style={{ padding: "20px" }} className="w-full">
      <Card style={{ width: "100%" }}>
        <CardHeader className="flex justify-between pl-5 pb-0">
          <div className="flex gap-4 items-center">
            <Icon icon="fa-solid fa-laptop" size="xl" />
            <p className="text-[24px]">Device Management</p>
          </div>
          <Button
            auto
            color="primary"
            onPress={() => console.log("add new device")}
            style={{ borderRadius: "10px" }}
          >
            Add New Device
          </Button>
        </CardHeader>

        <CardBody>
          <DevicesList setSelectedDevice={setSelectedDevice} />
        </CardBody>
      </Card>
      <DevicesDetails
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        device={selectedDevice}
      />
    </div>
  );
};

export default DevicesIndex;
