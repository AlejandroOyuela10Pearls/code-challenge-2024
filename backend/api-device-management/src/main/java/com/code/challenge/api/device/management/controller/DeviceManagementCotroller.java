package com.code.challenge.api.device.management.controller;

import com.code.challenge.api.device.management.model.request.DeviceRequest;
import com.code.challenge.api.device.management.model.request.MaintenanceRequest;
import com.code.challenge.api.device.management.service.DeviceManagementService;
import org.springframework.http.ResponseEntity;
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
    public Mono<?> createDevice(@RequestBody DeviceRequest request) {
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


    @PostMapping("/maintenance")
    public Mono<?> addMaintenance
            (@RequestParam("id") String id, @RequestBody MaintenanceRequest maintenance) {
        return service.addMaintenanceRecord(id, maintenance)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

}
