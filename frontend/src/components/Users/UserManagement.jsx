import { useState, useEffect } from "react"; 
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import UserList from "./UserList";
import Icon from "../common/Icon";
import AddNewUserForm from "./AddNewUserForm";
import { fetchUsers, createUser, updateUser, toggleUserStatus } from "../../services/users";

const UserManagementIndex = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadUsersList();
  }, []);

  const loadUsersList = async () => {
    try {
      const usersList = await fetchUsers();
      setUsers(usersList);
    } catch (error) {
      //todo: throw alert box
    }
  };

  const handleSaveUser = async (newUser) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, newUser);
      } else {
        await createUser(newUser);
      }
      setIsFormOpen(false);
      setSelectedUser(null);
      loadUsersList();  // Reload the user list after save
    } catch (error) {
      //todo: throw alert box
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleAddNewUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
      loadUsersList();
    } catch (error) {
      //todo: throw alert box
    }
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
