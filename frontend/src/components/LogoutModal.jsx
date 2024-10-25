import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutModal = () => {
  const { logout } = useAuth0();

  const [timer, setTimer] = useState(5);

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  const timerInterval = setInterval(() => {
    setTimer(timer - 1);
  }, 1000);

  useEffect(() => {
    if (timer === 1) {
      logoutWithRedirect();
    }
    if (!timer) {
      clearInterval(timerInterval);
    }
  }, [timer]);

  return (
    <Modal
      backdrop="opaque"
      isOpen={true}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Unauthorized
            </ModalHeader>
            <ModalBody className="py-8 text-center">
              <p>Please contact your administrator if you require access.</p>
              <br />
              <p>You will be logged out in {timer} seconds.</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
