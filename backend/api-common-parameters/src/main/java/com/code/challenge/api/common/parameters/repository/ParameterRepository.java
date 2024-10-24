package com.code.challenge.api.common.parameters.repository;

import com.code.challenge.api.common.parameters.modal.Parameter;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface ParameterRepository  extends ReactiveMongoRepository<Parameter, String> {
}
