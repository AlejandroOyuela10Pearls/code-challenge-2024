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
import { fetchMaintenances } from "../services/devices";

const MaintenanceLog = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMaintenances()
      .then((data) => {
        setLogs(data);
      })
      .catch((error) => {
        console.error("Error fetching maintenance logs:", error);
      });
  }, []);

  const displayedLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getChipColor = (condition) => {
    const normalizedCondition = condition.toLowerCase();

    if (normalizedCondition === "good" || normalizedCondition === "repaired") {
      return "success";
    } else if (
      normalizedCondition === "inmaintenance" ||
      normalizedCondition === "in maintenance"
    ) {
      return "warning";
    } else if (normalizedCondition === "defective") {
      return "danger";
    }

    return "default";
  };

  return (
    <div style={{ padding: "20px" }} className="w-full">
      <Card style={{ width: "100%" }}>
        <CardHeader>
          <h3>Maintenance Log</h3>
        </CardHeader>

        <CardBody>
          <Table
            aria-label="Maintenance Log"
            css={{ height: "auto", minWidth: "100%" }}
          >
            <TableHeader>
              <TableColumn>Date (YYYY/MM/DD)</TableColumn>
              <TableColumn>Support User</TableColumn>
              <TableColumn>Device</TableColumn>
              <TableColumn>Notes</TableColumn>
              <TableColumn>Condition</TableColumn>
            </TableHeader>
            <TableBody items={displayedLogs}>
              {displayedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.supportUser}</TableCell>
                  <TableCell>{log.device}</TableCell>
                  <TableCell>{log.notes}</TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={getChipColor(log.currentCondition)}
                      size="sm"
                      variant="flat"
                    >
                      {log.currentCondition}
                    </Chip>
                  </TableCell>
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
    </div>
  );
};

export default MaintenanceLog;