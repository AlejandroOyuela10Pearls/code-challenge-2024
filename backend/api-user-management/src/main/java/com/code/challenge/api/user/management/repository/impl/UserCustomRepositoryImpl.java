package com.code.challenge.api.user.management.repository.impl;

import com.code.challenge.api.user.management.model.Device;
import com.code.challenge.api.user.management.model.User;
import com.code.challenge.api.user.management.repository.UserCustomRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public class UserCustomRepositoryImpl implements UserCustomRepository {

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<User> assignDevice(Device device, UUID  userId) {
        Query query = new Query(Criteria.where("id").is(userId));
        Update updateWithPush = new Update().push("devices", device);
        return mongoTemplate.findAndModify(query, updateWithPush, FindAndModifyOptions.options().returnNew(true), User.class)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    @Override
    public Mono<User> unpairDevice
            (UUID userId, String idDevice) {
        Query query = new Query(Criteria.where("id").is(userId));
        Update updateWithPull = new Update().pull("devices", new Document("idDevice", idDevice));

        return mongoTemplate.findAndModify(query, updateWithPull, FindAndModifyOptions.options().returnNew(true), User.class)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

}
