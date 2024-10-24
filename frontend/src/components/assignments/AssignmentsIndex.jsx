import DeviceSearch from "../common/DeviceSearch";
import Icon from "../common/Icon";

import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const AssignmentsIndex = ({ setGlobalLoading }) => {
  const navigate = useNavigate();

  const selectDevice = (device) => {
    const { id } = device;
    navigate(`/assignments/${id}`);
  };

  return (
    <div className="w-full p-[20px] h-full">
      <Card className="w-full h-full">
        <CardHeader className="flex justify-between pl-5 pb-0">
          <div className="flex gap-4 items-center">
            <Icon icon="fa-solid fa-house-laptop" size="xl" />
            <p className="text-[24px]">Assignments</p>
          </div>
        </CardHeader>
        <CardBody className="flex w-full h-full">
          <DeviceSearch
            className="p-[0px] pb-[10px]"
            setGlobalLoading={setGlobalLoading}
            actionOnDevice={selectDevice}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AssignmentsIndex;
