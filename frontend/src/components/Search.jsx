import { useState } from "react"; 
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spacer, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import axios from "axios";
import Icon from "./common/Icon"; 

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    brand: "All Brands",
    model: "All Models",
    user: "All Users",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(new Set(["All Brands"]));
  const [selectedModel, setSelectedModel] = useState(new Set(["All Models"]));
  const [selectedUser, setSelectedUser] = useState(new Set(["All Users"]));

  const selectedBrandValue = Array.from(selectedBrand).join(", ");
  const selectedModelValue = Array.from(selectedModel).join(", ");
  const selectedUserValue = Array.from(selectedUser).join(", ");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_APP_DEVICE_API_URL}/listAll`, {
        params: {
          searchText: searchParams.searchText,
          brand: selectedBrandValue !== "All Brands" ? selectedBrandValue : "",
          model: selectedModelValue !== "All Models" ? selectedModelValue : "",
          user: selectedUserValue !== "All Users" ? selectedUserValue : "",
        }
      });
  
      setSearchResults(response.data);
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
          placeholder="Search by Serial Number, Brand, or User..."
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
              <DropdownItem key="Apple">Apple</DropdownItem>
              <DropdownItem key="Dell">Dell</DropdownItem>
              <DropdownItem key="HP">HP</DropdownItem>
              <DropdownItem key="Mac">Mac</DropdownItem>
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
              <DropdownItem key="G15">G15</DropdownItem>
              <DropdownItem key="Mackbook Pro">Macbook Pro</DropdownItem>
              <DropdownItem key="HP132">HP132</DropdownItem>
              <DropdownItem key="M2">M2</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedUserValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Role Selection"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedUser}
              onSelectionChange={setSelectedUser}
            >
              <DropdownItem key="All Users">All Users</DropdownItem>
              <DropdownItem key="Standard User">Standard User</DropdownItem>
              <DropdownItem key="Support User">Support User</DropdownItem>
              <DropdownItem key="Admin User">Admin User</DropdownItem>
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
              <TableColumn>Device</TableColumn>
              <TableColumn>Brand</TableColumn>
              <TableColumn>Model</TableColumn>
              <TableColumn>Current User</TableColumn>
            </TableHeader>
            <TableBody>
              {searchResults.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name || device.id}</TableCell>
                  <TableCell>{device.brand}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{device.currentUser}</TableCell>
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
