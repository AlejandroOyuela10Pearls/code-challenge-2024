import PropTypes from "prop-types";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

const NewUserForm = ({ setStep, setIsLoading }) => {
  const handleContinueBtn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(1);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-7 text-left px-6">
      <p className="text-base text-balance">
        Welcome!
        <br />
        To our base frontend code for our 10Pearls Device Tracking System.
      </p>
      <Input type="email" label="Email" placeholder="Email placeholder" />
      <Button
        color="primary"
        variant="shadow"
        onClick={() => handleContinueBtn()}
      >
        DEMO
      </Button>
    </div>
  );
};

NewUserForm.propTypes = {
  setStep: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default NewUserForm;
