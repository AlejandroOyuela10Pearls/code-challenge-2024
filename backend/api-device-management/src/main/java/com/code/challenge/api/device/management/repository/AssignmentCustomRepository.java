package com.code.challenge.api.device.management.repository;


import com.code.challenge.api.device.management.model.Assignment;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface AssignmentCustomRepository {

    Mono<Assignment> updateAssignment(UUID id);

    Flux<Assignment> findByIdDevice(String idDevice);

}
