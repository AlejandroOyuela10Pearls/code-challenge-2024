package com.code.challenge.api.device.management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.UUID;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document
public class Device {
    @Id
    private UUID id;               // Unique identifier for the device
    private String serialNumber;     // Manufacturer’s unique identifier for the device
    private String brand;            // Device manufacturer (e.g., Dell, Apple)
    private String model;            // Device model name or number
    private String hardDrive;        // Size and type of the device’s storage (e.g., 512 GB SSD)
    private String ram;              // Size of the device’s memory (e.g., 16 GB)
    private String gpu;              // Device's graphics processing unit details (if applicable)
    private String cpu;              // Device’s central processing unit details (e.g., Intel i7)
    private String notes;            // Additional information about the device
    private Date addedAt;            // Date the device was added to the system
    private String condition;         // Current condition of the device (e.g., new, used, under repair)
    private boolean status;
    private List<Maintenance> maintenances;
}
