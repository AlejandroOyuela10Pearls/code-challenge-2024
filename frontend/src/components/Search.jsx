import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Spacer,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { listByFilters } from "../services/devices";
import { brandList } from "../utils/DeviceParams";

import Icon from "./common/Icon";
import Fuse from "fuse.js";
import DevicesList from "./devices/DevicesList";

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

const SearchComponent = () => {
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
      correctedSearchText || "",  // Search across all fields
      brandToSend,                // Apply brand filter if selected
      modelToSend                 // Apply model filter if selected
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

    setIsSearchDisabled(!isSearchTextValid && !isBrandSelected && !isModelSelected);
  }, [searchParams.searchText, selectedBrandValue, selectedModelValue]);

  return (
    <div style={{ padding: "20px" }} className="w-full">
      <div style={{ marginBottom: "20px" }}>
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
        <Spacer y={1} />

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
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

        <Spacer y={1} />
        <Button onPress={handleSearch} color="primary" isDisabled={isSearchDisabled}>
          <Icon icon="fas fa-search" /> Search
        </Button>
      </div>

      {searchResults.length > 0 && (
        <DevicesList
          devices={searchResults}
          reactiveAction={() => console.log("test")}
        />
      )}

      {searchResults.length === 0 && (
        <p>No devices found matching the search criteria.</p>
      )}
    </div>
  );
};

export default SearchComponent;
