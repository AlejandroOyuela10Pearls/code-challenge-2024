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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { EditIcon } from "../common/customIcons/EditIcon";
import useResponsiveDesign from "../../utils/ResponsiveDesign";
import Icon from "../common/Icon";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const UserList = ({ users = [], onEditUser, onToggleStatus }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null); // 'activate' or 'deactivate'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [visibleColumns, setVisibleColumns] = useState([0, 1]); // Keep track of the currently visible columns
  const isMobile = useResponsiveDesign("mobile");

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    onOpen();
  };

  const handleConfirm = () => {
    if (selectedUser) {
      onToggleStatus(selectedUser.id, actionType === "activate");
    }
    onOpenChange(false);
  };

  const renderCell = useCallback(
    (user, columnKey) => {
      switch (columnKey) {
        case "name":
          return <User name={user.name} description={user.email} />;
        case "email":
          return <p className="text-bold text-sm">{user.email}</p>;
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
                onClick={() => handleOpenModal(user, user.active ? "deactivate" : "activate")} // Open modal with action
                style={{ minWidth: "100px", textAlign: "center" }}
              >
                {user.active ? "Deactivate" : "Activate"}
              </Button>
            </div>
          );
        default:
          return null;
      }
    },
    [onEditUser]
  );

  const handleNextColumns = () => {
    setVisibleColumns((prev) => prev.map((index) => index + 2));
  };

  const handlePrevColumns = () => {
    setVisibleColumns((prev) => prev.map((index) => index - 2));
  };

  const filteredColumns = isMobile
    ? columns.filter((_, index) => visibleColumns.includes(index))
    : columns;

  return (
    <>
      <Table aria-label="User List" css={{ minWidth: "100%" }}>
        <TableHeader columns={filteredColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedUsers}>
          {(user) => (
            <TableRow key={user.id}>
              {filteredColumns.map((column) => (
                <TableCell key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {renderCell(user, column.uid)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Spacer y={1} />

      <Pagination
        total={Math.ceil(users.length / itemsPerPage)}
        initialPage={1}
        onChange={(page) => setCurrentPage(page)}
      />

      {isMobile && (
        <div className="flex justify-end items-center gap-4 mt-4">
          <Icon
            icon="arrow-left"
            size="2x"
            className={`cursor-pointer ${visibleColumns[0] === 0 ? "opacity-50" : ""}`}
            onClick={handlePrevColumns}
            style={{ pointerEvents: visibleColumns[0] === 0 ? "none" : "auto" }}
          />
          <Icon
            icon="arrow-right"
            size="2x"
            className={`cursor-pointer ${
              visibleColumns[1] >= columns.length - 1 ? "opacity-50" : ""
            }`}
            onClick={handleNextColumns}
            style={{ pointerEvents: visibleColumns[1] >= columns.length - 1 ? "none" : "auto" }}
          />
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h4>{actionType === "activate" ? "Activate User" : "Deactivate User"}</h4>
              </ModalHeader>
              <ModalBody>
                <span>
                  Are you sure you want to{" "}
                  {actionType === "activate" ? "activate" : "deactivate"} this user?
                </span>
              </ModalBody>
              <ModalFooter>
                <Button auto color="default" onClick={onClose}>
                  No
                </Button>
                <Button auto color="danger" onClick={handleConfirm}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserList;
