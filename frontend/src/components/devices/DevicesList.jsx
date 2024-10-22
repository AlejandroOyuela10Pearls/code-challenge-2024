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
import DeviceCondition from "./DeviceCondition";
import DeviceBrandImg from "./DeviceBrandImg";

const columns = [
  { name: "BRAND & MODEL", uid: "brandModel" },
  { name: "SERIAL NUMBER", uid: "serialNumber" },
  { name: "CONDITION", uid: "condition" },
  { name: "ACTIONS", uid: "actions" },
];

const DevicesList = ({ devices = [], setSelectedDevice, setDeviceFormData, setDeleteDevice }) => {
  const renderCell = useCallback((device, columnKey) => {
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
      case "serialNumber":
        return <p className="text-bold text-sm">{device.serialNumber}</p>;
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
        return device[columnKey];
    }
  }, [setSelectedDevice, setDeviceFormData, setDeleteDevice]);

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
          {(device) => (
            <TableRow key={device.id}>
              {columns.map((column) => (
                <TableCell key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {renderCell(device, column.uid)}
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

export default DevicesList;
