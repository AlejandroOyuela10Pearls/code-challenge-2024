import React from "react";
import Icon from "../common/Icon";
import DevicesList from "./DevicesList";
import DevicesDetails from "./DevicesDetails";
import DeviceForm from "./DeviceForm";
import TwoButtonsModal from "../common/TwoButtonsModal";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { brandList } from "../../utils/DeviceParams";

const DevicesIndex = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceFormData, setDeviceFormData] = useState(null);
  const [newDeviceData, setNewDeviceData] = useState(null);
  const [deleteDevice, setDeleteDevice] = useState(null);

  const setNewDeviceFormData = () => {
    setDeviceFormData({
      id: 0,
      brand: null,
      model: "",
      serial: "",
      condition: "",
      hdd: "",
      ram: "",
      gpu: "",
      cpu: "",
      notes: "",
      creation_date: "",
    });
  };

  const handleDeleteDevice = () => {
    // DELETE SELECTED DEVICE
    // RELOAD TABLE
    setDeleteDevice(null);
  };

  useEffect(() => {
    if (newDeviceData) {
      console.log("newDeviceData", newDeviceData);

      const isNew = newDeviceData.id === 0;
      if (isNew) {
        // POST NEW DATA
      } else {
        // UPDATE NEW DATA
      }
      // RELOAD TABLE
    }
  }, [newDeviceData]);

  const deleteDeviceBrand = useCallback(() => {
    if (deleteDevice) {
      const targetBrand = brandList.find((x) => x.key === deleteDevice?.brand);
      return targetBrand.label;
    }
    return "";
  }, [brandList, deleteDevice]);

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
            onPress={() => setNewDeviceFormData()}
            style={{ borderRadius: "10px" }}
          >
            Add New Device
          </Button>
        </CardHeader>

        <CardBody>
          <DevicesList
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
          setNewDeviceData(device);
          setDeviceFormData(null);
        }}
        selectedDevice={deviceFormData}
      />
      <TwoButtonsModal
        isOpen={!!deleteDevice}
        onClose={() => setDeleteDevice(null)}
        title={`Delete device ${deleteDeviceBrand()} ${deleteDevice?.model}`}
        description={`Are you sure to delete the device with Serial Number ${deleteDevice?.serial}?`}
        actionBtn={() => handleDeleteDevice()}
        closeText="Cancel"
        actionText="Delete"
      />
    </div>
  );
};

export default DevicesIndex;
