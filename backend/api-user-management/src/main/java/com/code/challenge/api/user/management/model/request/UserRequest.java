package com.code.challenge.api.user.management.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    private String name;
    private String email;
    private String role;
    private boolean active;
}
