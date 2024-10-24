package com.code.challenge.api.common.parameters.service;

import com.code.challenge.api.common.parameters.repository.ParameterRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ParameterService {

    private final ParameterRepository repository;

    public ParameterService(ParameterRepository repository) {
        this.repository = repository;
    }

    public Flux<?> getAllParameters(){
        return repository.findAll();
    }
}
