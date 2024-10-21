import appleLogo from "../assets/brands/apple-logo.png";
import dellLogo from "../assets/brands/dell-logo.png";
import asusLogo from "../assets/brands/asus-logo.png";
import hpLogo from "../assets/brands/hp-logo.png";
import lenovoLogo from "../assets/brands/lenovo-logo.png";
import acerLogo from "../assets/brands/acer-logo.png";
import alienwareLogo from "../assets/brands/alienware-logo.png";
import corsairLogo from "../assets/brands/corsair-logo.png";
import cyberPowerPcLogo from "../assets/brands/cyberPowerPc-logo.png";
import digitalStormLogo from "../assets/brands/digitalStorm-logo.png";
import falconNorthwestLogo from "../assets/brands/falconNorthwest-logo.png";
import googleLogo from "../assets/brands/google-logo.png";
import huaweiLogo from "../assets/brands/huawei-logo.png";
import lgLogo from "../assets/brands/lg-logo.png";
import microsoftLogo from "../assets/brands/microsoft-logo.png";
import razerLogo from "../assets/brands/razer-logo.png";
import samsungLogo from "../assets/brands/samsung-logo.png";

export const statusEnum = {
  NEW: "new",
  USED: "used",
  REPAIR: "underRepair",
  DEFECTIVE: "defective",
};

export const statusTextMap = {
  new: "New",
  used: "Used",
  underRepair: "Under Repair",
  defective: "Defective",
};

export const statusList = [
  { key: statusEnum.NEW, label: statusTextMap[statusEnum.NEW] },
  { key: statusEnum.USED, label: statusTextMap[statusEnum.USED] },
  { key: statusEnum.REPAIR, label: statusTextMap[statusEnum.REPAIR] },
  { key: statusEnum.DEFECTIVE, label: statusTextMap[statusEnum.DEFECTIVE] },
];

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
    case "lenovo":
      return lenovoLogo;
    case "apple":
      return appleLogo;
    case "dell":
      return dellLogo;
    case "asus":
      return asusLogo;
    case "hp":
      return hpLogo;
    case "acer":
      return acerLogo;
    case "alienware":
      return alienwareLogo;
    case "corsair":
      return corsairLogo;
    case "cyberPowerPc":
      return cyberPowerPcLogo;
    case "digitalStorm":
      return digitalStormLogo;
    case "falconNorthwest":
      return falconNorthwestLogo;
    case "google":
      return googleLogo;
    case "huawei":
      return huaweiLogo;
    case "lg":
      return lgLogo;
    case "microsoft":
      return microsoftLogo;
    case "razer":
      return razerLogo;
    case "samsung":
      return samsungLogo;
    default:
      return null;
  }
};

export const brandList = [
  { key: "lenovo", label: "Lenovo" },
  { key: "hp", label: "HP" },
  { key: "dell", label: "Dell" },
  { key: "apple", label: "Apple" },
  { key: "asus", label: "Asus" },
  { key: "acer", label: "Acer" },
  { key: "alienware", label: "Alienware" },
  { key: "corsair", label: "Corsair" },
  { key: "cyberPowerPc", label: "CyberPowerPC" },
  { key: "digitalStorm", label: "Digital Storm" },
  { key: "falconNorthwest", label: "Falcon Northwest" },
  { key: "google", label: "Google" },
  { key: "huawei", label: "Huawei" },
  { key: "lg", label: "LG" },
  { key: "microsoft", label: "Microsoft" },
  { key: "razer", label: "Razer" },
  { key: "samsung", label: "Samsung" },
];
