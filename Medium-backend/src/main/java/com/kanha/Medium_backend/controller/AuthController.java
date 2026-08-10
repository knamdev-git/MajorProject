package com.kanha.Medium_backend.controller;

import com.kanha.Medium_backend.Dto.UserDto;
import com.kanha.Medium_backend.Service.Implements.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    AuthServiceImpl authServiceImpl;

    @GetMapping("/msg")
    public String msg(){
        return "Auth Controller here";
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {
        UserDto savedUser = authServiceImpl.registerUser(userDto);

        return (savedUser != null)
                ?
                ResponseEntity.status(HttpStatus.CREATED).body(savedUser)
                :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginFunctionality(@RequestBody UserDto userDto){
        try {
            UserDto currUserDetails =
                    authServiceImpl.loginUser(userDto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(currUserDetails);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Invalid Username");
        } catch (BadCredentialsException badCredentialsException){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Password");
        }
    }
}
