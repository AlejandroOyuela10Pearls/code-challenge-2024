package com.code.challenge.api.device.management.repository.impl;

import com.code.challenge.api.device.management.model.Device;
import com.code.challenge.api.device.management.model.FilterDevice;
import com.code.challenge.api.device.management.model.Maintenance;
import com.code.challenge.api.device.management.repository.DeviceCustomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
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

 @Override
public Flux<Device> findByFilter(FilterDevice filterDevice) {
    try {
        System.out.println("FilterDevice: " + filterDevice);
        Query query = new Query();
        Criteria orCriteria = new Criteria();
        List<Criteria> orExpression =  new ArrayList<>();

        if (filterDevice.getSerialNumber() != null && !filterDevice.getSerialNumber().isEmpty()) {
            orExpression.add(Criteria.where("serialNumber").is(filterDevice.getSerialNumber()));
        }

        if (filterDevice.getBrand() != null && !filterDevice.getBrand().isEmpty()) {
            orExpression.add(Criteria.where("brand").is(filterDevice.getBrand()));
        }

        if (filterDevice.getModel() != null && !filterDevice.getModel().isEmpty()) {
            orExpression.add(Criteria.where("model").is(filterDevice.getModel()));
        }

        if (filterDevice.getSearchText() != null && !filterDevice.getSearchText().isEmpty()) {
            String searchText = filterDevice.getSearchText().toLowerCase();
            orExpression.add(Criteria.where("serialNumber").regex(searchText, "i"));
            orExpression.add(Criteria.where("brand").regex(searchText, "i"));
            orExpression.add(Criteria.where("model").regex(searchText, "i"));
            orExpression.add(Criteria.where("cpu").regex(searchText, "i"));
            orExpression.add(Criteria.where("gpu").regex(searchText, "i"));
            orExpression.add(Criteria.where("ram").regex(searchText, "i"));
            orExpression.add(Criteria.where("hardDrive").regex(searchText, "i"));
            orExpression.add(Criteria.where("condition").regex(searchText, "i"));
        }

        query.addCriteria(orCriteria.orOperator(orExpression.toArray(new Criteria[orExpression.size()])));
        return mongoTemplate.find(query, Device.class);
    } catch (Exception e) {
        System.err.println("Error executing findByFilter: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException("Error interno del servidor.");
    }
}
}
