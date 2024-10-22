import React, { useState } from "react";
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spacer } from "@nextui-org/react";
import axios from "axios";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useState({
    serialNumber: "",
    brand: "",
    model: "",
    user: ""
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_APP_DEVICE_API_URL}/listAll`, {
        params: {
          serialNumber: searchParams.serialNumber,
          brand: searchParams.brand,
          model: searchParams.model,
          user: searchParams.user
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
          name="serialNumber"
          value={searchParams.serialNumber}
          onChange={handleInputChange}
          label="Serial Number"
          clearable
          placeholder="Search by Serial Number"
        />
        <Spacer y={0.5} />
        <Input
          name="brand"
          value={searchParams.brand}
          onChange={handleInputChange}
          label="Brand"
          clearable
          placeholder="Search by Brand"
        />
        <Spacer y={0.5} />
        <Input
          name="model"
          value={searchParams.model}
          onChange={handleInputChange}
          label="Model"
          clearable
          placeholder="Search by Model"
        />
        <Spacer y={0.5} />
        <Input
          name="user"
          value={searchParams.user}
          onChange={handleInputChange}
          label="User"
          clearable
          placeholder="Search by User"
        />
        <Spacer y={1} />
        <Button onPress={handleSearch} color="primary">
          Search
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
