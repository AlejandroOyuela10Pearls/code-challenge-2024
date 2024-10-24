import { useState, useEffect } from "react"; 
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../services/redux-toolkit/slices/listenerSlice"; 
import UserList from "./UserList";
import Icon from "../common/Icon";
import AddNewUserForm from "./AddNewUserForm";
import { fetchUsers, createUser, updateUser, toggleUserStatus } from "../../services/users";

const UserManagementIndex = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch(); 

  useEffect(() => {
    loadUsersList();
  }, []);

  const loadUsersList = async () => {
    try {
      const usersList = await fetchUsers();
      setUsers(usersList);
    } catch (error) {
      dispatch(setAlert({
        message: "Error loading user list.",
        status: "error",
        autoHide: true,
      }));
    }
  };

  const handleSaveUser = async (newUser) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, newUser);
        dispatch(setAlert({
          message: "User updated successfully.",
          status: "success",
          autoHide: true,
        }));
      } else {
        await createUser(newUser);
        dispatch(setAlert({
          message: "User created successfully.",
          status: "success",
          autoHide: true,
        }));
      }
      setIsFormOpen(false);
      setSelectedUser(null);
      loadUsersList();  
    } catch (error) {
      dispatch(setAlert({
        message: "Error saving user.",
        status: "error",
        autoHide: true,
      }));
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

  const handleToggleStatus = async (userId, isActive) => {
    try {
      console.log(`Toggling status for user: ${userId}, setting active to: ${isActive}`);
      await toggleUserStatus(userId, isActive);
      dispatch(setAlert({
        message: `User ${isActive ? "activated" : "deactivated"} successfully.`,
        status: "success",
        autoHide: true,
      }));
      loadUsersList();
    } catch (error) {
      dispatch(setAlert({
        message: `Error toggling user status.`,
        status: "error",
        autoHide: true,
      }));
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
