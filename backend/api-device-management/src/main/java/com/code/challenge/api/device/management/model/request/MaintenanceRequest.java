package com.code.challenge.api.device.management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MaintenanceRequest {
    private LocalDate date;
    private String supportUser;
    private String device;
    private String notes;
    private String currentCondition;
}
