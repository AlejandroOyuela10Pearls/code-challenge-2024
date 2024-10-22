import { useState, useEffect } from "react"; 
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import UserList from "./UserList";
import Icon from "../common/Icon";
import axios from 'axios';
import AddNewUserForm from "./AddNewUserForm";

const UserManagementIndex = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const userApiUrl = import.meta.env.VITE_USER_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${userApiUrl}/listUsers`);
      if (response.data.result) {
        setUsers(response.data.result); 
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
    setSelectedUser(null);
    setIsFormOpen(true); 
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
            onPress={handleAddNewUser} 
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
