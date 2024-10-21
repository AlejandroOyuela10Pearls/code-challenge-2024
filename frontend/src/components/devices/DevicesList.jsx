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
import { useCallback, useDebugValue, useState } from "react";
import { EditIcon } from "../common/customIcons/EditIcon";
import { DeleteIcon } from "../common/customIcons/DeleteIcon";
import { EyeIcon } from "../common/customIcons/EyeIcon";

import DeviceCondition from "./DeviceCondition";
import DeviceBrandImg from "./DeviceBrandImg";

const columns = [
  { name: "BRAND & MODEL", uid: "brandModel" },
  { name: "SERIAL NUMBER", uid: "serial" },
  { name: "CONDITION", uid: "condition" },
  { name: "ACTIONS", uid: "actions" },
];

const initialDevices = [
  {
    id: 1,
    brand: "dell",
    model: "G15",
    serial: "ABCDEF123456",
    condition: "new",
    hdd: "512 GB SSD",
    ram: "16 GB",
    gpu: "Nvidia GForce RTX",
    cpu: "Intel Core i7",
    notes: "It has some scratchs on the trackpad",
    creation_date: "2024-10-18T23:42:26.713Z",
  },
  {
    id: 2,
    brand: "apple",
    model: "Mackbook Pro",
    serial: "APPLE421646",
    condition: "used",
    hdd: "512 GB SSD",
    ram: "32 GB",
    gpu: null,
    cpu: "M2",
    notes: "None",
    creation_date: "2024-10-02T23:42:26.713Z",
  },
  {
    id: 3,
    brand: "hp",
    model: "HP132",
    serial: "ABCDEF12345677",
    condition: "underRepair",
    hdd: "512 GB SSD",
    ram: "16 GB",
    gpu: "Nvidia GForce RTX",
    cpu: "Intel Core i7",
    notes: "It has some scratchs on the trackpad",
    creation_date: "2024-10-18T23:42:26.713Z",
  },
  {
    id: 4,
    brand: "asus",
    model: "AUS123",
    serial: "ABCDEF123456",
    condition: "defective",
    hdd: "512 GB SSD",
    ram: "16 GB",
    gpu: "Nvidia GForce RTX",
    cpu: "Intel Core i7",
    notes: "It has some scratchs on the trackpad",
    creation_date: "2024-10-18T23:42:26.713Z",
  },
];

const DevicesList = ({
  setSelectedDevice,
  setDeviceFormData,
  setDeleteDevice,
}) => {
  const [devices, setDevices] = useState(initialDevices);

  const renderCell = useCallback((device, columnKey) => {
    const cellValue = device[columnKey];

    switch (columnKey) {
      case "brandModel":
        return (
          <DeviceBrandImg
            device={device}
            description={device.model}
            name={device.brand}
            model={device.model}
          />
        );
      case "serial":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "condition":
        return <DeviceCondition device={device} />;
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
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="Devices List" css={{ minWidth: "100%" }}>
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
        <TableBody items={devices}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell align={columnKey === "actions" ? "center" : "start"}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Spacer y={1} />
      <Pagination total={1} initialPage={1} />
    </>
  );
};

export default DevicesList;
