import { Chip } from "@nextui-org/react";
import { statusColorMap, statusTextMap } from "../../utils/DeviceParams";

const DeviceCondition = ({ device }) => {
  const { condition } = device;
  return (
    <Chip
      className="capitalize"
      color={statusColorMap[condition]}
      size="sm"
      variant="flat"
    >
      {statusTextMap[condition]}
    </Chip>
  );
};

export default DeviceCondition;
