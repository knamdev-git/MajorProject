package com.kanha.Medium_backend.Mapper;

import com.kanha.Medium_backend.Dto.UserDto;
import com.kanha.Medium_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    @Autowired
    PasswordEncoder passwordEncoder;

    public User dtoToEntity(UserDto dto) {

        User user = new User();

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return user;
    }

    public UserDto entityToDto(User user) {

        UserDto dto = new UserDto();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
//        dto.setIs_verified(user.is_verified());
        dto.setRole(user.getRole());
        dto.setAvatar(user.getAvatar());
        dto.setBio(user.getBio());
        dto.setCreated_at(user.getCreated_at());
        dto.setUpdated_at(user.getUpdated_at());

        return dto;
    }
}
