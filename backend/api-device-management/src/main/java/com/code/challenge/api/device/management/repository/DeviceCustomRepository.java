package com.code.challenge.api.device.management.repository;

import com.code.challenge.api.device.management.model.Device;
import com.code.challenge.api.device.management.model.Maintenance;
import reactor.core.publisher.Mono;

import java.util.UUID;


public interface DeviceCustomRepository {
    Mono<Device> addMaintenance(UUID deviceId, Maintenance maintenance);
}
