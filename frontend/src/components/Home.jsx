import Header from "./common/Header";
import NewUserForm from "./NewUserForm";
import Question from "./Question";
import Dashboard from "./Dashboard";
import PageLoading from "./common/PageLoading";
import UserManagement from "./UserManagement";

import { useState } from "react";
import { User } from "@nextui-org/react";

const Home = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div className="flex justify-center h-[100vh] items-center">
      <PageLoading fixed />
    </div>
  ) : (
    <div className="flex flex-col gap-3 items-center h-[100vh] p-[1rem]">
      <Header />
      {step === 0 && (
        <UserManagement setStep={setStep} setIsLoading={setIsLoading} />
      )}
      {step === 1 && (
        <NewUserForm setStep={setStep} setIsLoading={setIsLoading} />
      )}
      {step === 2 && <Question setStep={setStep} setIsLoading={setIsLoading} />}
    </div>
  );
};

export default Home;
