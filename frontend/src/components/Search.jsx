import { useState } from "react";
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
    brand: "All Brands",
    model: "All Models",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(new Set(["All Brands"]));
  const [selectedModel, setSelectedModel] = useState(new Set(["All Models"]));

  const selectedBrandValue = Array.from(selectedBrand).join(", ");
  const selectedModelValue = Array.from(selectedModel).join(", ");

  const brandFuse = new Fuse(
    brandList.map((x) => x.key),
    fuseOptions
  );
  const modelFuse = new Fuse(models, fuseOptions);

  const getCorrectedValue = (value, fuseInstance, defaultValue) => {
    if (value && value !== defaultValue) {
      const result = fuseInstance.search(value);
      return result.length > 0 ? result[0].item : value;
    }
    return value;
  };

  const handleSearch = async () => {
    const correctedBrand = getCorrectedValue(
      selectedBrandValue,
      brandFuse,
      "All Brands"
    );
    const correctedModel = getCorrectedValue(
      selectedModelValue,
      modelFuse,
      "All Models"
    );

    const shouldUseSearchTextOnly =
      searchParams.searchText && searchParams.searchText.trim() !== "";

    const brandToSend = shouldUseSearchTextOnly
      ? ""
      : correctedBrand !== "All Brands"
      ? correctedBrand
      : "";
    const modelToSend = shouldUseSearchTextOnly
      ? ""
      : correctedModel !== "All Models"
      ? correctedModel
      : "";

    // Debugging logs for the search parameters
    console.log("Search Text:", searchParams.searchText);
    console.log("Brand Filter:", brandToSend);
    console.log("Model Filter:", modelToSend);

    try {
      const results = await listByFilters(
        searchParams.searchText || "", // This is where the search text is sent
        brandToSend, // This is where the brand is sent
        modelToSend // This is where the model is sent
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
              <DropdownItem key="All Brands">All Brands</DropdownItem>
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
              <DropdownItem key="All Models">All Models</DropdownItem>
              {models.map((model) => (
                <DropdownItem key={model}>{model}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Spacer y={1} />
        <Button onPress={handleSearch} color="primary">
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
