package com.code.challenge.api.user.management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document
public class User {

    @Id
    private UUID id;            // Unique identifier for the user
    private String name;        // User’s full name
    private String email;       // User’s email address
    private String role;        // User’s role in the system
    private boolean active;     // Boolean flag indicating if the user is currently active
    private List<Device> devices;
}
