import NewUserForm from "./NewUserForm";
import UserManagement from "./Users/UserManagement";

import { useState } from "react";

const Home = ({ setGlobalLoading: setIsLoading }) => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return <UserManagement setStep={setStep} setIsLoading={setIsLoading} />;
  }

  return <NewUserForm setStep={setStep} setIsLoading={setIsLoading} />;
};

export default Home;
