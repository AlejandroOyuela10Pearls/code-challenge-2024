package com.code.challenge.api.device.management.controller;

import com.code.challenge.api.device.management.model.FilterDevice;
import com.code.challenge.api.device.management.model.request.DeviceRequest;
import com.code.challenge.api.device.management.model.request.MaintenanceRequest;
import com.code.challenge.api.device.management.service.DeviceManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class DeviceManagementCotroller {

    private final DeviceManagementService service;

    public DeviceManagementCotroller(DeviceManagementService service) {
        this.service = service;
    }

    @GetMapping("/get")
    public Mono<?> getDevice(@RequestParam("id") String id) {
        return service.getDevice(id);
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

    @GetMapping("/listBy")
    public Flux<?> listByFilters(
        @RequestParam(value = "serialNumber", required = false) String serialNumber,
        @RequestParam(value = "brand", required = false) String brand,
        @RequestParam(value = "model", required = false) String model,
        @RequestParam(value = "searchText", required = false) String searchText) {

        System.out.println("Received searchText: " + searchText);  // Add logging here
        System.out.println("Received brand: " + brand);            // Add logging here
        System.out.println("Received model: " + model);            // Add logging here

        FilterDevice filterDevice = FilterDevice.builder()
                .serialNumber(serialNumber != null ? serialNumber : "")
                .brand(brand != null ? brand : "")
                .model(model != null ? model : "")
                .searchText(searchText != null ? searchText : "")
                .build();

        return service.listByFilter(filterDevice);
    }

    @PutMapping("/delete")
    public Mono<?> deleteDevice( @RequestParam("id") String id) {
        return service.deleteDevice(id);
    }
}
