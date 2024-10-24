import { User } from "@nextui-org/react";
import { deviceBrandImage, brandList } from "../../utils/DeviceParams";

const DeviceBrandImg = ({ device, description, name, model }) => {
  const brandName = brandList.find((x) => x.key === name);

  return (
    <User
      avatarProps={{
        className: "bg-white",
        imgProps: {
          className: "object-contain",
        },
        src: deviceBrandImage(device),
      }}
      description={description}
      name={brandName?.label || name}
    >
      {model}
    </User>
  );
};

export default DeviceBrandImg;
