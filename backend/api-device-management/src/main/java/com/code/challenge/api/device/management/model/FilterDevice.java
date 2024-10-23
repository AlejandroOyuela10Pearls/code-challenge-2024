package com.code.challenge.api.device.management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FilterDevice {
    private String serialNumber;     // Manufacturer’s unique identifier for the device
    private String brand;            // Device manufacturer (e.g., Dell, Apple)
    private String model;            // Device model name or number
    private String searchText;       // General search term for multiple fields
}
