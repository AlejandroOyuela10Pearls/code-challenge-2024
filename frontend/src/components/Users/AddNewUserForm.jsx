import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Spacer,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

const roles = [
  { label: "Standard User", value: "Standard User" },
  { label: "Admin", value: "Admin" },
  { label: "Support User", value: "Support User" },
];

const AddNewUserForm = ({ isOpen, onClose, onSave, selectedUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Standard User",
    active: true,
  });
  const [selectedRole, setSelectedRole] = useState(new Set([newUser.role]));

  useEffect(() => {
    if (selectedUser) {
      setNewUser(selectedUser);
      setSelectedRole(new Set([selectedUser.role]));
    } else {
      setNewUser({ name: "", email: "", role: "Standard User", active: true });
      setSelectedRole(new Set(["Standard User"]));
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (key) => {
    const role = Array.from(key)[0];
    setSelectedRole(new Set([role]));
    setNewUser((prevUser) => ({
      ...prevUser,
      role: role,
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
          <Input
            label="Name"
            placeholder="Enter user's name"
            value={newUser.name}
            name="name"
            onChange={handleInputChange}
          />
          <Spacer y={1} />
          <Input
            label="Email"
            placeholder="Enter user's email"
            value={newUser.email}
            name="email"
            onChange={handleInputChange}
          />
          <Spacer y={1} />

          <div className="w-full">
            <Select
              label="Role"
              placeholder="Select a role"
              items={roles}
              selectedKeys={selectedRole}
              onSelectionChange={handleRoleChange}
              isRequired
            >
              {roles.map((role) => (
                <SelectItem key={role.value}>{role.label}</SelectItem>
              ))}
            </Select>
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
