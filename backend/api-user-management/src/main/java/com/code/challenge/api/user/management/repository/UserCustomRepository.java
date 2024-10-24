package com.code.challenge.api.user.management.repository;

import com.code.challenge.api.user.management.model.Device;
import com.code.challenge.api.user.management.model.User;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface UserCustomRepository {
    Mono<User> assignDevice (Device device, UUID  userId);
    Mono<User> unpairDevice(UUID userId, String idDevice);

}
