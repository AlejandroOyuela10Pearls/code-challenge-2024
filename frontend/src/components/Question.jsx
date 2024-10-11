import PropTypes from "prop-types";

import { Button } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useEffect } from "react";

const Question = ({ setStep, setIsLoading }) => {
  const handleContinueBtn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(0);
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-full w-full text-left px-6 gap-7">
      <Textarea
        isReadOnly
        size="lg"
        label="Test Question #"
        placeholder="Question description"
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo vehicula dictum. Nunc dignissim orci a tellus dignissim, at egestas sapien ultricies. Sed efficitur ullamcorper massa, ac iaculis turpis viverra et. Nam dictum ex vel lobortis pretium. Sed gravida molestie aliquet. Mauris eget sem turpis. Fusce ex lectus, ornare vel eros sit amet, eleifend iaculis lorem. Quisque faucibus suscipit purus, in porttitor nibh ullamcorper ut. Ut sagittis tellus vitae nibh interdum condimentum."
      />
      <RadioGroup label="Select your favorite city">
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="san-francisco">San Francisco</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <Button
        color="primary"
        variant="shadow"
        onClick={() => handleContinueBtn()}
      >
        NEXT
      </Button>
    </div>
  );
};

Question.propTypes = {
  setStep: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default Question;
