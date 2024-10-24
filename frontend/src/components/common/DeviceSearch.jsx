import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { listByFilters } from "../../services/devices";
import { brandList } from "../../utils/DeviceParams";
import { NoResultsIcon } from "./customIcons/NoResultsIcon";

import Icon from "./Icon";
import Fuse from "fuse.js";
import DevicesList from "../devices/DevicesList";

const models = [
  "G15",
  "Macbook Pro",
  "HP132",
  "M2",
  "Legion 7",
  "XPS 15",
  "Rog",
  "m18",
];

const fuseOptions = {
  includeScore: true,
  threshold: 0.3,
};

const DeviceSearch = ({ setGlobalLoading, className, actionOnDevice }) => {
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    brand: "None",
    model: "None",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(new Set(["None"]));
  const [selectedModel, setSelectedModel] = useState(new Set(["None"]));
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

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
    // Correct only the searchText using Fuse.js
    const correctedSearchText = getCorrectedValue(
      searchParams.searchText,
      searchTextFuse
    );

    // Send the selected brand and model filters along with the search text
    const brandToSend = selectedBrandValue !== "None" ? selectedBrandValue : "";
    const modelToSend = selectedModelValue !== "None" ? selectedModelValue : "";

    // Debugging logs for the search parameters
    console.log("Corrected Search Text:", correctedSearchText);
    console.log("Brand Filter:", brandToSend);
    console.log("Model Filter:", modelToSend);

    try {
      const results = await listByFilters(
        correctedSearchText || "", // Search across all fields
        brandToSend, // Apply brand filter if selected
        modelToSend // Apply model filter if selected
      );

      // Now, merge the search text and brand filter results
      if (results && results.length > 0) {
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

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
        <DevicesList devices={searchResults} reactiveAction={actionOnDevice} />
      )}

      {searchResults.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 text-primary p-[30px]">
            <NoResultsIcon className="w-[50px]" color="#56727C" />
            <p>No devices found matching the search criteria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceSearch;
