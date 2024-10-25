package com.code.challenge.api.device.management.repository;


import com.code.challenge.api.device.management.model.Assignment;
import com.code.challenge.api.device.management.model.request.AssignmentRequest;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.UUID;

public interface AssignmentCustomRepository {

    Mono<Assignment> updateAssignment(UUID id, AssignmentRequest request);

    Flux<Assignment> findByIdDevice(String idDevice);

    Flux<Assignment> findAssignmentsOutsideDateRange(Date fecha, String idDevice);
}
