import moment from "moment";

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
} from "@nextui-org/react";
import { useCallback } from "react";
import { EditIcon } from "../common/customIcons/EditIcon";
import { DeleteIcon } from "../common/customIcons/DeleteIcon";
import { EyeIcon } from "../common/customIcons/EyeIcon";

const columns = [
  { name: "START DATE", uid: "date" },
  { name: "END DATE", uid: "endDate" },
  { name: "ASSIGNED TO", uid: "assignedUser" },
  { name: "REASON", uid: "reason" },
  { name: "ASSIGNED BY", uid: "supportUser" },
  { name: "ACTIONS", uid: "actions" },
];

const AssignmentsList = ({
  assignments = [],
  setSelectedDevice,
  setDeviceFormData,
  setDeleteDevice,
}) => {
  const renderCell = useCallback(
    (assignment, columnKey) => {
      const renderValue = assignment[columnKey];
      switch (columnKey) {
        case "date":
        case "endDate":
          return (
            <p className="text-bold text-sm">
              {renderValue
                ? moment(renderValue).format("MMMM Do YYYY, h:mm:ss a")
                : "-"}
            </p>
          );
        case "assignedUser":
        case "supportUser":
        case "reason":
          return <p className="text-bold text-sm">{renderValue}</p>;
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-4">
              <Tooltip content="More details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => setSelectedDevice(device)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit device">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => setDeviceFormData(device)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete device">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => setDeleteDevice(device)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return renderValue;
      }
    },
    [setSelectedDevice, setDeviceFormData, setDeleteDevice]
  );

  return (
    <>
      <Table aria-label="Device Assignments List" css={{ minWidth: "100%" }}>
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
        <TableBody items={assignments}>
          {(assignment) => (
            <TableRow key={assignment.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {renderCell(assignment, column.uid)}
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

export default AssignmentsList;
