package com.code.challenge.api.device.management.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document
public class Assignment {
    @Id
    private UUID id;
    private Date date;                   // Fecha de la asignación
    private AssignedDevice device;               // Dispositivo asignado a un usuario
    private User supportUser;          // Usuario de soporte responsable de la asignación
    private User assignedUser;         // Usuario al que se le asigna el dispositivo
    private String reason;               // Motivo de la asignación
    private String notes;                // Comentarios adicionales sobre la asignación
    private Date endDate;                // Fecha de finalización de la asignación (si aplica)
}
