import React, { useState } from "react";
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
} from "@nextui-org/react";

const initialLogs = [
  {
    id: 1,
    date: "2024-10-01",
    supportUser: "John Doe",
    device: "MacBook Pro",
    notes: "Replaced battery",
    condition: "Good",
  },
  {
    id: 2,
    date: "2024-09-25",
    supportUser: "Jane Smith",
    device: "Dell XPS 13",
    notes: "Cleaned and reinstalled OS",
    condition: "Good",
  },
  {
    id: 3,
    date: "2024-09-15",
    supportUser: "John Doe",
    device: "HP Spectre",
    notes: "Screen replacement",
    condition: "Repaired",
  },
];

const MaintenanceLog = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const displayedLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <TableColumn>Date</TableColumn>
              <TableColumn>Support User</TableColumn>
              <TableColumn>Device</TableColumn>
              <TableColumn>Notes</TableColumn>
              <TableColumn>Condition</TableColumn>
            </TableHeader>
            <TableBody items={displayedLogs}>
              {(log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.supportUser}</TableCell>
                  <TableCell>{log.device}</TableCell>
                  <TableCell>{log.notes}</TableCell>
                  <TableCell>{log.condition}</TableCell>
                </TableRow>
              )}
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
