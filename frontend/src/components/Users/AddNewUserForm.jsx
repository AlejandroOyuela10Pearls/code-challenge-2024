import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Spacer,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

const AddNewUserForm = ({ isOpen, onClose, onSave, selectedUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Standard User",
    active: true,
  });

  useEffect(() => {
    if (selectedUser) {
      setNewUser(selectedUser);
    } else {
      setNewUser({ name: "", email: "", role: "Standard User", active: true });
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedRole) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      role: selectedRole,
    }));
  };

  const handleSubmit = () => {
    onSave(newUser);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>{selectedUser ? "Edit User" : "Add New User"}</ModalHeader>
        <ModalBody>
          <Input label="Name" placeholder="Enter user's name" value={newUser.name} name="name" onChange={handleInputChange} />
          <Spacer y={1} />
          <Input label="Email" placeholder="Enter user's email" value={newUser.email} name="email" onChange={handleInputChange} />
          <Spacer y={1} />

          <div className="w-full">
            <Dropdown>
              <DropdownTrigger>
                <Input
                  readOnly
                  label="Role"
                  placeholder="Select role"
                  value={newUser.role}
                  fullWidth
                  contentRight={<i className="fa-solid fa-chevron-down"></i>}
                  className="bg-gray-50"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select role"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={newUser.role}
                onSelectionChange={(key) => handleRoleChange(Array.from(key).join(", "))}
                className="w-full"
              >
                <DropdownItem key="Standard User" className="text-left">
                  Standard User
                </DropdownItem>
                <DropdownItem key="Admin" className="text-left">
                  Admin
                </DropdownItem>
                <DropdownItem key="Support User" className="text-left">
                  Support User
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onPress={onClose}>
            Cancel
          </Button>
          <Button auto color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewUserForm;
