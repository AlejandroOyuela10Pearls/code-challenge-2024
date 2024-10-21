import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

const TwoButtonsModal = ({
  isOpen,
  onClose,
  title,
  description,
  actionBtn,
  closeText,
  actionText,
}) => {
  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {title || "Modal Title"}
        </ModalHeader>
        <ModalBody>
          <p>{description || ""}</p>
        </ModalBody>
        <ModalFooter className="flex gap-4 justify-center items-center">
          <Button color="danger" variant="light" onPress={onClose}>
            {closeText || "Close"}
          </Button>
          <Button color="primary" onPress={actionBtn}>
            {actionText || "Action"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TwoButtonsModal;
