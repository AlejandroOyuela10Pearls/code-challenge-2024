import { useState } from "react"; 
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spacer, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { listByFilters } from "../services/devices"; 
import Icon from "./common/Icon"; 
import Fuse from "fuse.js";

const brands = ["Apple", "Dell", "HP", "Mac", "Lenovo", "Asus", "Alienware"];
const models = ["G15", "Macbook Pro", "HP132", "M2", "Legion 7", "XPS 15", "Rog", "m18"];
const users = ["Standard User", "Support User", "Admin User"];

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

  const brandFuse = new Fuse(brands, fuseOptions);
  const modelFuse = new Fuse(models, fuseOptions);
  const userFuse = new Fuse(users, fuseOptions);

  const getCorrectedValue = (value, fuseInstance, defaultValue) => {
    if (value && value !== defaultValue) {
      const result = fuseInstance.search(value);
      return result.length > 0 ? result[0].item : value;
    }
    return value;
  };

  const handleSearch = async () => {
    const correctedBrand = getCorrectedValue(selectedBrandValue, brandFuse, "All Brands");
    const correctedModel = getCorrectedValue(selectedModelValue, modelFuse, "All Models");

    const shouldUseSearchTextOnly = searchParams.searchText && searchParams.searchText.trim() !== "";

    const brandToSend = shouldUseSearchTextOnly ? "" : correctedBrand !== "All Brands" ? correctedBrand : "";
    const modelToSend = shouldUseSearchTextOnly ? "" : correctedModel !== "All Models" ? correctedModel : "";

    // Debugging logs for the search parameters
    console.log("Search Text:", searchParams.searchText);
    console.log("Brand Filter:", brandToSend);
    console.log("Model Filter:", modelToSend);

    try {
      const results = await listByFilters(
        searchParams.searchText || "",  // This is where the search text is sent
        brandToSend,                   // This is where the brand is sent
        modelToSend                    // This is where the model is sent
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
        onChange={(e) => setSearchParams({ ...searchParams, searchText: e.target.value })}
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
            {brands.map((brand) => (
              <DropdownItem key={brand}>{brand}</DropdownItem>
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
      <div>
        <Table aria-label="Search Results" css={{ minWidth: "100%" }}>
          <TableHeader>
            <TableColumn>Serial Number</TableColumn>
            <TableColumn>Brand</TableColumn>
            <TableColumn>Model</TableColumn>
            <TableColumn>Condition</TableColumn>
            <TableColumn>RAM</TableColumn>
            <TableColumn>CPU</TableColumn>
            <TableColumn>GPU</TableColumn>
          </TableHeader>
          <TableBody>
            {searchResults.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.serialNumber || "N/A"}</TableCell>
                <TableCell>{device.brand}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{device.condition}</TableCell>
                <TableCell>{device.ram}</TableCell>
                <TableCell>{device.cpu}</TableCell>
                <TableCell>{device.gpu}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )}
  
    {searchResults.length === 0 && (
      <p>No devices found matching the search criteria.</p>
    )}
  </div>
  
  );
};

export default SearchComponent;
