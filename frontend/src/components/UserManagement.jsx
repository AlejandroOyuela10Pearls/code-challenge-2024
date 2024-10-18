import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Spacer,
  Pagination,
} from "@nextui-org/react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Support User", active: true },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Standard User", active: false },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Standard User", active: true });

  const handleSaveUser = () => {
    if (selectedUser) {
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === selectedUser.id ? { ...user, ...newUser } : user)));
    } else {
      setUsers((prevUsers) => [...prevUsers, { id: users.length + 1, ...newUser }]);
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
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, active: !user.active } : user)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ width: "100%" }}>
        <CardHeader className="justify-between">
          <h3>User Management</h3>
          <Button auto color="primary" onPress={onOpen} style={{ borderRadius: "10px" }}>
            Add New User
          </Button>
        </CardHeader>

        <CardBody>
          <Table aria-label="User List" css={{ height: "auto", minWidth: "100%" }}>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody items={users}>
              {(user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <Button auto size="sm" onPress={() => handleEditUser(user)} style={{ marginRight: "5px" }}>
                      Edit
                    </Button>
                    <Button
                      auto
                      color={user.active ? "danger" : "success"} 
                      size="sm"
                      onPress={() => handleToggleStatus(user.id)}
                      style={{ minWidth: '100px', textAlign: 'center' }}
                    >
                      {user.active ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Spacer y={1} />
          <Pagination total={1} initialPage={1} />
        </CardBody>
      </Card>

      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedUser ? "Edit User" : "Add New User"}</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Spacer y={1} />
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <Spacer y={1} />
                <Input
                  label="Role"
                  placeholder="Enter role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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

export default UserManagement;
