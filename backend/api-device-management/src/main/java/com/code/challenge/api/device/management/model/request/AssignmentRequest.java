package com.code.challenge.api.device.management.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AssignmentRequest {
    private Date date;                   // Fecha de la asignación
    private String deviceId;               // Dispositivo asignado a un usuario
    private String deviceSerial;
    private String supportUserId;          // Usuario de soporte responsable de la asignación
    private String supportUserName;
    private String assignedUserId;         // Usuario al que se le asigna el dispositivo
    private String assignedUserName;
    private String reason;               // Motivo de la asignación
    private String notes;                // Comentarios adicionales sobre la asignación
    private Date endDate;                // Fecha de finalización de la asignación (si aplica)
}
