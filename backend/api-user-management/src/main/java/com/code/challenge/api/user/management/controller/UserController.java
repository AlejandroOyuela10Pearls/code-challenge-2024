package com.code.challenge.api.user.management.controller;

import com.code.challenge.api.user.management.model.User;
import com.code.challenge.api.user.management.model.request.UserRequest;
import com.code.challenge.api.user.management.service.UserService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public Mono<?> createDevice(@RequestBody UserRequest request) {
        return service.saveUser(request);
    }

    @GetMapping("/listUsers")
    public Mono<?> listAll(){
        return service.listUsers();
    }

    @PutMapping("/update")
    public Mono<?> updateUser(
            @RequestParam("id") String id,
            @RequestBody UserRequest request) {
        return service.updateUser(id, request);

    }

    @PutMapping("/update-status")
    public Mono<?> updateUserActiveStatus(
            @RequestParam("id") String id,
            @RequestParam("isActive") boolean isActive) {
        return service.updateUserActiveStatus(UUID.fromString(id), isActive);

    }

    @PutMapping("/assignDevice")
    public Mono<?> userAssignDevice(
            @RequestParam("id") String idUser,
            @RequestParam("idDevice") String idDevice,
            @RequestParam("serial") String serial) {
        return service.userAssignDevice(idUser,idDevice,serial);

    }

    @PutMapping("/unpairDevice")
    public Mono<?> unpairDevice(
            @RequestParam("idUser") String idUser,
            @RequestParam("idDevice") String idDevice ){
        return service.unpairDevice(idUser,idDevice);

    }



}
