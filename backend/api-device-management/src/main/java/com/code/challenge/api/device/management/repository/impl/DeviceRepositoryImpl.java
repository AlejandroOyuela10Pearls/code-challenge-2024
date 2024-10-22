package com.code.challenge.api.device.management.repository.impl;

import com.code.challenge.api.device.management.model.Device;
import com.code.challenge.api.device.management.model.Maintenance;
import com.code.challenge.api.device.management.repository.DeviceCustomRepository;
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
public class DeviceRepositoryImpl implements DeviceCustomRepository {

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<Device> addMaintenance(UUID deviceId, Maintenance maintenance) {
        Query query = new Query(Criteria.where("id").is(deviceId));

        Update updateWithPush = new Update().push("maintenances", maintenance);

        return mongoTemplate.findAndModify(query, updateWithPush, FindAndModifyOptions.options().returnNew(true), Device.class)
                .switchIfEmpty(Mono.error(new RuntimeException("Device not found")));
    }

}
