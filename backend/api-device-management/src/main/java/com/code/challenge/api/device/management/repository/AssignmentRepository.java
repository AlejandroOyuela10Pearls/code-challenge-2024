package com.code.challenge.api.device.management.repository;

import com.code.challenge.api.device.management.model.Assignment;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public interface AssignmentRepository extends ReactiveMongoRepository<Assignment, UUID> {
}
