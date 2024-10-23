package com.code.challenge.api.device.management.repository;

import com.code.challenge.api.device.management.model.Device;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
public interface DeviceManagementRepository extends ReactiveMongoRepository<Device, UUID> {

    Mono<Device> findBySerialNumber(String serialNumber);

}
