import { useState, useEffect, useCallback } from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Spacer,
  Pagination,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { listByFilters } from "../../services/devices";
import { brandList } from "../../utils/DeviceParams";
import { NoResultsIcon } from "./customIcons/NoResultsIcon";
import Icon from "./Icon";
import Fuse from "fuse.js";
import DeviceCondition from "../devices/DeviceCondition";
import DeviceBrandImg from "../devices/DeviceBrandImg";

const models = [
  "Omen",
  "Legion 7",
  "Blade",
  "MateBook E",
  "XPS 15",
  "Rog",
  "m18",
];

const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
};

const columns = [
  { name: "BRAND & MODEL", uid: "brandModel" },
  { name: "SERIAL NUMBER", uid: "serialNumber" },
  { name: "CONDITION", uid: "condition" },
  { name: "DEVICE ID", uid: "deviceId" },
];

const DeviceSearch = ({ setGlobalLoading, className }) => {
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    brand: "None",
    model: "None",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(new Set(["None"]));
  const [selectedModel, setSelectedModel] = useState(new Set(["None"]));
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const selectedBrandValue = Array.from(selectedBrand).join(", ");
  const selectedModelValue = Array.from(selectedModel).join(", ");

  const searchTextFuse = new Fuse(
    [...brandList.map((x) => x.key), ...models],
    fuseOptions
  );

  const getCorrectedValue = (value, fuseInstance) => {
    if (value && value.trim() !== "") {
      const result = fuseInstance.search(value);
      return result.length > 0 ? result[0].item : value;
    }
    return value;
  };

  const handleSearch = async () => {
    const correctedSearchText = getCorrectedValue(
      searchParams.searchText,
      searchTextFuse
    );

    const brandToSend = selectedBrandValue !== "None" ? selectedBrandValue : "";
    const modelToSend = selectedModelValue !== "None" ? selectedModelValue : "";

    try {
      const results = await listByFilters(
        correctedSearchText || "",
        brandToSend,
        modelToSend
      );

      if (results && results.length > 0) {
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const paginatedDevices = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCell = useCallback(
    (device, columnKey) => {
      switch (columnKey) {
        case "brandModel":
          return (
            <DeviceBrandImg
              device={device}
              description={device.model}
              name={device.brand}
              model={device.model}
            />
          );
        case "serialNumber":
          return <p className="text-bold text-sm">{device.serialNumber}</p>;
        case "condition":
          return <DeviceCondition device={device} />;
        case "deviceId":
          return (
            <Tooltip content={device.id}>
              <p className="text-gray-500 text-sm">
                {device.id > 10 ? `${device.id.slice(0, 10)}...` : device.id}
              </p>
            </Tooltip>
          );
        default:
          return device[columnKey];
      }
    },
    []
  );

  useEffect(() => {
    const isSearchTextValid = searchParams.searchText.trim() !== "";
    const isBrandSelected = selectedBrandValue !== "None";
    const isModelSelected = selectedModelValue !== "None";

    setIsSearchDisabled(
      !isSearchTextValid && !isBrandSelected && !isModelSelected
    );
  }, [searchParams.searchText, selectedBrandValue, selectedModelValue]);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className={`flex flex-col p-[20px] gap-[10px] border-b-[1px] mb-[10px] ${className}`}
      >
        <Input
          name="searchText"
          value={searchParams.searchText}
          onChange={(e) =>
            setSearchParams({ ...searchParams, searchText: e.target.value })
          }
          label="Search"
          clearable
          placeholder="Search by Serial Number, Brand, or Model..."
          startContent={<Icon icon="fas fa-search" />}
        />
        <div className="flex justify-between gap-[20px]">
          <div className="flex flex-wrap gap-[20px] w-[50%]">
            <div className="flex gap-5 justify-center items-center w-[50%]">
              <p>Brand:</p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedBrandValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Brand Selection"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedBrand}
                  onSelectionChange={setSelectedBrand}
                >
                  <DropdownItem key="None">None</DropdownItem>
                  {brandList.map((brand) => (
                    <DropdownItem key={brand.key}>{brand.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="flex gap-5 justify-center items-center">
              <p>Model:</p>

              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedModelValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Model Selection"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedModel}
                  onSelectionChange={setSelectedModel}
                >
                  <DropdownItem key="None">None</DropdownItem>
                  {models.map((model) => (
                    <DropdownItem key={model}>{model}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Button
            className="w-[50%]"
            onPress={handleSearch}
            color="primary"
            isDisabled={isSearchDisabled}
          >
            <Icon icon="fas fa-search" /> Search
          </Button>
        </div>
      </div>

      {searchResults.length > 0 && (
     <Table aria-label="Devices List" css={{ width: "100%", textAlign: "center" }}>
     <TableHeader columns={columns}>
       {(column) => (
         <TableColumn
           key={column.uid}
           css={{ textAlign: "center", justifyContent: "center" }}
         >
           {column.name}
         </TableColumn>
       )}
     </TableHeader>
     <TableBody items={paginatedDevices}>
       {(device) => (
         <TableRow key={device.id}>
           {columns.map((column) => (
             <TableCell
               key={column.uid}
               css={{ textAlign: "center", justifyContent: "center" }}
             >
               {renderCell(device, column.uid)}
             </TableCell>
           ))}
         </TableRow>
       )}
     </TableBody>
   </Table>
   
      )}

      {searchResults.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 text-primary p-[30px]">
            <NoResultsIcon className="w-[50px]" color="#56727C" />
            <p>No devices found matching the search criteria.</p>
          </div>
        </div>
      )}

      <Spacer y={1} />
      {searchResults.length > 0 && (
        <Pagination
          total={Math.ceil(searchResults.length / itemsPerPage)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default DeviceSearch;
