import moment from "moment";
import DeviceCondition from "./DeviceCondition";
import DeviceBrandImg from "./DeviceBrandImg";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

const DevicesDetails = ({ isOpen, onClose, device }) => {
  return (
    <Modal
      size="md"
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader>Device Details</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <div className="grid grid-rows-4 grid-flow-col gap-4">
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Brand</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.brand}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Model</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.model}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Serial Number</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.serialNumber}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Condition</p>
              <DeviceCondition device={device} />
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Hard Drive (HD)</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.hardDrive}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">RAM</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.ram}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">CPU</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.cpu}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">GPU</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {device?.gpu || "-"}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Added at:</p>
            <p className="text-bold text-sm capitalize text-default-600">
              {device?.addedAt
                ? moment(device.addedAt).format("MMMM Do YYYY, h:mm:ss a")
                : ""}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Notes</p>
            <p className="text-bold text-sm capitalize text-default-600">
              {device?.notes || "-"}
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          {device && <DeviceBrandImg device={device} />}
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DevicesDetails;
