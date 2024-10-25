import React, { useState, useEffect } from "react";
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
  Pagination,
  Spacer,
  Chip,
} from "@nextui-org/react";
import Icon from "./common/Icon";
import { fetchMaintenances } from "../services/devices";
import useResponsiveDesign from "../utils/ResponsiveDesign"; 

const columns = [
  { name: "DATE (YYYY/MM/DD)", uid: "date" },
  { name: "SUPPORT USER", uid: "supportUser" },
  { name: "DEVICE", uid: "device" },
  { name: "NOTES", uid: "notes" },
  { name: "CONDITION", uid: "currentCondition" },
];

const MaintenanceLog = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [visibleColumns, setVisibleColumns] = useState([0, 1]);
  const isMobile = useResponsiveDesign("mobile");

  useEffect(() => {
    fetchMaintenances()
      .then((data) => {
        setLogs(data);
      })
      .catch((error) => {
        console.error("Error fetching maintenance logs:", error);
      });
  }, []);

  const displayedLogs = logs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getChipColor = (condition) => {
    const normalizedCondition = condition.toLowerCase();

    if (normalizedCondition === "good" || normalizedCondition === "repaired") {
      return "success";
    } else if (normalizedCondition === "inmaintenance" || normalizedCondition === "in maintenance") {
      return "warning";
    } else if (normalizedCondition === "defective") {
      return "danger";
    }

    return "default";
  };

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
    <div style={{ padding: "20px" }} className="w-full">
      <Card style={{ width: "100%" }}>
        <CardHeader>
          <Icon icon="fa-solid fa-screwdriver-wrench" size="lg" className="w-[25px]" />
          <p className="text-[24px]">Maintenance Log</p>
        </CardHeader>

        <CardBody>
          <Table aria-label="Maintenance Log" css={{ height: "auto", minWidth: "100%" }}>
            <TableHeader columns={filteredColumns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={displayedLogs}>
              {displayedLogs.map((log) => (
                <TableRow key={log.id}>
                  {filteredColumns.map((column) => (
                    <TableCell key={column.uid}>
                      {column.uid === "currentCondition" ? (
                        <Chip
                          className="capitalize"
                          color={getChipColor(log.currentCondition)}
                          size="sm"
                          variant="flat"
                        >
                          {log.currentCondition}
                        </Chip>
                      ) : (
                        log[column.uid]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Spacer y={1} />
          <Pagination
            total={Math.ceil(logs.length / itemsPerPage)}
            initialPage={1}
            onChange={(page) => setCurrentPage(page)}
            page={currentPage}
          />
        </CardBody>
      </Card>

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
    </div>
  );
};

export default MaintenanceLog;
