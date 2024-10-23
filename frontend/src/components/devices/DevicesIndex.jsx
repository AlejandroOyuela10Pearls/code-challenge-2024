import React from "react";
import Icon from "../common/Icon";
import DevicesList from "./DevicesList";
import DevicesDetails from "./DevicesDetails";
import DeviceForm from "./DeviceForm";
import TwoButtonsModal from "../common/TwoButtonsModal";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import {
  fetchDevices,
  createDevice,
  updateDevice,
} from "../../services/devices";

const DevicesIndex = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceFormData, setDeviceFormData] = useState(null);
  const [deleteDevice, setDeleteDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    loadDevicesList();
  }, []);

  const loadDevicesList = async () => {
    try {
      const devicesList = await fetchDevices();
      setDevices(devicesList);
    } catch (error) {
      //todo: throw alert box
    }
  };

  const handleAddDevice = async (data) => {
    try {
      console.log("data", data);
      let response;
      if (data.id === 0) {
        response = await createDevice(data);
      } else {
        const {
          id,
          serialNumber,
          brand,
          model,
          hardDrive,
          ram,
          gpu,
          cpu,
          notes,
          condition,
        } = data;
        response = await updateDevice(id, {
          serialNumber,
          brand,
          model,
          hardDrive,
          ram,
          gpu,
          cpu,
          notes,
          condition,
        });
      }
      //todo: throw alert box
      loadDevicesList();
    } catch (error) {
      //todo: throw alert box
    }
  };

  return (
    <div style={{ padding: "20px" }} className="w-full">
      <Card style={{ width: "100%" }}>
        <CardHeader className="flex justify-between pl-5 pb-0">
          <div className="flex gap-4 items-center">
            <Icon icon="fa-solid fa-laptop" size="xl" />
            <p className="text-[24px]">Device Management</p>
          </div>
          <Button
            auto
            color="primary"
            onPress={() =>
              setDeviceFormData({
                id: 0,
                brand: "",
                model: "",
                serialNumber: "",
                condition: "",
                hardDrive: "",
                ram: "",
                gpu: "",
                cpu: "",
                notes: "",
                addedAt: "",
              })
            }
            style={{ borderRadius: "10px" }}
          >
            Add New Device
          </Button>
        </CardHeader>

        <CardBody>
          <DevicesList
            devices={devices}
            setSelectedDevice={setSelectedDevice}
            setDeviceFormData={setDeviceFormData}
            setDeleteDevice={setDeleteDevice}
          />
        </CardBody>
      </Card>
      <DevicesDetails
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        device={selectedDevice}
      />
      <DeviceForm
        isOpen={!!deviceFormData}
        onClose={(device) => {
          if (device) {
            handleAddDevice(device);
          }
          setDeviceFormData(null);
        }}
        selectedDevice={deviceFormData}
      />
      <TwoButtonsModal
        isOpen={!!deleteDevice}
        onClose={() => setDeleteDevice(null)}
        title={`Delete device ${deleteDevice?.brand} ${deleteDevice?.model}`}
        description={`Are you sure to delete the device with Serial Number ${deleteDevice?.serialNumber}?`}
        actionBtn={() => {}}
        closeText="Cancel"
        actionText="Delete"
      />
    </div>
  );
};

export default DevicesIndex;
