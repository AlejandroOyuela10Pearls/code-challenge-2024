package com.code.challenge.api.user.management.service;

import com.code.challenge.api.user.management.exception.BusinessException;
import com.code.challenge.api.user.management.model.Device;
import com.code.challenge.api.user.management.model.User;
import com.code.challenge.api.user.management.model.request.UserRequest;
import com.code.challenge.api.user.management.model.response.ApiResponse;
import com.code.challenge.api.user.management.repository.UserCustomRepository;
import com.code.challenge.api.user.management.repository.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository repository;
    private final UserCustomRepository customRepository;

    public UserService(UserRepository repository, UserCustomRepository customRepository) {
        this.repository = repository;
        this.customRepository = customRepository;
    }

    public Mono<ApiResponse<User>> saveUser(UserRequest request) {
        User userSave = User.builder()
                .id(UUID.randomUUID())
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .active(request.isActive())
                .build();

        return repository.save(userSave)
                .map(savedUser -> new ApiResponse<>("success", "Usuario creado correctamente.", savedUser, null))
                .onErrorMap(e -> new BusinessException("Error al crear el usuario: " + e.getMessage()));
    }
    public Mono<?> listUsers() {
        return repository.findAll()
                .collectList()
                .map(users -> new ApiResponse<>("success", "Usuarios listados correctamente.", users, null))
                .defaultIfEmpty(new ApiResponse<>("error", "No se encontraron usuarios.", null, null));
    }

    public Mono<?> updateUser(String id, UserRequest request) {
        return repository.findById(UUID.fromString(id))
                .flatMap(existingUser -> {
                    existingUser.setName(request.getName());
                    existingUser.setEmail(request.getEmail());
                    existingUser.setRole(request.getRole());
                    existingUser.setActive(request.isActive());

                    // Guarda el usuario actualizado
                    return repository.save(existingUser)
                            .map(updatedUser -> new ApiResponse<>("success", "Usuario actualizado correctamente.", updatedUser, null));
                })
                .switchIfEmpty(Mono.error(new BusinessException("Usuario no encontrado.")));
    }

    public Mono<?> updateUserActiveStatus(UUID id, boolean isActive) {
        return repository.findById(id)
                .flatMap(existingUser -> {
                    existingUser.setActive(isActive);
                    return repository.save(existingUser)
                            .map(updatedUser -> new ApiResponse<>("success", "Estado de usuario actualizado correctamente.", updatedUser, null));
                })
                .switchIfEmpty(Mono.error(new BusinessException("Usuario no encontrado.")));
    }

    public Mono<?> userAssignDevice(String idUser, String idDevice, String serial){
        Device device = Device.builder()
                .idDevice(idDevice)
                .serial(serial)
                .build();
        return customRepository.assignDevice(device, UUID.fromString(idUser));
    }
}
