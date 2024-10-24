package com.code.challenge.api.device.management.repository.impl;

import com.code.challenge.api.device.management.model.Assignment;
import com.code.challenge.api.device.management.repository.AssignmentCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.UUID;

@Repository
public class AssignmentRepositoryImpl implements AssignmentCustomRepository {

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<Assignment> updateAssignment(UUID id) {
        Query query = new Query(Criteria.where("id").is(id));
        Update update = new Update().set("endDate", new Date());

        return mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), Assignment.class)
                .switchIfEmpty(Mono.error(new RuntimeException("Assignment not found")));
    }

}
