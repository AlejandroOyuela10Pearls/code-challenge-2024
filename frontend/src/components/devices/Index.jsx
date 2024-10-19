import Icon from "../common/Icon";
import React from "react";
import List from "./List";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Spacer,
} from "@nextui-org/react";

const Index = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Standard User",
    active: true,
  });

  const handleSaveUser = () => {
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
  };

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
            onPress={onOpen}
            style={{ borderRadius: "10px" }}
          >
            Add New Device
          </Button>
        </CardHeader>

        <CardBody>
          <List />
        </CardBody>
      </Card>

      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {selectedUser ? "Edit User" : "Add New User"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                <Spacer y={1} />
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <Spacer y={1} />
                <Input
                  label="Role"
                  placeholder="Enter role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button auto flat color="error" onPress={onClose}>
                  Cancel
                </Button>
                <Button auto color="primary" onPress={handleSaveUser}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Index;
