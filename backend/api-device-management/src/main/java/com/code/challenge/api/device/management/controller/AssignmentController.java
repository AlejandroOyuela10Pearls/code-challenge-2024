package com.code.challenge.api.device.management.controller;

import com.code.challenge.api.device.management.model.request.AssignmentRequest;
import com.code.challenge.api.device.management.service.AssignmentService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1")
public class AssignmentController {

    private final AssignmentService service;

    public AssignmentController(AssignmentService service) {
        this.service = service;
    }

    @PostMapping("/assign")
    public Mono<?> createDevice(@RequestBody AssignmentRequest request) {
        return service.assignmentDevice(request);
    }

    @GetMapping("/listAssignments")
    public Flux<?> listAllAssignments(){
        return service.listAllAssignments();
    }
}
