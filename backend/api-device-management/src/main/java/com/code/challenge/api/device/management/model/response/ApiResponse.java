package com.code.challenge.api.device.management.model.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private String status;          // Estado de la respuesta (ej. "success", "error")
    private String message;         // Mensaje adicional
    private T result;               // Resultado de la operación (puede ser null si hay error)
    private List<String> listError; // Lista de errores (puede ser vacía si no hay errores)
}