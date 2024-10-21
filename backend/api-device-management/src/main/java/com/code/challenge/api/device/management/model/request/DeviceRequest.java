package com.code.challenge.api.device.management.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceRequest {
    private String serialNumber;
    private String brand;
    private String model;
    private String hardDrive;
    private String ram;
    private String gpu;
    private String cpu;
    private String notes;
  //  private Date addedAt;
    private String condition;
}
