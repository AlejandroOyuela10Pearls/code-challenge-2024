package com.code.challenge.api.common.parameters.controller;

import com.code.challenge.api.common.parameters.service.ParameterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/v1")
public class ParameterController {

    private final ParameterService service;

    public ParameterController(ParameterService service) {
        this.service = service;
    }

    @GetMapping("/listParameters")
    public Flux<?> listAllAssignments(){
        return service.getAllParameters();
    }

}
