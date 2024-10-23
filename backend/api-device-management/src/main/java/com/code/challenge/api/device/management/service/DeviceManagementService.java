package com.code.challenge.api.device.management.service;

import com.code.challenge.api.device.management.exception.BusinessException;
import com.code.challenge.api.device.management.model.Device;
import com.code.challenge.api.device.management.model.FilterDevice;
import com.code.challenge.api.device.management.model.Maintenance;
import com.code.challenge.api.device.management.model.request.DeviceRequest;
import com.code.challenge.api.device.management.model.request.MaintenanceRequest;
import com.code.challenge.api.device.management.model.response.ApiResponse;
import com.code.challenge.api.device.management.repository.DeviceCustomRepository;
import com.code.challenge.api.device.management.repository.DeviceManagementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.UUID;

@Service
public class DeviceManagementService {

    private final DeviceManagementRepository repository;
    private final DeviceCustomRepository deviceCustomRepository;

    public DeviceManagementService(DeviceManagementRepository repository, DeviceCustomRepository deviceCustomRepository) {
        this.repository = repository;
        this.deviceCustomRepository = deviceCustomRepository;
    }

    public Mono<?> saveDevice(DeviceRequest request) {
        return repository.findBySerialNumber(request.getSerialNumber())
                .flatMap(existingDevice -> Mono.error(new BusinessException("El serial number ya existe.")))
                .switchIfEmpty(Mono.defer(() -> {
                    Device deviceSave = Device.builder()
                            .id(UUID.randomUUID())
                            .serialNumber(request.getSerialNumber())
                            .brand(request.getBrand())
                            .model(request.getModel())
                            .hardDrive(request.getHardDrive())
                            .ram(request.getRam())
                            .gpu(request.getGpu())
                            .cpu(request.getCpu())
                            .notes(request.getNotes())
                            .addedAt(new Date())
                            .condition(request.getCondition())
                            .build();

                    return repository.save(deviceSave)
                            .map(savedDevice -> new ApiResponse<>(HttpStatus.CREATED.name(), "Dispositivo creado correctamente.", savedDevice, null));
                }));
    }


    public Mono<?> updateDevice(String id, DeviceRequest request) {
        return repository.findById(UUID.fromString(id))
                .flatMap(existingDevice -> {
                    existingDevice.setId(UUID.fromString(id));
                    existingDevice.setSerialNumber(request.getSerialNumber());
                    existingDevice.setBrand(request.getBrand());
                    existingDevice.setModel(request.getModel());
                    existingDevice.setHardDrive(request.getHardDrive());
                    existingDevice.setRam(request.getRam());
                    existingDevice.setGpu(request.getGpu());
                    existingDevice.setCpu(request.getCpu());
                    existingDevice.setNotes(request.getNotes());
                    existingDevice.setCondition(request.getCondition());

                    // Guarda los cambios en la base de datos y devuelve ApiResponse
                    return repository.save(existingDevice)
                            .map(updatedDevice -> new ApiResponse<>("success", "Dispositivo actualizado correctamente.", updatedDevice, null));
                })
                .switchIfEmpty(Mono.just(new ApiResponse<>("error", "Dispositivo no encontrado.", null, null))); // Devuelve error si no se encuentra
    }


    public Flux<Device> listAll(){
        return repository.findAll();
    }

    public Mono<?> addMaintenanceRecord(String deviceId, MaintenanceRequest request) {

        Maintenance maintenance = Maintenance.builder()
                .supportUser(request.getSupportUser())
                .device(request.getDevice())
                .date(request.getDate())
                .id(UUID.randomUUID())
                .notes(request.getNotes())
                .currentCondition(request.getCurrentCondition())
                .build();

        return deviceCustomRepository.addMaintenance(UUID.fromString(deviceId), maintenance);
    }

    public Flux<Device> listByFilter(FilterDevice filters){
        return deviceCustomRepository.findByFilter(filters);
    }
}
