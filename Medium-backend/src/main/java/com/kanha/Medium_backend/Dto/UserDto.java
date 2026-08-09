package com.kanha.Medium_backend.Dto;

import com.kanha.Medium_backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private UUID id;

    private String username;

    private String email;

    private String password;

    private boolean is_verified;

    private Role role;

    private String avatar;

    private String bio;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;
}