import React, { useState, useEffect, useCallback } from "react";
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
  Spacer,
  Chip,
} from "@nextui-org/react";
import { fetchDevices, fetchMaintenances } from "../services/devices";
import { fetchUsers } from "../services/users";
import moment from "moment";
import Icon from "./common/Icon";
import useResponsiveDesign from "../utils/ResponsiveDesign";
import { deviceBrandImage, statusColorMap, statusTextMap } from "../utils/DeviceParams";

const deviceColumns = [
  { name: "SERIAL NUMBER", uid: "serialNumber" },
  { name: "BRAND", uid: "brand" },
  { name: "MODEL", uid: "model" },
  { name: "CONDITION", uid: "condition" },
];

const userColumns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "active" },
];

const maintenanceColumns = [
  { name: "DATE (YYYY/MM/DD)", uid: "date" },
  { name: "SUPPORT USER", uid: "supportUser" },
  { name: "DEVICE", uid: "device" },
  { name: "CONDITION", uid: "currentCondition" },
];

const getChipColor = (condition) => {
  const normalizedCondition = condition?.toLowerCase();

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

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState([0, 1]); 
  const [activeTab, setActiveTab] = useState("devices");

  const itemsPerPage = 7;
  const isMobile = useResponsiveDesign("mobile");

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

  const renderCell = useCallback(
    (item, columnKey) => {
      const value = item[columnKey];

      if (columnKey === "brand") {
        const logo = deviceBrandImage(item);
        return (
          <div className="flex items-center gap-2">
            {logo && <img src={logo} alt={value} style={{ width: "30px", height: "auto" }} />}
            <span>{value}</span>
          </div>
        );
      }

      if (columnKey === "condition") {
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[value] || "default"}
            size="sm"
            variant="flat"
          >
            {statusTextMap[value] || value}
          </Chip>
        );
      }

      if (columnKey === "currentCondition") {
        return (
          <Chip
            className="capitalize"
            color={getChipColor(value)}
            size="sm"
            variant="flat"
          >
            {value}
          </Chip>
        );
      }

      if (columnKey === "active") {
        return value ? "Active" : "Inactive";
      }

      if (columnKey === "date") {
        return moment(value).format("YYYY/MM/DD");
      }

      return value;
    },
    []
  );

  const handleNextColumns = () => {
    setVisibleColumns((prev) => prev.map((index) => index + 2));
  };

  const handlePrevColumns = () => {
    setVisibleColumns((prev) => prev.map((index) => index - 2));
  };

  const filteredColumns = isMobile
    ? deviceColumns.filter((_, index) => visibleColumns.includes(index))
    : deviceColumns;

  const renderTable = (items, columns) => (
    <>
      <Table aria-label="Table" css={{ height: "auto", minWidth: "100%" }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {renderCell(item, column.uid)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Spacer y={1} />
    </>
  );

  return (
    <div className="flex w-full flex-col" style={{ padding: "20px" }}>
      <Tabs aria-label="Dashboard Tabs" onSelectionChange={setActiveTab} selectedKey={activeTab}>
        <Tab key="devices" title="Devices">
          <Card>
            <CardHeader>
              <div className="flex gap-4 items-center">
                <Icon icon="fa-solid fa-newspaper" size="xl" />
                <p className="text-[24px]">Latest Updates</p>
              </div>
            </CardHeader>
            <CardBody>{renderTable(paginatedItems, filteredColumns)}</CardBody>
          </Card>
        </Tab>

        <Tab key="users" title="Users">
          <Card>
            <CardHeader>
              <div className="flex gap-4 items-center">
                <Icon icon="fa-solid fa-newspaper" size="xl" />
                <p className="text-[24px]">Latest Updates</p>
              </div>
            </CardHeader>
            <CardBody>{renderTable(paginatedItems, filteredColumns)}</CardBody>
          </Card>
        </Tab>

        <Tab key="maintenances" title="Maintenance Logs">
          <Card>
            <CardHeader>
              <div className="flex gap-4 items-center">
                <Icon icon="fa-solid fa-newspaper" size="xl" />
                <p className="text-[24px]">Latest Updates</p>
              </div>
            </CardHeader>
            <CardBody>{renderTable(paginatedItems, filteredColumns)}</CardBody>
          </Card>
        </Tab>
      </Tabs>

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
              visibleColumns[1] >= deviceColumns.length - 1 ? "opacity-50" : ""
            }`}
            onClick={handleNextColumns}
            style={{ pointerEvents: visibleColumns[1] >= deviceColumns.length - 1 ? "none" : "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
