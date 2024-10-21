package com.code.challenge.api.user.management.repository;

import com.code.challenge.api.user.management.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public interface UserRepository extends ReactiveMongoRepository<User, UUID> {
}
