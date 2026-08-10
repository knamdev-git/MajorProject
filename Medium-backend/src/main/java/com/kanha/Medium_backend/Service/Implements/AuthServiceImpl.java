package com.kanha.Medium_backend.Service.Implements;

import com.kanha.Medium_backend.Dto.UserDto;
import com.kanha.Medium_backend.Exception.UserNotFoundException;
import com.kanha.Medium_backend.Mapper.UserMapper;
import com.kanha.Medium_backend.Repository.UserRepo;
import com.kanha.Medium_backend.Service.AuthService;
import com.kanha.Medium_backend.Service.UserService;
import com.kanha.Medium_backend.model.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.password.CompromisedPasswordException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    // I want to register the user
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserMapper mapper;

    @Override
    public UserDto registerUser(UserDto userDto){
        //changing userDto to user object
        if(userDto.getEmail() == null || userDto.getUsername() == null){
            return null;
        }
        CustomUser customUser = mapper.dtoToEntity(userDto);

        CustomUser savedCustomUser = userService.addUser(customUser); //it will return user
        return (savedCustomUser != null) ? mapper.entityToDto(savedCustomUser) : null ; // it will return userDto
    }



    @Autowired
    UserRepo repo;

    //proving user's id
    @Override
    public UUID providingUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        CustomUser customUser = repo.getByUsername(username);
        return customUser.getId();
    }

    @Autowired
    CustomUserDetailsServiceImpl customUserDetailsService;

    @Override
    public UserDto loginUser(UserDto userDto) {
        CustomUser userDetailsObj = (CustomUser) customUserDetailsService.loadUserByUsername(userDto.getUsername());
        if(passwordEncoder.matches(userDto.getPassword(), userDetailsObj.getPassword())){
            UserMapper userMapper = new UserMapper();
            return userMapper.entityToDto(userDetailsObj);
        }else {
            throw new BadCredentialsException("Password is incorrect");
        }
    }
}
