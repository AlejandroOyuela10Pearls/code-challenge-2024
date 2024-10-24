import DeviceSearch from "../common/DeviceSearch";

import { Card, CardBody } from "@nextui-org/react";

const SearchIndex = ({ setGlobalLoading }) => {
  return (
    <div className="w-full p-[20px] h-full">
      <Card className="w-full h-full">
        <CardBody className="flex w-full h-full">
          <DeviceSearch
            setGlobalLoading={setGlobalLoading}
            className="p-[0px] pb-[10px]"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchIndex;
