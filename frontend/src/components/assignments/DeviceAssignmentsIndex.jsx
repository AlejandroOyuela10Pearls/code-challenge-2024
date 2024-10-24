import DeviceCondition from "../devices/DeviceCondition";
import AssignmentsList from "./AssignmentsList";
import DevicesDetails from "../devices/DevicesDetails";
import Icon from "../common/Icon";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDevice } from "../../services/devices";
import { fetchDeviceAssignments } from "../../services/assignments";
import { brandList } from "../../utils/DeviceParams";
import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";

const DeviceAssignmentsIndex = () => {
  const params = useParams();

  const [device, setDevice] = useState({});
  const [showDetails, setShowDetails] = useState(null);
  const [assignmentFormData, setAssignmentFormData] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const loadDeviceData = async (id) => {
    try {
      const response = await fetchDevice(id);
      if (response) {
        setDevice(response);
      } else {
        console.log(response);
        //todo: throw alertbox
      }
    } catch (error) {
      console.log(error);
      //todo: throw alertbox
    }
  };

  const loadDeviceAssignments = async (id) => {
    try {
      const response = await fetchDeviceAssignments(id);
      if (response) {
        setAssignments(response);
      } else {
        console.log(response);
        //todo: throw alertbox
      }
    } catch (error) {
      console.log(error);
      //todo: throw alertbox
    }
  };

  useEffect(() => {
    if (params.id) {
      loadDeviceData(params.id);
      loadDeviceAssignments(params.id);
    }
  }, [params]);

  const brandName = brandList.find((x) => x.key === device?.brand);

  return (
    <div className="w-full p-[20px] h-full">
      <Card className="w-full h-full">
        <CardHeader className="flex justify-between pl-5 pb-0">
          <div className="flex gap-4 items-center">
            <Icon icon="fa-solid fa-house-laptop" size="xl" />
            <p className="text-[24px]">Assignments</p>
          </div>
          <Button
            auto
            color="primary"
            onPress={() =>
              setAssignmentFormData({
                id: 0,
                date: null,
                deviceId: device?.id,
                deviceSerial: device?.serialNumber,
                supportUserId: "",
                supportUserName: "",
                assignedUserId: "",
                assignedUserName: "",
                reason: "",
                notes: "",
                endDate: null,
              })
            }
            style={{ borderRadius: "10px" }}
          >
            Set New Assignment
          </Button>
        </CardHeader>

        <CardBody className="flex flex-col w-full h-full gap-5">
          <div className="flex justify-between w-full border-b-[1px]">
            <div className="flex w-full items-center justify-between px-5 pb-5">
              <div className="flex flex-col items-center">
                <p className="text-bold text-sm capitalize">
                  {brandName?.label}
                </p>
                <p className="text-bold text-sm capitalize text-default-400">
                  Brand
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-bold text-sm capitalize">{device?.model}</p>
                <p className="text-bold text-sm capitalize text-default-400">
                  Model
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-bold text-sm capitalize">
                  {device?.serialNumber}
                </p>
                <p className="text-bold text-sm capitalize text-default-400">
                  Serial Number
                </p>
              </div>
              <div className="flex flex-col items-center">
                <DeviceCondition device={device} />
                <p className="text-bold text-sm capitalize text-default-400">
                  Condition
                </p>
              </div>
              <Button
                color="primary"
                variant="light"
                onClick={() => setShowDetails(true)}
              >
                More details
              </Button>
            </div>
          </div>
          <AssignmentsList assignments={assignments} />
        </CardBody>
      </Card>

      {device.id && (
        <DevicesDetails
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          device={device}
        />
      )}
    </div>
  );
};

export default DeviceAssignmentsIndex;
