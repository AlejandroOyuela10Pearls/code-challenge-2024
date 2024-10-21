package com.code.challenge.api.device.management.controller;

import com.code.challenge.api.device.management.model.request.DeviceRequest;
import com.code.challenge.api.device.management.service.DeviceManagementService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1")
public class DeviceManagementCotroller {

    private final DeviceManagementService service;

    public DeviceManagementCotroller(DeviceManagementService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public Mono<Object> createDevice(@RequestBody DeviceRequest request) {
        return service.saveDevice(request);
    }

    @GetMapping("/listAll")
    public Flux<?> listAll(){
        return service.listAll();
    }

    @PostMapping("/update")
    public Mono<?> editDevice( @RequestParam("id") String id,
                               @RequestBody DeviceRequest request) {
        return service.updateDevice(id, request);
    }
}
