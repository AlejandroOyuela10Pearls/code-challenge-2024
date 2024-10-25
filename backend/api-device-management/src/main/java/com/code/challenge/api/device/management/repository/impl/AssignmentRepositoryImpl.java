package com.code.challenge.api.device.management.repository.impl;

import com.code.challenge.api.device.management.model.Assignment;
import com.code.challenge.api.device.management.model.request.AssignmentRequest;
import com.code.challenge.api.device.management.repository.AssignmentCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.UUID;

@Repository
public class AssignmentRepositoryImpl implements AssignmentCustomRepository {

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<Assignment> updateAssignment(UUID id, AssignmentRequest request) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = new Update().set("endDate", request.getEndDate());
        if (request.getDate() != null) {
            update.set("date", request.getDate());
        }
        if (request.getReason() != null) {
            update.set("reason", request.getReason());
        }
        if (request.getAssignedUserId() != null) {
            update.set("assignedUserId", request.getAssignedUserId());
        }
        if (request.getAssignedUserName() != null) {
            update.set("assignedUserName", request.getAssignedUserName());
        }
        if (request.getNotes() != null) {
            update.set("notes", request.getNotes());
        }

        return mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), Assignment.class)
                .switchIfEmpty(Mono.error(new RuntimeException("Assignment not found")));
    }

    @Override
    public Flux<Assignment> findByIdDevice(String idDevice) {
        Query query = new Query();
        query.addCriteria(Criteria.where("device.idDevice").is(idDevice));
        return mongoTemplate.find(query, Assignment.class);
    }

}
