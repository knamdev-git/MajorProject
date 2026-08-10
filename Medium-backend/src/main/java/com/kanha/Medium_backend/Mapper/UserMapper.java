package com.kanha.Medium_backend.Mapper;

import com.kanha.Medium_backend.Dto.UserDto;
import com.kanha.Medium_backend.model.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    @Autowired
    PasswordEncoder passwordEncoder;

    public CustomUser dtoToEntity(UserDto dto) {

        CustomUser customUser = new CustomUser();

        customUser.setUsername(dto.getUsername());
        customUser.setEmail(dto.getEmail());
        customUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        return customUser;
    }

    public UserDto entityToDto(CustomUser customUser) {

        UserDto dto = new UserDto();

        dto.setId(customUser.getId());
        dto.setUsername(customUser.getUsername());
        dto.setEmail(customUser.getEmail());
//        dto.setIs_verified(user.is_verified());
        dto.setRole(customUser.getRole());
        dto.setAvatar(customUser.getAvatar());
        dto.setBio(customUser.getBio());
        dto.setCreated_at(customUser.getCreated_at());
        dto.setUpdated_at(customUser.getUpdated_at());

        return dto;
    }
}
