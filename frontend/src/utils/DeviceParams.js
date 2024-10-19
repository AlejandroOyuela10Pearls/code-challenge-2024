import appleLogo from "../assets/brands/apple-logo.png";
import dellLogo from "../assets/brands/dell-logo.png";
import asusLogo from "../assets/brands/asus-logo.png";
import hpLogo from "../assets/brands/hp-logo.png";

export const statusTextMap = {
  new: "New",
  used: "Used",
  underRepair: "Under Repair",
  defective: "Defective",
};

export const statusColorMap = {
  new: "success",
  used: "secondary",
  underRepair: "warning",
  defective: "danger",
};

export const deviceBrandImage = (device) => {
  const { brand } = device;
  const target = brand?.toLowerCase();
  switch (target) {
    case "apple":
      return appleLogo;
    case "dell":
      return dellLogo;
    case "asus":
      return asusLogo;
    case "hp":
      return hpLogo;
    default:
      return null;
  }
};
