package com.kanha.Medium_backend.controller;

import com.kanha.Medium_backend.Service.UserService;
import com.kanha.Medium_backend.model.CustomUser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


//added
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserApi {

    @PostConstruct
    public void init() {
        System.out.println("userService = " + userService);
    }

    @Autowired
    private UserService userService;

    //Listing out all the users

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/profile")
    public ResponseEntity<List<CustomUser>> getProfileAllUsers() {
        return userService.getProfileAllUsers();
    }

    //Get User by ID

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USERS')")
    @GetMapping("profile/{id}")
    public ResponseEntity<CustomUser> getUserById(@PathVariable UUID id) {
//        return new ResponseEntity<>(userService.getProfileById(id).getBody(), userService.getProfileById(id).getStatusCode());
        CustomUser customUser = userService.getProfileById(id);
        if (customUser != null)
            return new ResponseEntity<>(customUser, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(customUser, HttpStatus.CREATED);
//        return (userService.getProfileById(id).getBody(), userService.getProfileById(id).getStatusCode());

    }

    //POST -> adding the user

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("profile")
    public ResponseEntity<CustomUser> addUser(@RequestBody CustomUser customUser) {
        CustomUser resultantCustomUser = userService.addUser(customUser);
        if(resultantCustomUser != null){
            return new ResponseEntity<>(customUser, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    //update the user by passing the id

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USERS')")
    @PutMapping("profile/{id}")
    public ResponseEntity<?> updateProfile(@RequestBody CustomUser customUser, @PathVariable UUID id) {
        ResponseEntity<?> user1 = userService.updateUser(customUser, id);
        return new ResponseEntity<>(user1.getBody(), user1.getStatusCode()); //get body send you the message
    }

    //delete the user by specific id

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USERS')")
    @DeleteMapping("profile/{id}")
    public ResponseEntity<?> DeleteUserById(@PathVariable UUID id) {
        return userService.deleteUserByID(id);
    }

    //with this we can get authority of a particular role
    @GetMapping("/debug")
    public String debugAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authorities: " + auth.getAuthorities());
        return "Authorities: " + auth.getAuthorities();
    }
}