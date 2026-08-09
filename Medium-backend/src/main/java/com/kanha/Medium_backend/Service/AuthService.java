package com.kanha.Medium_backend.Service;

import com.kanha.Medium_backend.Dto.UserDto;
import com.kanha.Medium_backend.Mapper.UserMapper;
import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    // I want to register the user
    @Autowired
    UserService userService;

    @Autowired
    UserMapper mapper;

    public UserDto registerUser(UserDto userDto){
        //changing userDto to user object
        if(userDto.getEmail() == null || userDto.getUsername() == null){
            return null;
        }
        User user = mapper.dtoToEntity(userDto);

        User savedUser = userService.addUser(user); //it will return user
        return (savedUser != null) ? mapper.entityToDto(savedUser) : null ; // it will return userDto
    }



    @Autowired
    UserRepo repo;

    //proving user's id
    public UUID providingUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = repo.getByUsername(username);
        return user.getId();
    }
}
