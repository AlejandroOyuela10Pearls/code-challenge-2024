import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
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
import { fetchDevices, fetchMaintenances } from "../services/devices";
import { fetchUsers } from "../services/users";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("devices");

  const itemsPerPage = 5;

  useEffect(() => {
    loadDevices();
    loadUsers();
    loadMaintenances();
  }, []);

  const loadDevices = async () => {
    try {
      const devicesList = await fetchDevices();
      setDevices(devicesList);
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  };

  const loadUsers = async () => {
    try {
      const usersList = await fetchUsers();
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const loadMaintenances = async () => {
    try {
      const maintenanceLogs = await fetchMaintenances();
      setLogs(maintenanceLogs);
    } catch (error) {
      console.error("Error fetching maintenance logs", error);
    }
  };

  const totalItems =
    activeTab === "devices"
      ? devices.length
      : activeTab === "users"
      ? users.length
      : logs.length;

  const paginatedItems =
    activeTab === "devices"
      ? devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : activeTab === "users"
      ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : logs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getChipColor = (condition) => {
    if (!condition) {
      return "default"; 
    }

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

  const renderDeviceTable = () => (
    <>
      <Table aria-label="Device List" css={{ height: "auto", minWidth: "100%" }}>
        <TableHeader>
          <TableColumn align="center">Serial Number</TableColumn>
          <TableColumn align="center">Brand</TableColumn>
          <TableColumn align="center">Model</TableColumn>
          <TableColumn align="center">Condition</TableColumn>
        </TableHeader>
        <TableBody items={paginatedItems}>
          {paginatedItems.map((device) => (
            <TableRow key={device.id}>
              <TableCell align="center">{device.serialNumber}</TableCell>
              <TableCell align="center">{device.brand}</TableCell>
              <TableCell align="center">{device.model}</TableCell>
              <TableCell align="center">{device.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Spacer y={1} />
      <Pagination
        total={Math.ceil(totalItems / itemsPerPage)}
        initialPage={1}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );

  const renderUserTable = () => (
    <>
      <Table aria-label="User List" css={{ height: "auto", minWidth: "100%" }}>
        <TableHeader>
          <TableColumn align="center">Name</TableColumn>
          <TableColumn align="center">Email</TableColumn>
          <TableColumn align="center">Role</TableColumn>
          <TableColumn align="center">Status</TableColumn>
        </TableHeader>
        <TableBody items={paginatedItems}>
          {paginatedItems.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center">{user.active ? "Active" : "Inactive"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Spacer y={1} />
      <Pagination
        total={Math.ceil(totalItems / itemsPerPage)}
        initialPage={1}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );

  const renderMaintenanceTable = () => (
    <>
      <Table aria-label="Maintenance Log" css={{ height: "auto", minWidth: "100%" }}>
        <TableHeader>
          <TableColumn align="center">Date (YYYY/MM/DD)</TableColumn>
          <TableColumn align="center">Support User</TableColumn>
          <TableColumn align="center">Device</TableColumn>
          <TableColumn align="center">Condition</TableColumn>
        </TableHeader>
        <TableBody items={paginatedItems}>
          {paginatedItems.map((log) => (
            <TableRow key={log.id}>
              <TableCell align="center">{log.date}</TableCell>
              <TableCell align="center">{log.supportUser}</TableCell>
              <TableCell align="center">{log.device}</TableCell>
              <TableCell align="center">
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
        total={Math.ceil(totalItems / itemsPerPage)}
        initialPage={1}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );

  return (
    <div className="flex w-full flex-col" style={{ padding: "20px" }}>
      <Tabs aria-label="Dashboard Tabs" onSelectionChange={setActiveTab} selectedKey={activeTab}>
        <Tab key="devices" title="Devices">
          <Card>
            <CardHeader>
              <h3>Device Overview</h3>
            </CardHeader>
            <CardBody>{renderDeviceTable()}</CardBody>
          </Card>
        </Tab>

        <Tab key="users" title="Users">
          <Card>
            <CardHeader>
              <h3>User Overview</h3>
            </CardHeader>
            <CardBody>{renderUserTable()}</CardBody>
          </Card>
        </Tab>

        <Tab key="maintenances" title="Maintenance Logs">
          <Card>
            <CardHeader>
              <h3>Maintenance Log Overview</h3>
            </CardHeader>
            <CardBody>{renderMaintenanceTable()}</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
