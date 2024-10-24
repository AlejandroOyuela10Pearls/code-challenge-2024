import React from "react";
import { useSelector } from "react-redux";
import Icon from "./Icon";
import AlertBox from "../common/Alertbox";
import { selectAlert } from "../../services/redux-toolkit/slices/listenerSlice";

const Header = () => {
  const alert = useSelector(selectAlert);

  return (
    <div className="flex justify-between w-full p-[1rem] bg-primary text-white relative">
      <div className="flex flex-col items-start">
        <p className="text-2xl font-bold">Device Tracking System</p>
        <p className="text-xl">10Pearls</p>
      </div>
      <div className="flex justify-center items-center relative px-[1rem]">
        <Icon icon="fa-solid fa-circle-user" size="2xl" />

        {alert.show && (
          <div className="absolute left-[-25rem] top-0 z-10">
            <AlertBox show={alert.show} text={alert.message} type={alert.status} autoHide={alert.autoHide} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
