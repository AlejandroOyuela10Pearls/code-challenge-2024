package com.code.challenge.api.device.management.service;

import com.code.challenge.api.device.management.model.AssignedDevice;
import com.code.challenge.api.device.management.model.Assignment;
import com.code.challenge.api.device.management.model.User;
import com.code.challenge.api.device.management.model.request.AssignmentRequest;
import com.code.challenge.api.device.management.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class AssignmentService {

    private final  AssignmentRepository repository;

    public AssignmentService(AssignmentRepository repository) {
        this.repository = repository;
    }

    public Mono<?> assignmentDevice(AssignmentRequest request){
        Assignment assignment = Assignment.builder()
                .id(UUID.randomUUID())
                .date(request.getDate())
                .device(AssignedDevice.builder().idDevice(request.getDeviceId()).serial(request.getDeviceSerial()).build())
                .assignedUser(User.builder().idUser(request.getAssignedUserId()).nameUser(request.getAssignedUserName()).build())
                .supportUser(User.builder().idUser(request.getSupportUserId()).nameUser(request.getSupportUserName()).build())
                .reason(request.getReason())
                .notes(request.getNotes())
                .endDate(request.getEndDate())
                .build();

        return repository.save(assignment);
    }

    public Flux<?> listAllAssignments(){
        return repository.findAll();
    }
}