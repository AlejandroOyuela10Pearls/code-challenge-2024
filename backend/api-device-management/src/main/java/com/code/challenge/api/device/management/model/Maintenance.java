package com.code.challenge.api.device.management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)

public class Maintenance {
    private UUID id;
    private LocalDate date;
    private String supportUser;
    private String device;
    private String notes;
    private String currentCondition;
}
