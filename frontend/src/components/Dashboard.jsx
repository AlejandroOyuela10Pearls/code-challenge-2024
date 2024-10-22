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
  useDisclosure,
  Pagination,
  Spacer,
} from "@nextui-org/react";

// Sample devices with assigned users
const devices = [
  {
    id: 1,
    serialNumber: "A12345",
    brand: "Apple",
    model: "MacBook Pro",
    condition: "New",
    assignedUser: "John Doe",
  },
  {
    id: 2,
    serialNumber: "D67890",
    brand: "Dell",
    model: "XPS 13",
    condition: "Used",
    assignedUser: "Jane Smith",
  },
  {
    id: 3,
    serialNumber: "P67891",
    brand: "HP",
    model: "Spectre",
    condition: "New",
    assignedUser: null,
  },
];

// Sample users
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Support User",
    active: true,
  },
  {
    id: 2,
    name: "Nath Carter",
    email: "nath.carter@example.com",
    role: "Standard User",
    active: true,
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Standard User",
    active: false,
  },
];

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div style={{ padding: "20px" }} className="w-full">
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Card style={{ flex: 1 }}>
          <CardHeader>
            <h3>Device Overview</h3>
          </CardHeader>
          <CardBody>
            <Table
              aria-label="Device List"
              css={{ height: "auto", minWidth: "100%" }}
            >
              <TableHeader>
                <TableColumn>Serial Number</TableColumn>
                <TableColumn>Brand</TableColumn>
                <TableColumn>Model</TableColumn>
                <TableColumn>Condition</TableColumn>
                <TableColumn>Assigned User</TableColumn>
              </TableHeader>
              <TableBody items={devices}>
                {(device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.serialNumber}</TableCell>
                    <TableCell>{device.brand}</TableCell>
                    <TableCell>{device.model}</TableCell>
                    <TableCell>{device.condition}</TableCell>
                    <TableCell>{device.assignedUser || "Unassigned"}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Spacer y={1} />
            <Pagination total={2} initialPage={1} />
          </CardBody>
        </Card>

        <Card style={{ flex: 1 }}>
          <CardHeader>
            <h3>User Overview</h3>
          </CardHeader>
          <CardBody>
            <Table
              aria-label="User List"
              css={{ height: "auto", minWidth: "100%" }}
            >
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody items={users}>
                {(user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Spacer y={1} />
            <Pagination total={2} initialPage={1} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
