import React from "react";
import { useDispatch } from "react-redux"; 
import { setAlert } from "../../services/redux-toolkit/slices/listenerSlice"; 
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
  deleteDevice,
} from "../../services/devices";

const DevicesIndex = () => {
  const dispatch = useDispatch(); 

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceFormData, setDeviceFormData] = useState(null);
  const [deleteDeviceData, setDeleteDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    loadDevicesList();
  }, []);

  const loadDevicesList = async () => {
    try {
      const devicesList = await fetchDevices();
      const filteredDevices = devicesList.filter(device => device.status === false); 
      setDevices(filteredDevices);
    } catch (error) {
      dispatch(
        setAlert({
          message: "Error loading devices. Please try again.",
          status: "error",
          autoHide: true,
        })
      );
    }
  };
  

  const handleAddDevice = async (data) => {
    try {
      let response;
      if (data.id === 0) {
        response = await createDevice(data);
        dispatch(
          setAlert({
            message: "Device created successfully.",
            status: "success",
            autoHide: true,
          })
        );
      } else {
        response = await updateDevice(data.id, data);
        dispatch(
          setAlert({
            message: "Device updated successfully.",
            status: "success",
            autoHide: true,
          })
        );
      }
      loadDevicesList();
    } catch (error) {
      dispatch(
        setAlert({
          message: "Error creating or updating device. Please try again.",
          status: "error",
          autoHide: true,
        })
      );
    }
  };

  const handleDeleteDevice = async () => {
    if (deleteDeviceData) {
      try {
        await deleteDevice(deleteDeviceData.id); 
        dispatch(
          setAlert({
            message: "Device deleted successfully.",
            status: "success",
            autoHide: true,
          })
        );
        setDeleteDevice(null); 
        loadDevicesList(); 
      } catch (error) {
        dispatch(
          setAlert({
            message: "Error deleting device. Please try again.",
            status: "error",
            autoHide: true,
          })
        );
      }
    }
  };

  return (
    <div className="w-full p-[20px]">
      <Card className="w-full">
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
                status: false,
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
        isOpen={!!deleteDeviceData}
        onClose={() => setDeleteDevice(null)}
        title={`Delete device ${deleteDeviceData?.brand} ${deleteDeviceData?.model}`}
        description={`Are you sure to delete the device with Serial Number ${deleteDeviceData?.serialNumber}?`}
        actionBtn={handleDeleteDevice}
        closeText="Cancel"
        actionText="Delete"
      />
    </div>
  );
};

export default DevicesIndex;
