package com.kanha.Medium_backend.controller;

import com.kanha.Medium_backend.Dto.UserDto;
import com.kanha.Medium_backend.Service.AuthService;
import com.kanha.Medium_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    AuthService authService;

    @GetMapping("/msg")
    public String msg(){
        return "Auth Controller here";
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {
        UserDto savedUser = authService.registerUser(userDto);

        return (savedUser != null)
                ?
                ResponseEntity.status(HttpStatus.CREATED).body(savedUser)
                :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
