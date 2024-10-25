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
import { useCallback, useState } from "react";
import { EditIcon } from "../common/customIcons/EditIcon";
import { DeleteIcon } from "../common/customIcons/DeleteIcon";
import { EyeIcon } from "../common/customIcons/EyeIcon";
import Icon from "../common/Icon";
import { reasonsList } from "../../utils/AssignmentsParams";
import useResponsiveDesign from "../../utils/ResponsiveDesign";

const columns = [
  { name: "START DATE", uid: "date" },
  { name: "END DATE", uid: "endDate" },
  { name: "ASSIGNED TO", uid: "assignedUser" },
  { name: "REASON", uid: "reason" },
  { name: "ACTIONS", uid: "actions" },
];

const AssignmentsList = ({
  assignments = [],
  setSelectedAssignment,
  setAssignmentFormData,
  setDeleteAssignment,
}) => {
  const [visibleColumns, setVisibleColumns] = useState([0, 1]);
  const isMobile = useResponsiveDesign("mobile");

  const renderCell = useCallback(
    (assignment, columnKey) => {
      const renderValue = assignment[columnKey];
      switch (columnKey) {
        case "date":
        case "endDate":
          return (
            <p className="text-bold text-sm">
              {renderValue ? moment(renderValue).format("MMMM Do YYYY") : "-"}
            </p>
          );
        case "assignedUser":
        case "supportUser":
            return <p className="text-bold text-sm">{renderValue["nameUser"]}</p>;
        case "reason":
          const targetReason = reasonsList.find((x) => x.key === renderValue);
          return <p className="text-bold text-sm">{targetReason.label}</p>;
        case "actions":
          const parsedDate = assignment["date"].split("T")[0];
          const parsedEndDate = assignment["endDate"]
            ? assignment["endDate"].split("T")[0]
            : null;
          return (
            <div className="relative flex items-center justify-center gap-4">
              <Tooltip content="More details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit assignment">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    setAssignmentFormData({
                      ...assignment,
                      date: parsedDate,
                      endDate: parsedEndDate,
                    })
                  }
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete assignment">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => setDeleteAssignment(assignment)}
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
    [setSelectedAssignment, setAssignmentFormData, setDeleteAssignment]
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
      <Table aria-label="Device Assignments List" css={{ minWidth: "100%" }}>
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
        <TableBody items={assignments}>
          {(assignment) => (
            <TableRow key={assignment.id}>
              {filteredColumns.map((column) => (
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

      {isMobile && (
        <div className="flex justify-end items-center gap-4 mt-4">
          <Icon
            icon="fa-solid fa-arrow-left"
            size="2x"
            className={`cursor-pointer ${
              visibleColumns[0] === 0 ? "opacity-50" : ""
            }`}
            onClick={handlePrevColumns}
            style={{
              pointerEvents: visibleColumns[0] === 0 ? "none" : "auto",
            }}
          />
          <Icon
            icon="fa-solid fa-arrow-right"
            size="2x"
            className={`cursor-pointer ${
              visibleColumns[1] >= columns.length - 1 ? "opacity-50" : ""
            }`}
            onClick={handleNextColumns}
            style={{
              pointerEvents:
                visibleColumns[1] >= columns.length - 1 ? "none" : "auto",
            }}
          />
        </div>
      )}
      <Pagination total={Math.ceil(assignments.length / 5)} initialPage={1} />
    </>
  );
};

export default AssignmentsList;
