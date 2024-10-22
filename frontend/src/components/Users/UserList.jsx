import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spacer,
  Pagination,
  User,
  Button,
} from "@nextui-org/react";
import { useCallback } from "react";
import { EditIcon } from "../common/customIcons/EditIcon";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const UserList = ({ users = [], onEditUser, onToggleStatus }) => {
  const renderCell = useCallback((user, columnKey) => {
    switch (columnKey) {
      case "name":
        return <User name={user.name} description={user.email} />;
      case "email":
        return <p className="text-bold text-sm capitalize">{user.email}</p>;
      case "role":
        return <p className="text-bold text-sm capitalize">{user.role}</p>;
      case "status":
        return <p className="text-bold text-sm">{user.active ? "Active" : "Inactive"}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-4">
            <Tooltip content="Edit User">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => onEditUser(user)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Button
              auto
              color={user.active ? "danger" : "success"}
              size="sm"
              onPress={() => onToggleStatus(user.id)}
              style={{ minWidth: "100px", textAlign: "center" }}
            >
              {user.active ? "Deactivate" : "Activate"}
            </Button>
          </div>
        );
      default:
        return null; 
    }
  }, [onEditUser, onToggleStatus]);

  return (
    <>
      <Table aria-label="User List" css={{ minWidth: "100%" }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(user) => (
            <TableRow key={user.id}>
              {columns.map((column) => (
                <TableCell key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {renderCell(user, column.uid)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Spacer y={1} />
      <Pagination total={1} initialPage={1} />
    </>
  );
};

export default UserList;
