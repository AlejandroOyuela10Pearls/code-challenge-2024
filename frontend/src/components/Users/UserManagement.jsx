import { useState } from "react"; 
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import UserList from "./UserList";
import Icon from "../common/Icon";
import AddNewUserForm from "./AddNewUserForm";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Support User", active: true },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Standard User", active: false },
];

const UserManagementIndex = () => {
  const [users, setUsers] = useState(initialUsers); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false); 

  const handleSaveUser = (newUser) => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: users.length + 1, ...newUser },
      ]);
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleAddNewUser = () => {
    setSelectedUser(null);  // Reset selectedUser when adding a new user
    setIsFormOpen(true);    // Open the form modal
  };

  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div style={{ padding: "20px" }} className="w-full">
      <Card style={{ width: "100%" }}>
        <CardHeader className="justify-between">
        <div className="flex gap-4 items-center">
            <Icon icon="fa-solid fa-users" size="xl" />
            <p className="text-[24px]">User Management</p>
          </div>
          <Button
            auto
            color="primary"
            onPress={handleAddNewUser}  // Call handleAddNewUser on button click
            style={{ borderRadius: "10px" }}
          >
            Add New User
          </Button>
        </CardHeader>

        <CardBody>
          <UserList
            users={users}
            onEditUser={handleEditUser}
            onToggleStatus={handleToggleStatus}
          />
        </CardBody>
      </Card>

      {/* Call AddNewUserForm component */}
      <AddNewUserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default UserManagementIndex;
