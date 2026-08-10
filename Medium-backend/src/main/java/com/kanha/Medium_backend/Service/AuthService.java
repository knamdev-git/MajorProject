package com.kanha.Medium_backend.Service;

import com.kanha.Medium_backend.Dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface AuthService {
    UserDto registerUser(UserDto userDto);

    //proving user's id
    UUID providingUserId();

    UserDto loginUser(UserDto userDto);
}
