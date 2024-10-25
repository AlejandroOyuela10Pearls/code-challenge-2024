import moment from "moment";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { reasonsList } from "../../utils/AssignmentsParams";

const AssignmentDetails = ({ isOpen, onClose, assignment }) => {
  const targetReason = reasonsList.find((x) => x.key === assignment?.reason);

  return (
    <Modal
      size="md"
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader>Assignment Details</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Start date</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {assignment?.date
                  ? moment(assignment?.date).format("MMMM Do YYYY")
                  : "-"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">Assigned User</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {assignment?.assignedUser?.nameUser}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">End date</p>
              <p className="text-bold text-sm capitalize text-default-600">
                {assignment?.endDate
                  ? moment(assignment?.endDate).format("MMMM Do YYYY")
                  : "-"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                Assigned By Support User
              </p>
              <p className="text-bold text-sm capitalize text-default-600">
                {assignment?.supportUser?.nameUser}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Reason:</p>
            <p className="text-bold text-sm capitalize text-default-600">
              {targetReason?.label || "-"}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Notes</p>
            <p className="text-bold text-sm capitalize text-default-600">
              {assignment?.notes || "-"}
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-right">
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignmentDetails;
